<?php
// check if the request method is POST
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Users;

require 'vendor/autoload.php';

AppConfig::allowOrigin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // process json data
//    $json = file_get_contents('php://input');
    // convert json data to array
    $data = json_decode(file_get_contents('php://input'), true);

    // get json data from request
    $name = $data['name'];
    $username = $data['username'];
    $email = $data['email'];
    $mobile = $data['mobile_number'];
    $identification_number = $data['identification_number'];
    $password = $data['password'];
    $role_id = $data['role_id'];

    // create an instance of the user class
    $userClass = new Users();

    // set response to json
    header('Content-Type: application/json');
    // call the register method
    try {
        echo $userClass->create($name, $username, $email, $mobile, $identification_number, $role_id, $password);
    }
    catch (\Exception $exception){
        die("Error: " . $exception->getMessage());
    }
} else {
    // return a bad method json response
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null
    ];
    // set response to return json
    header('Content-Type: application/json');
    // set the header to define http status code
    http_response_code(405);
    echo json_encode($response);
}