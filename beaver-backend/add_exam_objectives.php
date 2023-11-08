<?php
// check if request method is post
use Beaver\Beaver\ExamObjectives;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

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
    // check if token is valid
    if (!AuthUtil::verifyToken()) {
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
    $exam_id = $data['exam_id'];
    $name = $data['name'];
    $description = $data['description'];

    // create an instance of the ExamObjectives class
    $exam_objectives_class = new ExamObjectives();

    // define json response
    header('Content-Type: application/json');
    // call the add exam objectives method
    echo $exam_objectives_class->addExamObjective($name, $description, $exam_id);
}