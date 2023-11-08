<?php
// check if request is get
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\ExamObjectives;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

AppConfig::allowOrigin();


if ($_SERVER['REQUEST_METHOD'] === "GET") {
    // validate token
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
    $feedback_id = $_GET['feedback_id'] ?? null;
    $exam_id = $_GET['exam_id'] ?? null;
    $course_objective_id = $_GET['course_objective_id'] ?? null;
    $course_id = $_GET['course_id'] ?? null;
    $qa_id = $_GET['qa_id'] ?? null;

    // create an instance of the ExamObjectives class
    $qa_feedback = new \Beaver\Beaver\QAFeedback();

    // define json response
    header('Content-Type: application/json');
    echo $qa_feedback->fetchAllQAFeedback($feedback_id,$qa_id, $exam_id,$course_objective_id, $course_id);
}else {
    // return an invalid method response
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
}
