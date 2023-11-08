<?php

namespace Beaver\Beaver;

class CourseObjectives
{
    // get all course objectives
    public function getAllCourseObjectives(){
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT * FROM course_objectives";

        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $response = [
            'status' => 'success',
            'message' => 'Course objectives fetched successfully',
            'data' => $result,
        ];

        http_response_code(200);
        return json_encode($response);
    }

    // get course objective by id
    public function getCourseObjectiveById($id){
        // validate and clean user input
        $id = Utils\ValidateInput::cleanInput($id);

        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT * FROM course_objectives WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (!$result) {
            $response = [
                'status' => 'error',
                'message' => 'Course objective not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        $response = [
            'status' => 'success',
            'message' => 'Course objective fetched successfully',
            'data' => $result,
        ];

        http_response_code(200);
        return json_encode($response);
    }

    public function getCourseObjectivesByCourse($course_id){
        // validate and clean user input
        $course_id = Utils\ValidateInput::cleanInput($course_id);

        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT * FROM course_objectives WHERE course_id = :course_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (!$result) {
            $response = [
                'status' => 'error',
                'message' => 'Course objectives not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        $response = [
            'status' => 'success',
            'message' => 'Course objectives fetched successfully',
            'data' => $result,
        ];

        http_response_code(200);
        return json_encode($response);
    }

    // create course objective
    public function addCourseObjective($name,$description,$course_id){
        // validate and clean user input
        $name = Utils\ValidateInput::cleanInput($name);
        $description = Utils\ValidateInput::cleanInput($description);
        $course_id = Utils\ValidateInput::cleanInput($course_id);

        // validate user input
        if (empty($name) || empty($description) || empty($course_id)) {
            $response = [
                'status' => 'error',
                'message' => 'All fields are required',
            ];

            http_response_code(400);
            return json_encode($response);
        }

        // check if course exists
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT COUNT(id) FROM courses WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $course_id, \PDO::PARAM_INT);
        $stmt->execute();
        $course = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$course) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid course',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        try {
            $sql = "INSERT INTO course_objectives (name, description, course_id) VALUES (:name, :description, :course_id)";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
            $stmt->bindParam(':description', $description, \PDO::PARAM_STR);
            $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
            $stmt->execute();

            $response = [
                'status' => 'success',
                'message' => 'Course objective created successfully',
                'data' => null,
            ];

            http_response_code(201);
            return json_encode($response);
        } catch (\PDOException $e) {
            error_log($e->getMessage());
            $response = [
                'status' => 'error',
                'message' => 'Course objective creation failed',
                'data' => null,
            ];

            http_response_code(500);
            return json_encode($response);
        }
    }


    // update course objective
    public function updateCourseObjectives($id,$name,$description,$course_id){
        // validate and clean user input
        $id = Utils\ValidateInput::cleanInput($id);
        $name = Utils\ValidateInput::cleanInput($name);
        $description = Utils\ValidateInput::cleanInput($description);
        $course_id = Utils\ValidateInput::cleanInput($course_id);

        // validate user input
        if (empty($name) || empty($description) || empty($course_id)) {
            $response = [
                'status' => 'error',
                'message' => 'All fields are required',
            ];

            http_response_code(400);
            return json_encode($response);
        }

        // check if course exists
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT COUNT(id) FROM courses WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $course_id, \PDO::PARAM_INT);
        $stmt->execute();
        $course = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$course) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid course',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        try {
            $sql = "UPDATE course_objectives SET name = :name, description = :description, course_id = :course_id WHERE id = :id";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
            $stmt->bindParam(':description', $description, \PDO::PARAM_STR);
            $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
            $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
            $stmt->execute();

            $response = [
                'status' => 'success',
                'message' => 'Course objective updated successfully',
                'data' => null,
            ];

            http_response_code(200);
            return json_encode($response);
        } catch (\PDOException $e) {
            $response = [
                'status' => 'error',
                'message' => 'Course objective update failed',
                'data' => null,
            ];

            http_response_code(500);
            return json_encode($response);
        }
    }
}