<?php
// check if the request method is GET
use Beaver\Beaver\ExamObjectives;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === "GET"){
    // validate token
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

    // get input from the request, get
    $id = $_GET['id'] ?? null;
    $exam_id = $_GET['exam_id'] ?? null;
    $course_id = $_GET['course_id'] ?? null;

    // create an instance of the ExamObjectives class
    $exam_objectives_class = new ExamObjectives();

    // define json response
    header('Content-Type: application/json');
    echo $exam_objectives_class->fetchAllExamObjectives($id,$exam_id,$course_id);
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