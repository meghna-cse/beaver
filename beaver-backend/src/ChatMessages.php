<?php

namespace Beaver\Beaver;

class ChatMessages
{
    // add chat messages
    public function addChatMessage($sender_id, $receiver_id, $content)
    {
        // validate user input
        $sender_id = Utils\ValidateInput::cleanInput($sender_id);
        $receiver_id = Utils\ValidateInput::cleanInput($receiver_id);
        $content = Utils\ValidateInput::cleanInput($content);

        // check if there is any field missing, then return an error for all missing fields
        $error_data = [];
        if (empty($sender_id) || $sender_id == "") {
            $error_data['sender_id'] = 'Sender id is required';
        }

        if (empty($receiver_id) || $receiver_id == "") {
            $error_data['receiver_id'] = 'Receiver id is required';
        }

        if (empty($content) || $content == "") {
            $error_data['content'] = 'Content is required';
        }

        if (!empty($error_data)) {
            $response = [
                'status' => 'error',
                'message' => 'Missing required fields',
                'data' => $error_data,
            ];
            http_response_code(400);
            return json_encode($response);
        }

        // check if the sender and receiver exists
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT count(id) FROM users WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $sender_id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Sender not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $receiver_id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Receiver not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        // add the chat message
        $sql = "INSERT INTO messages (sender_id, receiver_id, content) VALUES (:sender_id, :receiver_id, :content)";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':sender_id', $sender_id, \PDO::PARAM_INT);
        $stmt->bindParam(':receiver_id', $receiver_id, \PDO::PARAM_INT);
        $stmt->bindParam(':content', $content, \PDO::PARAM_STR);

        if ($stmt->execute()){
            $response = [
                'status' => 'success',
                'message' => 'Chat message added successfully',
                'data' => null,
            ];
            http_response_code(201);
        }else{
            $response = [
                'status' => 'error',
                'message' => 'Error adding chat message',
                'data' => null,
            ];
            http_response_code(500);
        }
        return json_encode($response);
    }

    // list chat messages based on who sent the message and who received the message
    public function fetchChat($sender_id,$receiver_id){
        // validate user input
        $sender_id = Utils\ValidateInput::cleanInput($sender_id);
        $receiver_id = Utils\ValidateInput::cleanInput($receiver_id);

        // check if there is any field missing, then return an error for all missing fields
        $error_data = [];
        if (empty($sender_id) || $sender_id == "") {
            $error_data['sender_id'] = 'Sender id is required';
        }

        if (empty($receiver_id) || $receiver_id == "") {
            $error_data['receiver_id'] = 'Receiver id is required';
        }

        if (!empty($error_data)) {
            $response = [
                'status' => 'error',
                'message' => 'Missing required fields',
                'data' => $error_data,
            ];
            http_response_code(400);
            return json_encode($response);
        }

        // check if the sender and receiver exists
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT count(id) FROM users WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $sender_id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Sender not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $receiver_id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Receiver not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        // fetch the chat messages and order from oldest to newest fetch name of both sender and receiver
        $sql = "SELECT messages.id, messages.sender_id, messages.receiver_id, messages.content, messages.created_at, users.name as sender_name, users2.name as receiver_name FROM messages INNER JOIN users ON messages.sender_id = users.id INNER JOIN users as users2 ON messages.receiver_id = users2.id WHERE (sender_id = :sender_id AND receiver_id = :receiver_id) OR (sender_id = :receiver_id AND receiver_id = :sender_id) ORDER BY messages.created_at ASC";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':sender_id', $sender_id, \PDO::PARAM_INT);
        $stmt->bindParam(':receiver_id', $receiver_id, \PDO::PARAM_INT);
        $stmt->execute();

        $chat_messages = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if ($chat_messages){
            $response = [
                'status' => 'success',
                'message' => 'Chat messages fetched successfully',
                'data' => $chat_messages,
            ];
            http_response_code(200);
        }else{
            $response = [
                'status' => 'error',
                'message' => 'Error fetching chat messages',
                'data' => [],
            ];
            http_response_code(500);
        }
        return json_encode($response);
    }
}