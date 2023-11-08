<?php

use Beaver\Beaver\StudentEnrolments;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === "POST"){
    // verify token
    $isValidToken = AuthUtil::verifyToken();

    if (!$isValidToken){
        // return a bad method json response
        $response = [
            'status' => 'error',
            'message' => 'Unauthorized',
            'data' => null
        ];
        // set the header to define http status code
        http_response_code(401);
        // define returned type to be json
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }

    // decode request body
    $data = json_decode(file_get_contents('php://input'),true);

    $id = $data['id'];
    $student_id = $data['student_id'];
    $course_id = $data['course_id'];

    $studentEnrolment = new StudentEnrolments();
    // set content type to be json
    header('Content-Type: application/json');
    echo $studentEnrolment->updateStudentEnrolments($id,$student_id,$course_id);
}else{
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    // set response to json
    header('Content-Type: application/json');
    http_response_code(405);
    echo json_encode($response);
    exit();
}