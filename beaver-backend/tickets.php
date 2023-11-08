<?php
// check if the request is GET
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

AppConfig::allowOrigin();

// validate whether the request is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
    exit;
} else {
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

    // obtain raised by from request body
    $raised_by = $_GET['raised_by'] ?? null;

    // create instance of tickets
    $tickets = new Beaver\Beaver\Tickets();

    // define json response
    header('Content-Type: application/json');

    // return tickets
    echo $tickets->fetchAllTickets($raised_by);
}