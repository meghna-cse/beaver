<?php



namespace Beaver\Beaver;
use Beaver\Beaver\Configs\AppConfig;
AppConfig::allowOrigin();


class StudentEnrolments
{
    // get all student enrolments
    public function getAllStudentEnrolments(){
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT * FROM student_enrolments";

        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $response = [
            'status' => 'success',
            'message' => 'Student enrolments fetched successfully',
            'data' => $result,
        ];

        http_response_code(200);
        return json_encode($response);
    }

    // get student enrolment by id
    public function getStudentEnrolmentById($id){
        // validate and clean user input
        $id = Utils\ValidateInput::cleanInput($id);

        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT * FROM student_enrolments WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (!$result) {
            $response = [
                'status' => 'error',
                'message' => 'Student enrolment not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        $response = [
            'status' => 'success',
            'message' => 'Student enrolment fetched successfully',
            'data' => $result,
        ];

        http_response_code(200);
        return json_encode($response);
    }

    public function getStudentEnrolmentsByStudent($student_id)
    {
        // validate and clean user input
        $student_id = Utils\ValidateInput::cleanInput($student_id);

        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT student_enrolments.*, courses.name as course_name FROM student_enrolments INNER JOIN courses ON courses.id = student_enrolments.course_id WHERE student_id = :student_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':student_id', $student_id, \PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (!$result) {
            $response = [
                'status' => 'error',
                'message' => 'Student enrolments not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        $response = [
            'status' => 'success',
            'message' => 'Student enrolments fetched successfully',
            'data' => $result,
        ];
        return json_encode($response);
    }

    public function getStudentEnrolmentsByCourse($course_id)
    {
        // validate and clean user input
        $course_id = Utils\ValidateInput::cleanInput($course_id);

        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT * FROM student_enrolments WHERE course_id = :course_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (!$result) {
            $response = [
                'status' => 'error',
                'message' => 'Student enrolments not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        $response = [
            'status' => 'success',
            'message' => 'Student enrolments fetched successfully',
            'data' => $result,
        ];
        return json_encode($response);
    }

    public function addStudentEnrolments($student_id,$course_id){
        // validate and clean user input
        $student_id = Utils\ValidateInput::cleanInput($student_id);
        $course_id = Utils\ValidateInput::cleanInput($course_id);

        // check if there is any field missing, then return an error for all missing fields
        $error_data = [];
        if (empty($student_id)){
            $error_data['student_id'] = "Student id is required";
        }
        if (empty($course_id)){
            $error_data['course_id'] = "Course id is required";
        }
        if (!empty($error_data)){
            $response = [
                'status' => 'error',
                'message' => 'Missing required fields',
                'data' => $error_data,
            ];
            http_response_code(400);
            return json_encode($response);
        }

        $connection = Utils\DBConnection::getConnection();

        // check if the student id exists
        $sql = "SELECT count(id) FROM users WHERE id = :student_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':student_id', $student_id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Student not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        // check if the course id exists
        $sql = "SELECT count(id) FROM courses WHERE id = :course_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Course not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        $sql = "INSERT INTO student_enrolments (student_id, course_id) VALUES (:student_id, :course_id)";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':student_id', $student_id, \PDO::PARAM_INT);
        $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        $stmt->execute();

        $response = [
            'status' => 'success',
            'message' => 'Student enrolment added successfully',
            'data' => null,
        ];

        http_response_code(201);
        return json_encode($response);
    }

    // update student enrolments
    public function updateStudentEnrolments($id, $student_id, $course_id)
    {
        // validate and clean user input
        $id = Utils\ValidateInput::cleanInput($id);
        $student_id = Utils\ValidateInput::cleanInput($student_id);
        $course_id = Utils\ValidateInput::cleanInput($course_id);

        // check if there is any field missing, then return an error for all missing fields
        $error_data = [];
        if (empty($id)) {
            $error_data['id'] = "Id is required";
        }
        if (empty($student_id)) {
            $error_data['student_id'] = "Student id is required";
        }
        if (empty($course_id)) {
            $error_data['course_id'] = "Course id is required";
        }
        if (!empty($error_data)) {
            $response = [
                'status' => 'error',
                'message' => 'Missing required fields',
                'data' => $error_data,
            ];
            http_response_code(400);
            return json_encode($response);
        }

        $connection = Utils\DBConnection::getConnection();

        // check if the student id exists
        $sql = "SELECT count(id) FROM users WHERE id = :student_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':student_id', $student_id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Student not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        // check if the course id exists
        $sql = "SELECT count(id) FROM courses WHERE id = :course_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Course not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        $sql = "UPDATE student_enrolments SET student_id = :student_id, course_id = :course_id WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':student_id', $student_id, \PDO::PARAM_INT);
        $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();

        $response = [
            'status' => 'success',
            'message' => 'Student enrolment updated successfully',
            'data' => null,
        ];

        http_response_code(200);
        return json_encode($response);
    }
}