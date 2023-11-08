<?php
// check if request method is post
require 'vendor/autoload.php';

use Beaver\Beaver\Exams;
use Beaver\Beaver\StudentPerformance;
use Beaver\Beaver\Utils\AuthUtil;

if ($_SERVER['REQUEST_METHOD'] === "POST"){
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

    // decode request body
    $data = json_decode(file_get_contents('php://input'),true);

    $id = $data['id'];
    $name = $data['name'];
    $course_id = $data['course_id'];
    $exam_date = $data['exam_date'];
    $exam_type = $data['exam_type'];
    $exam_format = $data['exam_format'];
    $max_score = $data['max_score'];
    $passing_score = $data['passing_score'];

    // set json response
    header('Content-Type: application/json');
    $exam = new Exams();
    echo $exam->updateExam($id,$name,$course_id,$exam_date,$exam_type,$exam_format,$max_score,$passing_score);
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