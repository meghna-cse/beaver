<?php

namespace Beaver\Beaver;

use Beaver\Beaver\Utils\DBConnection;
use Beaver\Beaver\Utils\ValidateInput;

class Users
{
    public function fetchAll($role_id = null)
    {
        $connection = DBConnection::getConnection();
        $sql = "SELECT users.id, users.name, username, identification_number, roles.name as role_name 
                FROM users INNER JOIN roles ON roles.id = users.role_id";
        if ($role_id) {
            $sql .= " WHERE users.role_id = :role_id";
        }

        $stmt = $connection->prepare($sql);
        if ($role_id){
            $stmt->bindParam(':role_id', $role_id, \PDO::PARAM_INT);
        }
        $stmt->execute();
        $users = $stmt->fetchAll(\PDO::FETCH_ASSOC);

//        $result = $connection->query($sql);
//        $users = $result->fetchAll(\PDO::FETCH_ASSOC);

        // cast users to json and return
        $response = [
            'status' => 'success',
            'message' => 'Users fetched successfully',
            'data' => $users,
        ];

        return json_encode($response);
    }

    public function getById($id)
    {
        // clean user input
        $id = ValidateInput::cleanInput($id);

        // validate user  input
        if (!is_numeric($id)) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid user id',
            ];

            return json_encode($response);
        }
        try {
            $connection = DBConnection::getConnection();
            $sql = "SELECT users.id, users.name, username, identification_number, roles.name as role_name 
                FROM users INNER JOIN roles ON roles.id = users.role_id
                WHERE users.id = :id";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
            $stmt->execute();

            $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            if(!$results){
                $response = [
                    'status' => 'error',
                    'message' => 'User not found',
                    'data' => null,
                ];
                http_response_code(404);
                return json_encode($response);
            }

            $response = [
                'status' => 'success',
                'message' => 'User fetched successfully',
                'data' => $results,
            ];

            return json_encode($response);
        }catch (\Exception $exception){
            die("Error: " . $exception->getMessage());
        }
    }

    public function create($name, $username, $email, $mobile, $identification_number, $role_id,$password)
    {
        // clean user input
        $name = ValidateInput::cleanInput($name);
        $username = ValidateInput::cleanInput($username);
        $email = ValidateInput::cleanInput($email);
        $mobile = ValidateInput::cleanInput($mobile);
        $identification_number = ValidateInput::cleanInput($identification_number);
        $role_id = ValidateInput::cleanInput($role_id);
        $password = ValidateInput::cleanInput($password);
        
        try {

        // validate user input
        if (empty($name) && empty($username) && empty($email) && empty($mobile) && empty($identification_number) && empty($role_id) && empty($password)) {
            $response = [
                'status' => 'error',
                'message' => 'All fields are required',
                'data'=>null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Handle invalid email
            $response = [
                'status' => 'error',
                'message' => 'Invalid email format',
            ];
            http_response_code(400);
            return json_encode($response);
        }
        
        // Validate mobile number format
        if (!preg_match('/^[0-9]{10}$/', $mobile)) {
            // Handle invalid mobile number
            $response = [
                'status' => 'error',
                'message' => 'Invalid mobile number format',
            ];
            http_response_code(400);
            return json_encode($response);
        }

        if (strlen($data['password']) < 6) {
            $errors['password'] = 'Password must be at least 6 characters';
        }

        if (!is_numeric($role_id)) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid role id',
            ];

            http_response_code(422);
            return json_encode($response);
        }

        
            $password = password_hash($password, PASSWORD_DEFAULT);

            $connection = DBConnection::getConnection();
            $sql = "INSERT INTO users (name, username, email, mobile, identification_number, role_id, password) 
                    VALUES (:name, :username, :email, :mobile, :identification_number, :role_id, :password)";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
            $stmt->bindParam(':username', $username, \PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, \PDO::PARAM_STR);
            $stmt->bindParam(':mobile', $mobile, \PDO::PARAM_STR);
            $stmt->bindParam(':identification_number', $identification_number, \PDO::PARAM_STR);
            $stmt->bindParam(':role_id', $role_id, \PDO::PARAM_INT);
            $stmt->bindParam(':password', $password, \PDO::PARAM_STR);
            $stmt->execute();

            $response = [
                'status' => 'success',
                'message' => 'User created successfully',
            ];

            http_response_code(201);
            return json_encode($response);
        }catch (\Exception $exception){
            die("Error: " . $exception->getMessage());
        }
    }

    public function update($id, $name, $username, $identification_number, $role_id)
    {
        // clean user input
        $id = ValidateInput::cleanInput($id);
        $name = ValidateInput::cleanInput($name);
        $username = ValidateInput::cleanInput($username);
        $identification_number = ValidateInput::cleanInput($identification_number);
        $role_id = ValidateInput::cleanInput($role_id);

        // validate user input
        if (empty($id) || empty($name) || empty($username) || empty($identification_number) || empty($role_id)) {
            $response = [
                'status' => 'error',
                'message' => 'All fields are required',
            ];

            return json_encode($response);
        }

        if (!is_numeric($id) || !is_numeric($role_id)) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid user id or role id',
            ];

            return json_encode($response);
        }

        try {
            $connection = DBConnection::getConnection();
            $sql = "UPDATE users SET name = :name, username = :username, identification_number = :identification_number, role_id = :role_id WHERE id = :id";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
            $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
            $stmt->bindParam(':username', $username, \PDO::PARAM_STR);
            $stmt->bindParam(':identification_number', $identification_number, \PDO::PARAM_STR);
            $stmt->bindParam(':role_id', $role_id, \PDO::PARAM_INT);
            $stmt->execute();

            $response = [
                'status' => 'success',
                'message' => 'User updated successfully',
            ];

            return json_encode($response);
        }catch (\Exception $exception){
            die("Error: " . $exception->getMessage());
        }
    }

    public function changePassword($id, $password,$old_password)
    {
        // clean user input
        $id = ValidateInput::cleanInput($id);
        $password = ValidateInput::cleanInput($password);
        $old_password = ValidateInput::cleanInput($old_password);

        // validate user input
        if (empty($id) || empty($password) || empty($old_password)) {
            $response = [
                'status' => 'error',
                'message' => 'All fields are required',
            ];

            return json_encode($response);
        }

        if (!is_numeric($id)) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid user id',
            ];

            return json_encode($response);
        }

        try {
            // check if old password is correct
            $connection = DBConnection::getConnection();
            $sql = "SELECT password FROM users WHERE id = :id";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':id', $id, \PDO::PARAM_INT);

            $stmt->execute();
            $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            $old_password_hash = $results[0]['password'];
            if (!password_verify($old_password, $old_password_hash)) {
                $response = [
                    'status' => 'error',
                    'message' => 'Old password is incorrect',
                ];

                return json_encode($response);
            }

            $password = password_hash($password, PASSWORD_DEFAULT);

            $sql = "UPDATE users SET password = :password WHERE id = :id";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
            $stmt->bindParam(':password', $password, \PDO::PARAM_STR);
            $stmt->execute();

            $response = [
                'status' => 'success',
                'message' => 'Password changed successfully',
                'data'=>null,
            ];

            return json_encode($response);
        }catch (\Exception $exception){
            die("Error: " . $exception->getMessage());
        }
    }

    public function deactivateUser($userId)
    {
        $userId = ValidateInput::cleanInput($userId);

        try {
            $connection = DBConnection::getConnection();
            $connection->beginTransaction();
            $sql = "DELETE FROM users WHERE id = :id";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':id', $userId, \PDO::PARAM_INT);
            $stmt->execute();

            // Check if any row was actually deleted
            if ($stmt->rowCount() > 0) {
                $connection->commit();
                $response = [
                    'status' => 'success',
                    'message' => 'User deleted successfully',
                    'data' => null
                ];
            } else {
                $connection->rollBack();
                $response = [
                    'status' => 'error',
                    'message' => 'No user found with the given ID, or user was already deleted',
                    'data' => null
                ];
            }
        } catch (\Exception $e) {
            $connection->rollBack();
            $response = [
                'status' => 'error',
                'message' => 'An error occurred while deleting the user: ' . $e->getMessage(),
                'data' => null
            ];
        }

        return json_encode($response);
    }
}