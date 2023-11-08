<?php
// check if the request is GET
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\StudentPerformances;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

AppConfig::allowOrigin();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // check if the token is valid
    $isValidToken = AuthUtil::verifyToken();

    if (!$isValidToken) {
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
    $student_id = $_GET['student_id'] ?? null;
    $exam_id = $_GET['exam_id'] ?? null;
    $course_id = $_GET['course_id'] ?? null;
    $instructor_id = $_GET['instructor_id'] ?? null;

    // create an instance of the StudentPerformance class
    $student_performance_class = new StudentPerformances();

    // define json response
    header('Content-Type: application/json');

    // call the get student performance method
    echo $student_performance_class->fetchStudentPerformances($student_id,$exam_id,$course_id,$instructor_id);
} else {
    // return and invalid request method json response
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
    exit();
}