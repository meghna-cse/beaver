<?php

use Beaver\Beaver\Courses;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

// check if request method is post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // validate token
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

    // get the request input
    $id = $data['id'];
    $name = $data['name'];
    $description = $data['description'];
    $lecturer_id = $data['instructor_id'];

    // create a new instance of course class
    $courseClass = new Courses();

    // set response as json
    header('Content-Type: application/json');
    // call the create method
    echo $courseClass->updateCourse($id,$name, $description, $lecturer_id);
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