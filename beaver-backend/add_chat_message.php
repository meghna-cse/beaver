<?php
// validate that request method is POST
use Beaver\Beaver\ChatMessages;
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\ExamObjectives;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

AppConfig::allowOrigin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
    exit;
}else{
    // validate access token
    if (!AuthUtil::verifyToken()) {
        $response = [
            'status' => 'error',
            'message' => 'Unauthorized',
            'data' => null,
        ];
        http_response_code(401);
        echo json_encode($response);
        exit;
    }else{
        // get json input
        $data = json_decode(file_get_contents('php://input'), true);

        // get the request input using post
        $sender_id = $data['sender_id'];
        $receiver_id = $data['receiver_id'];
        $content = $data['content'];

        // create an instance of the chat message class
        $chat_message_class = new ChatMessages();

        // define json response
        header('Content-Type: application/json');
        // call the add chat message method
        echo $chat_message_class->addChatMessage($sender_id, $receiver_id, $content);
    }
}