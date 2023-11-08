<?php
// check if request is post
use Beaver\Beaver\QAFeedback;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
    exit;
}else{
    // check if valid token
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

    // get the request body
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    // get the data
    $id = $data['id'];
    $raised_by = $data['created_by'];
    $comment = $data['comment'];
    $exam_id = $data['exam_id'] ?? null;
    $course_objective_id = $data['course_objective_id'] ?? null;

    // create instance of qa feedback
    $qa_feedback = new QaFeedback();
    // define json response
    header('Content-Type: application/json');
    echo $qa_feedback->updateQaFeedback($id,$exam_id,$comment,$course_objective_id);
}