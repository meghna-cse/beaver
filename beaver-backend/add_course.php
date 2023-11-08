<?php
// check if the request method is POST
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

AppConfig::allowOrigin();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // verify token
    $isValidToken = AuthUtil::verifyToken();

    if (!$isValidToken) {
        // return a bad method json response
        $response = [
            'status' => 'error',
            'message' => 'Unauthorized',
            'data' => null
        ];
        // set the header to define http status code
        http_response_code(401);
        echo json_encode($response);
        exit();
    }

    // get json input
    $data = json_decode(file_get_contents('php://input'), true);

    // get the request input using post
    $name = $data['name'];
    $description = $data['description'];
    $instructor_id = $data['instructor_id'];

    // create an instance of the user class
    $courseClass = new \Beaver\Beaver\Courses();

    // define json response
    header('Content-Type: application/json');
    // call the register method
    echo $courseClass->addCourse($name, $description, $instructor_id);
} else {
    // return a bad method json response
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null
    ];
    // set the header to define http status code
    http_response_code(405);
    echo json_encode($response);
}