<?php
// check if request method is POST
use Beaver\Beaver\StudentPerformances;
use Beaver\Beaver\Utils\AuthUtil;
use Beaver\Beaver\Configs\AppConfig;
require 'vendor/autoload.php';
AppConfig::allowOrigin();

// Check the request method
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
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
        return json_encode($response);
    }

    $studentPerformances = new \Beaver\Beaver\StudentPerformances();

    header('Content-Type: application/json');

    // Call the method to get average scores by course
    $result = $studentPerformances->getAverageScoresByCourse();
    echo $result;
    exit;
} else if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // check if the token is valid
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

    // get json input
    $data = json_decode(file_get_contents('php://input'),true);

    // get the request input using post
    $id = $data['id'];
    $student_id = $data['student_id'];
    $exam_id = $data['exam_id'];
    $score = $data['score'];

    // create an instance of the StudentPerformance class
    $student_performance_class = new StudentPerformances();

    // define json response
    header('Content-Type: application/json');
    // call the update student performance method
    echo $student_performance_class->updateStudentPerformance($student_id, $exam_id, $score);
}else{
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