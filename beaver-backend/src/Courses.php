<?php

namespace Beaver\Beaver;

class Courses
{
    // TODO: Create, Read, Update, Delete
    public static function getAllCourses()
    {
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT c.id,c.name,c.description,u.name as instructor_name, u.id as instructor_id  
                FROM courses c INNER JOIN course_instructors ci ON ci.course_id = c.id
                INNER JOIN users u ON u.id = ci.instructor_id";

        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $response = [
            'status' => 'success',
            'message' => 'Courses fetched successfully',
            'data' => $result,
        ];

        return json_encode($response);
    }

    public function getCourseById($id)
    {
        // validate and clean user input
        $id = Utils\ValidateInput::cleanInput($id);

        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT c.id,c.name,c.description,u.name as instructor_name, u.id as instructor_id
                FROM courses c INNER JOIN course_instructors ci ON ci.course_id = c.id
                INNER JOIN users u ON u.id = ci.instructor_id
                WHERE c.id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (!$result) {
            $response = [
                'status' => 'error',
                'message' => 'Course not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        $response = [
            'status' => 'success',
            'message' => 'Course fetched successfully',
            'data' => $result,
        ];

        return json_encode($response);
    }

    public function addCourse($name, $description, $course_instructor_id)
    {
        // validate and clean user input
        $name = Utils\ValidateInput::cleanInput($name);
        $description = Utils\ValidateInput::cleanInput($description);
        $course_instructor_id = Utils\ValidateInput::cleanInput($course_instructor_id);

        // validate user input
        if (empty($name) || empty($description) || empty($course_instructor_id)) {
            $response = [
                'status' => 'error',
                'message' => 'All fields are required',
            ];

            return json_encode($response);
        }

        // check if course instructor exists
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT COUNT(id) FROM users WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $course_instructor_id, \PDO::PARAM_INT);
        $stmt->execute();
        $course_instructor = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$course_instructor) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid course instructor',
            ];

            return json_encode($response);
        }

        try {
            // insert course
            $sql = "INSERT INTO courses (name, description) VALUES (:name, :description)";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
            $stmt->bindParam(':description', $description, \PDO::PARAM_STR);
            $stmt->execute();

            $course_id = $connection->lastInsertId();

            $sql = "INSERT INTO course_instructors (course_id, instructor_id) VALUES (:course_id, :instructor_id)";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
            $stmt->bindParam(':instructor_id', $course_instructor_id, \PDO::PARAM_INT);
            $stmt->execute();


            $response = [
                'status' => 'success',
                'message' => 'Course added successfully',
                'data' => null,
            ];

            return json_encode($response);

        }catch (\Exception $exception) {
            error_log($exception->getMessage());
            $response = [
                'status' => 'error',
                'message' => 'Failed adding course',
            ];

            return json_encode($response);
        }
    }

    // update course
    public function updateCourse($id, $name, $description, $course_instructor_id)
    {
        // validate and clean user input
        $id = Utils\ValidateInput::cleanInput($id);
        $name = Utils\ValidateInput::cleanInput($name);
        $description = Utils\ValidateInput::cleanInput($description);
        $course_instructor_id = Utils\ValidateInput::cleanInput($course_instructor_id);

        // validate user input
        if (empty($id) || empty($name) || empty($description) || empty($course_instructor_id)) {
            $response = [
                'status' => 'error',
                'message' => 'All fields are required',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        // check if course instructor exists
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT COUNT(id) FROM users WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $course_instructor_id, \PDO::PARAM_INT);
        $stmt->execute();
        $course_instructor = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$course_instructor) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid course instructor',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        try {
            // start transaction
            $connection->beginTransaction();
            // update course
            $sql = "UPDATE courses SET name = :name, description = :description WHERE id = :id";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
            $stmt->bindParam(':description', $description, \PDO::PARAM_STR);
            $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
            $stmt->execute();

            // update course instructor
            $sql = "UPDATE course_instructors SET instructor_id = :instructor_id WHERE course_id = :course_id";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':instructor_id', $course_instructor_id, \PDO::PARAM_INT);
            $stmt->bindParam(':course_id', $id, \PDO::PARAM_INT);
            $stmt->execute();

            // commit transaction
            $connection->commit();

            $response = [
                'status' => 'success',
                'message' => 'Course updated successfully',
                'data' => null,
            ];

            http_response_code(200);
            return json_encode($response);
        } catch (\Exception $exception) {
            // rollback transaction
            $connection->rollBack();
            $response = [
                'status' => 'error',
                'message' => 'Failed updating course',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }
    }
}