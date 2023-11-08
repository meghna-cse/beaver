<?php
// check if the request method is POST
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\CourseObjectives;
use Beaver\Beaver\Users;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

AppConfig::allowOrigin();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // verify token
    $isValidToken = AuthUtil::verifyToken();

    if (!$isValidToken) {
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

    // process json data
    $json = file_get_contents('php://input');
    // convert json data to array
    $data = json_decode($json, true);

    // get json data from request
    $name = $data['name'];
    $description = $data['description'];
    $course_id = $data['course_id'];

    $course_objectives = new CourseObjectives();

    // define returned type to be json
    header('Content-Type: application/json');
    // call the add course objective method
    echo $course_objectives->addCourseObjective($name, $description, $course_id);
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