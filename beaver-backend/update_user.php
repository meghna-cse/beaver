<?php
// check if the request method is POST
use Beaver\Beaver\Users;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // process json input
    $data = json_decode(file_get_contents('php://input'), true);

    // get the request input using post
    $id = $data['id'];
    $name = $data['name'];
    $username = $data['username'];
    $identification_number = $data['identification_number'];
    $role_id = $data['role_id'];

    // create an instance of the user class
    $userClass = new Users();

    // set header to json
    header('Content-Type: application/json');
    // call the register method
    echo $userClass->update($id, $name, $username, $identification_number, $role_id);
} else {
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