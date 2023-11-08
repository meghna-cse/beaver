<?php
// check if the request method is get
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

AppConfig::allowOrigin();

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
    }else{
        // get the request input using get
        $id = $_GET['id'] ?? null;

        // create an instance of the user class
        $courseClass = new \Beaver\Beaver\Courses();

        // set json response
        header('Content-Type: application/json');
        // if the id is not empty call the getOne method else call the getAll method
        if (!empty($id)) {
            echo $courseClass->getCourseById($id);
        } else {
            echo $courseClass->getAllCourses();
        }
    }
} else {
    // return a bad method json response
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null
    ];
    // set the header to define http status code
    http_response_code(405);
    return json_encode($response);
}