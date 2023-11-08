<?php
// check if request method is POST
require 'vendor/autoload.php';

use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\CourseObjectives;
use Beaver\Beaver\Utils\AuthUtil;

AppConfig::allowOrigin();

if ($_SERVER['REQUEST_METHOD'] === "GET"){
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

    $id = $_GET['id'] ?? null;
    $course_id = $_GET['course_id'] ?? null;

    $course_objectives = new CourseObjectives();

    // set json response
    header('Content-Type: application/json');
    if ($id) {
        echo $course_objectives->getCourseObjectiveById($id);
    } else if ($course_id) {
        echo $course_objectives->getCourseObjectivesByCourse($course_id);
    } else {
        echo $course_objectives->getAllCourseObjectives();
    }
}else{
    // return a bad method json response
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null
    ];
    // set the header to define http status code
    http_response_code(405);
    echo json_encode($response);
}