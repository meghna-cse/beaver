<?php

namespace Beaver\Beaver;

class Tickets
{
    // add tickets
    public function addTicket($title,$description,$priority_level,$raised_by){
        // validate user input
        $title = Utils\ValidateInput::cleanInput($title);
        $description = Utils\ValidateInput::cleanInput($description);
        $priority_level = Utils\ValidateInput::cleanInput($priority_level);
        $raised_by = Utils\ValidateInput::cleanInput($raised_by);

        // check if there is any field missing, then return an error for all missing fields
        $error_data = [];
        if (empty($title) || $title == "") {
            $error_data['title'] = 'Title is required';
        }

        if (empty($description) || $description == "") {
            $error_data['description'] = 'Description is required';
        }

        if (empty($priority_level) || $priority_level == "") {
            $error_data['priority_level'] = 'Priority level is required';
        }

        if (empty($raised_by) || $raised_by == "") {
            $error_data['raised_by'] = 'Raised by is required';
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

        // check if the user exists
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT count(id) FROM users WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $raised_by, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'User not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        // insert the ticket
        $sql = "INSERT INTO tickets (title,description,priority_level,raised_by) VALUES (:title,:description,:priority_level,:raised_by)";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':title', $title, \PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, \PDO::PARAM_STR);
        $stmt->bindParam(':priority_level', $priority_level, \PDO::PARAM_STR);
        $stmt->bindParam(':raised_by', $raised_by, \PDO::PARAM_INT);

        if ($stmt->execute()) {
            $response = [
                'status' => 'success',
                'message' => 'Ticket added successfully',
                'data' => null,
            ];
            http_response_code(201);
        }else{
            $response = [
                'status' => 'error',
                'message' => 'Error adding ticket',
                'data' => null,
            ];
            http_response_code(500);
        }
        return json_encode($response);
    }

    // update tickets
    public function updateTicket($id,$title,$description,$priority_level,$raised_by){
        // validate user input
        $id = Utils\ValidateInput::cleanInput($id);
        $title = Utils\ValidateInput::cleanInput($title);
        $description = Utils\ValidateInput::cleanInput($description);
        $priority_level = Utils\ValidateInput::cleanInput($priority_level);
        $raised_by = Utils\ValidateInput::cleanInput($raised_by);

        // check if there is any field missing, then return an error for all missing fields
        $error_data = [];
        if (empty($id) || $id == "") {
            $error_data['id'] = 'ID is required';
        }

        if (empty($title) || $title == "") {
            $error_data['title'] = 'Title is required';
        }

        if (empty($description) || $description == "") {
            $error_data['description'] = 'Description is required';
        }

        if (empty($priority_level) || $priority_level == "") {
            $error_data['priority_level'] = 'Priority level is required';
        }

        if (empty($raised_by) || $raised_by == "") {
            $error_data['raised_by'] = 'Raised by is required';
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

        // check if the user exists
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT count(id) FROM users WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $raised_by, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'User not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        // update the ticket
        $sql = "UPDATE tickets SET title = :title, description = :description, priority_level = :priority_level, raised_by = :raised_by WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':title', $title, \PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, \PDO::PARAM_STR);
        $stmt->bindParam(':priority_level', $priority_level, \PDO::PARAM_STR);
        $stmt->bindParam(':raised_by', $raised_by, \PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);

        if ($stmt->execute()) {
            $response = [
                'status' => 'success',
                'message' => 'Ticket updated successfully',
                'data' => null,
            ];
            http_response_code(200);
        }else{
            $response = [
                'status' => 'error',
                'message' => 'Error updating ticket',
                'data' => null,
            ];
            http_response_code(500);
        }
        return json_encode($response);
    }

    // list tickets based on who raised them or no filter at all
    public function fetchAllTickets($raised_by = null){
        // validate user input if is set
        if (isset($raised_by)) {
            $raised_by = Utils\ValidateInput::cleanInput($raised_by);
        }

        // check if the user exists if is set
        if (isset($raised_by)) {
            $connection = Utils\DBConnection::getConnection();

            $sql = "SELECT count(id) FROM users WHERE id = :id";

            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':id', $raised_by, \PDO::PARAM_INT);
            $stmt->execute();

            if (!$stmt->fetchColumn()) {
                $response = [
                    'status' => 'error',
                    'message' => 'User not found',
                    'data' => null,
                ];
                http_response_code(404);
                return json_encode($response);
            }
        }

        // fetch all tickets
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT tickets.id, tickets.title, tickets.description, tickets.priority_level, tickets.raised_by, users.name AS raised_by_name FROM tickets INNER JOIN users ON tickets.raised_by = users.id";

        // check if the raised_by is set
        if (isset($raised_by)) {
            $sql .= " WHERE tickets.raised_by = :raised_by";
        }

        $stmt = $connection->prepare($sql);

        // check if the raised_by is set
        if (isset($raised_by)) {
            $stmt->bindParam(':raised_by', $raised_by, \PDO::PARAM_INT);
        }

        $stmt->execute();

        $tickets = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (!$tickets) {
            $response = [
                'status' => 'error',
                'message' => 'Tickets not found',
                'data' => null,
            ];
            http_response_code(404);
        }else{
            $response = [
                'status' => 'success',
                'message' => 'Tickets found',
                'data' => $tickets,
            ];
            http_response_code(200);
        }
        return json_encode($response);
    }
}