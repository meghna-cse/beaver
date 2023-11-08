<?php
// check if request is post
require 'vendor/autoload.php';


use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\CourseObjectives;
use Beaver\Beaver\Users;
use Beaver\Beaver\Utils\AuthUtil;
use Beaver\Beaver\Exams;

AppConfig::allowOrigin();




if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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

    // decode request body
    $data = json_decode(file_get_contents('php://input'),true);

    $name = $data['exam_name'];
    $course_id = $data['course_id'];
    $exam_date = $data['exam_date'];
    $exam_type = $data['exam_type'];
    $exam_format = $data['exam_format'];
    $max_score = $data['max_score'];
    $passing_score = $data['passing_score'];



    $exam = new Exams();
    // set content type to be json



    header('Content-Type: application/json');
    echo $exam->addExam($name,$course_id,$exam_date,$exam_type,$exam_format,$max_score,$passing_score);
}