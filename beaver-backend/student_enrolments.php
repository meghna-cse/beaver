<?php


use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\StudentEnrolments;
use Beaver\Beaver\Utils\AuthUtil;

require __DIR__ . '/vendor/autoload.php';

AppConfig::allowOrigin();

// check if request is get
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    // verify user token
    $isValidToken = AuthUtil::verifyToken();

    if (!$isValidToken) {
        $response = [
            'status' => 'error',
            'message' => 'Invalid token',
            'data' => null,
        ];
        http_response_code(401);
        echo json_encode($response);
        exit();
    }

    $id = $_GET['id'] ?? null;
    $course_id = $_GET['course_id'] ?? null;
    $student_id = $_GET['student_id'] ?? null;

    $user = new StudentEnrolments();

    // set json header
    header('Content-Type: application/json');

    if ($id) {
        $result = $user->getStudentEnrolmentById($id);
    }elseif ($course_id) {
        $result = $user->getStudentEnrolmentsByCourse($course_id);
    } elseif ($student_id) {
        $result = $user->getStudentEnrolmentsByStudent($student_id);
    } else {
        $result = $user->getAllStudentEnrolments();
    }

    echo $result;
}else{
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
    exit();
}