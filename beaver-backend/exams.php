<?php

use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Exams;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

AppConfig::allowOrigin();

// check if request is get
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
    exit();
}else{
    // verify token
    $isValidToken = AuthUtil::verifyToken();

    // check if token is valid
    if (!$isValidToken){
        // return a bad method json response
        $response = [
            'status' => 'error',
            'message' => 'Invalid token',
            'data' => null
        ];
        // set the header to define http status code
        http_response_code(401);
        // define returned type to be json
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }

    $course_id = $_GET['course_id'] ?? null;

    $exams = new Exams();

    // set response json
    header('Content-Type: application/json');
    if ($course_id) {
        echo $exams->listExamsByCourse($course_id);
    }else{
        echo $exams->listExams();
    }
}