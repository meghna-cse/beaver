<?php
// check if request method is post
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\StudentPerformances;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';
AppConfig::allowOrigin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
    exit;
}else{
    // check if the token is a valid one
    $isValidToken = AuthUtil::verifyToken();

    if (!$isValidToken) {
        $response = [
            'status' => 'error',
            'message' => 'Unauthorized',
            'data' => null,
        ];
        http_response_code(401);
        echo json_encode($response);
        exit;
    }

    // get json input
    $data = json_decode(file_get_contents('php://input'), true);

    // get the request input using post
    $student_id = $data['student_id'];
    $exam_id = $data['exam_id'];
    $score = $data['score'];

    // create an instance of the StudentPerformance class
    $student_performance_class = new StudentPerformances();

    // define json response
    header('Content-Type: application/json');
    // call the add student performance method
    echo $student_performance_class->addStudentPerformance($student_id, $exam_id, $score);
}