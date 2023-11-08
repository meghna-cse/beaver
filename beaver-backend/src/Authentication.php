<?php

namespace Beaver\Beaver;

use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\Utils\AuthUtil;
use Beaver\Beaver\Utils\DBConnection;
use Beaver\Beaver\Utils\ValidateInput;

class Authentication
{
    public function login($username,$password){
        // clean and validate user input
        $username = ValidateInput::cleanInput($username);
        $password = ValidateInput::cleanInput($password);

        if(empty($username) || empty($password)){
            $response = [
                'status' => 'error',
                'message' => 'Username and password are required',
            ];
            return json_encode($response);
        }

        // check if user exists
        $connection = DBConnection::getConnection();
        $sql = "SELECT users.id,username, identification_number,users.name,password, roles.name as role_name FROM users INNER JOIN roles ON roles.id = users.role_id WHERE username = :username";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':username', $username, \PDO::PARAM_STR);
        $stmt->execute();
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        if(!$user){
            $response = [
                'status' => 'error',
                'message' => 'Invalid username or password',
                'data' => null
            ];
            return json_encode($response);
        }

        // verify password
        if(!password_verify($password, $user['password'])){
            $response = [
                'status' => 'error',
                'message' => 'Invalidsss username or password',
                'data' => null
            ];
            return json_encode($response);
        }

        // create session
        $_SESSION['user'] = $user;
        // create payload
        $payload = [
            'id' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role_name'],
            'exp' => time() + (60 * 60 * 24),
        ];
        // create token
        $token = AuthUtil::jwtEncode($payload);

        unset($user['password']);

        // respond with the token
        $response = [
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'token' => $token,
                'user' => $user,
            ],
        ];

        return json_encode($response);
    }

    public function logout(){
        // destroy session
        session_destroy();

        // respond with success message
        $response = [
            'status' => 'success',
            'message' => 'Logout successful',
            'data' => null,
        ];
        return json_encode($response);
    }
}