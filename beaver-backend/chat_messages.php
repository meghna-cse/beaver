<?php
// check if request method is get
use Beaver\Beaver\ChatMessages;
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

AppConfig::allowOrigin();

if ($_SERVER['REQUEST_METHOD'] === "GET"){
    // validate user token
    $isValidToken = AuthUtil::verifyToken();

    if (!$isValidToken){
        // return an unauthorized json response
        $response = [
            'status' => 'error',
            'message' => 'Unauthorized',
            'data' => null,
        ];
        http_response_code(401);
        echo json_encode($response);
        exit();
    }

    // get input
    $sender_id = $_GET['sender_id'] ?? null;
    $receiver_id = $_GET['receiver_id'] ?? null;
    // get json input
//    $data = json_decode(file_get_contents('php://input'),true);
//
//    // get the request input using post
//    $sender_id = $data['sender_id'];
//    $receiver_id = $data['receiver_id'];

    if (!$sender_id){
        // return an unauthorized json response
        $response = [
            'status' => 'error',
            'message' => 'Sender id is required',
            'data' => null,
        ];
        http_response_code(422);
        echo json_encode($response);
        exit();
    }
    if (!$receiver_id){
        // return an unauthorized json response
        $response = [
            'status' => 'error',
            'message' => 'Receiver id is required',
            'data' => null,
        ];
        http_response_code(422);
        echo json_encode($response);
        exit();
    }

    // create an instance of the chat message class
    $chat_message_class = new ChatMessages();

    // define json response
    header('Content-Type: application/json');
    // call the get chat messages method
    echo $chat_message_class->fetchChat($sender_id, $receiver_id);
}else{
    // return an invalid method response
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
}