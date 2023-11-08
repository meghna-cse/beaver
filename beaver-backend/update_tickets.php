<?php
// validate that the request method is post
use Beaver\Beaver\Utils\AuthUtil;

require __DIR__ . '/vendor/autoload.php';

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
    // verify token
    $isTokenValid = AuthUtil::verifyToken();

    if (!$isTokenValid) {
        $response = [
            'status' => 'error',
            'message' => 'Invalid token',
            'data' => null,
        ];
        http_response_code(401);
        echo json_encode($response);
        exit;
    }

    // get json input
    $data = json_decode(file_get_contents('php://input'), true);

    // obtain id, title, description, priority_level and raised_by from request body
    $id = $data['id'];
    $title = $data['title'];
    $description = $data['description'];
    $priority_level = $data['priority_level'];
    $raised_by = $data['raised_by'];

    // create instance of tickets
    $tickets = new Beaver\Beaver\Tickets();

    // define json response
    header('Content-Type: application/json');
    // update ticket
    echo $tickets->updateTicket($id,$title,$description,$priority_level,$raised_by);
}