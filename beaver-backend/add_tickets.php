<?php
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Utils\AuthUtil;

require __DIR__ . '/vendor/autoload.php';

AppConfig::allowOrigin();
header('Content-Type: application/json');

// Create a standard response structure
$response = ['status' => 'error', 'message' => 'An unknown error occurred'];

// check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
    exit;
} 
    // verify token
    $isTokenValid = AuthUtil::verifyToken();

    if (!$isTokenValid) {
        $response = [
            'status' => 'error',
            'message' => 'Unauthorized',
            'data' => null,
        ];
        http_response_code(401);
        echo json_encode($response);
        exit;
    }

    // Instantiate a new Ticket object
    $ticket = new Beaver\Beaver\Tickets();

    // get json input
    $data = json_decode(file_get_contents('php://input'), true);

    // obtain title, description, priority_level, and raised_by from request body
    $title = $data['title'];
    $description = $data['description'];
    $priority_level = $data['priority_level'];
    $raised_by = $data['raised_by'];


    // Attempt to create the ticket
    try {
        if ($ticket->addTicket($title, $description, $priority_level, $raised_by)) {
            http_response_code(201); // Created
            echo json_encode(array('message' => 'Ticket Created'));
        } else {
            http_response_code(503); // Service Unavailable
            echo json_encode(array('message' => 'Failed to create ticket'));
        }
    } catch (Exception $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array('message' => 'Failed to create ticket', 'error' => $e->getMessage()));
    }