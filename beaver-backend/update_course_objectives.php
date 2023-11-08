<?php
// check if method is POST
require 'vendor/autoload.php';

use Beaver\Beaver\CourseObjectives;
use Beaver\Beaver\Utils\AuthUtil;

if ($_SERVER['REQUEST_METHOD'] === "POST"){
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

    // process json data
    $json = file_get_contents('php://input');
    // convert json data to array
    $data = json_decode($json, true);

    // get json data from request
    $id = $data['id'];
    $name = $data['name'];
    $description = $data['description'];
    $course_id = $data['course_id'];

    $course_objectives = new CourseObjectives();

    // set json response
    header('Content-Type: application/json');
    echo $course_objectives->updateCourseObjectives($id, $name, $description, $course_id);
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