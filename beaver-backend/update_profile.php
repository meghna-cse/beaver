<?php
// check if request method is post


use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Utils\AuthUtil;
use Beaver\Beaver\Utils\ValidateInput;
use Beaver\Beaver\Utils\DBConnection;

require 'vendor/autoload.php';

AppConfig::allowOrigin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method',
        'data' => null,
    ];
    http_response_code(405);
    echo json_encode($response);
    exit;
} else{
    // check if the token is a valid one
    $isValidToken = AuthUtil::verifyToken();

    if (!$isValidToken) {
        $response = [
            'status' => 'error',
            'message' => 'Unauthorized',
            'data' => null,
        ];
        http_response_code(401);
        echo json_encode($response);
        exit;
    }

    // define json response
    header('Content-Type: application/json');
    
    // get json input
    $data = json_decode(file_get_contents('php://input'), true);

    // get the request input using post
    $id = $data['id'];
    $name = $data['name'] ?? null;
    $username = $data['username'] ?? null;
    $identification_number = $data['identification_number'] ?? null;

    $id = ValidateInput::cleanInput($id);
    $name = ValidateInput::cleanInput($name);
    $username = ValidateInput::cleanInput($username);
    $identification_number = ValidateInput::cleanInput($identification_number);


    try {
        $connection = DBConnection::getConnection();
        $stmt = $connection->prepare("UPDATE users SET name = ?, username = ?, identification_number = ? WHERE id = ?");
        //$stmt->bindParam("sssi", $name, $username, $identification_number, $id);
        if ($stmt->execute([$name, $username, $identification_number, $id])) {
            $response = [
                'status' => 'success',
                'message' => 'Profile updated successfully'
            ];
            
            echo json_encode($response);

        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to update profile']);
        }

        return json_encode($response);
    }catch (\Exception $exception){
        die("Error: " . $exception->getMessage());
    }
}