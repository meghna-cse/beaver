<?php
// perform login for the user

// check if the request method is POST
use Beaver\Beaver\Authentication;
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Utils\AuthUtil;

require 'vendor/autoload.php';

AppConfig::allowOrigin();

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    // process json input data
    $data = json_decode(file_get_contents('php://input'), true);

    $username = $data['username'];
    $password = $data['password'];

    // create an instance of the Authentication class
    $auth = new Authentication();

    // defined header for json response
    header('Content-Type: application/json');
    // call the login method
    echo $auth->login($username,$password);
}else{
    // return a bad method json response
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null
    ];

    // set header for json response
    header('Content-Type: application/json');
    // set the header to define http status code
    http_response_code(405);
    echo json_encode($response);
}