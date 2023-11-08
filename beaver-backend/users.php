<?php
// check if the request method is GET
use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Users;
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
            'message' => 'Invalid token',
            'data' => null
        ];
        // set the header to define http status code
        http_response_code(401);
        // define returned type to be json
        header('Content-Type: application/json');
        echo json_encode($response);
    }else{
        // get the request input using get
        $id = $_GET['id'] ?? null;
        $role_id = $_GET['role_id'] ?? null;

        // create an instance of the user class
        $usersClass = new Users();

        header('Content-Type: application/json');
        // if the id is not empty call the getOne method else call the getAll method
        if (!empty($id)) {
            echo $usersClass->getById($id);
        } else {
            echo $usersClass->fetchAll($role_id);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // verify token
    $isValidToken = AuthUtil::verifyToken();

    if (!$isValidToken) {
        $response = [
            'status' => 'error',
            'message' => 'Invalid token',
            'data' => null
        ];
        http_response_code(401);
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        $data = json_decode(file_get_contents('php://input'), true);
        $userId = $data['id'] ?? null;
        
        if ($userId) {
            // create an instance of the user class
            $usersClass = new Users();

            // Assuming there is a deactivateUser method in the Users class
            echo $usersClass->deactivateUser($userId);
        } else {
            $response = [
                'status' => 'error',
                'message' => 'User ID is required',
                'data' => null
            ];
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode($response);
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
    // define returned type to be json
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>