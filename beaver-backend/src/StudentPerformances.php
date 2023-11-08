<?php

namespace Beaver\Beaver;

use Beaver\Beaver\Configs\AppConfig;
AppConfig::allowOrigin();

class StudentPerformances
{
    // add student performance
    public function addStudentPerformance($student_id, $exam_id, $score)
    {
        // validate and clean user input
        $student_id = Utils\ValidateInput::cleanInput($student_id);
        $exam_id = Utils\ValidateInput::cleanInput($exam_id);
        $score = Utils\ValidateInput::cleanInput($score);

        // check if any of the fields is missing and include them in the error response
        $error_data = [];
        if (empty($student_id) || $student_id == "") {
            $error_data['student_id'] = 'Student id is required';
        }
        if (empty($exam_id) || $exam_id == "") {
            $error_data['exam_id'] = 'Exam id is required';
        }
        if (empty($score) || $score == "") {
            $error_data['score'] = 'Score is required';
        }
        // check if the score is between 0 and 100
        if ($score < 0 || $score > 100) {
            $error_data['score'] = 'Score must be between 0 and 100';
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

        // check if the student id exists
        $connection = Utils\DBConnection::getConnection();
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

        // check if the exam id exists
        $sql = "SELECT count(id) FROM exams WHERE id = :exam_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Exam not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        // check if the student has already taken the exam
        $sql = "SELECT count(id) FROM student_performances WHERE student_id = :student_id AND exam_id = :exam_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':student_id', $student_id, \PDO::PARAM_INT);
        $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Student has already taken the exam',
                'data' => null,
            ];
            http_response_code(409);
            return json_encode($response);
        }

        // insert the student performance
        $sql = "INSERT INTO student_performances (student_id, exam_id, score) VALUES (:student_id, :exam_id, :score)";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':student_id', $student_id, \PDO::PARAM_INT);
        $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
        $stmt->bindParam(':score', $score, \PDO::PARAM_INT);

        if ($stmt->execute()) {
            $response = [
                'status' => 'success',
                'message' => 'Student performance added successfully',
                'data' => null,
            ];
            http_response_code(201);
            return json_encode($response);
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Failed to add student performance',
                'data' => null,
            ];
            http_response_code(500);
            return json_encode($response);
        }
    }


    // update student performance
    public function updateStudentPerformance($student_id, $exam_id, $score)
    {
        // validate and clean user input
        $student_id = Utils\ValidateInput::cleanInput($student_id);
        $exam_id = Utils\ValidateInput::cleanInput($exam_id);
        $score = Utils\ValidateInput::cleanInput($score);

        // check if any of the fields is missing and include them in the error response
        $error_data = [];
        if (empty($student_id) || $student_id == "") {
            $error_data['student_id'] = 'Student id is required';
        }
        if (empty($exam_id) || $exam_id == "") {
            $error_data['exam_id'] = 'Exam id is required';
        }
        if (empty($score) || $score == "") {
            $error_data['score'] = 'Score is required';
        }
        // check if the score is between 0 and 100
        if ($score < 0 || $score > 100) {
            $error_data['score'] = 'Score must be between 0 and 100';
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

        // check if the student id exists
        $connection = Utils\DBConnection::getConnection();
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

        // check if the exam id exists
        $sql = "SELECT count(id) FROM exams WHERE id = :exam_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'Exam not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        // udpate student performance
        $sql = "UPDATE student_performances SET score = :score WHERE student_id = :student_id AND exam_id = :exam_id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':student_id', $student_id, \PDO::PARAM_INT);
        $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
        $stmt->bindParam(':score', $score, \PDO::PARAM_INT);

        if ($stmt->execute()) {
            $response = [
                'status' => 'success',
                'message' => 'Student performance updated successfully',
                'data' => null,
            ];
            http_response_code(200);
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Failed to update student performance',
                'data' => null,
            ];
            http_response_code(500);
        }
        return json_encode($response);
    }

    // list student performance by student id, or by subject id or by exam id, or by course id
    public function fetchStudentPerformances($student_id = null,$exam_id = null,$course_id = null,$instructor_id = null){
        // check if the student id exists if it is set
        if ($student_id) {
            $connection = Utils\DBConnection::getConnection();
            $sql = "SELECT count(id) FROM users WHERE id = :student_id";

            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':student_id', $student_id, \PDO::PARAM_INT);
            $stmt->execute();

            if (!$stmt->fetchColumn()) {
                $response = [
                    'status' => 'error',
                    'message' => 'Student not found',
                    'data' => [],
                ];
                http_response_code(404);
                return json_encode($response);
            }
        }

        // check if the exam id exists if it is set
        if ($exam_id) {
            $connection = Utils\DBConnection::getConnection();
            $sql = "SELECT count(id) FROM exams WHERE id = :exam_id";

            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
            $stmt->execute();

            if (!$stmt->fetchColumn()) {
                $response = [
                    'status' => 'error',
                    'message' => 'Exam not found',
                    'data' => [],
                ];
                http_response_code(404);
                return json_encode($response);
            }
        }

        // check if the course id exists if it is set
        if ($course_id) {
            $connection = Utils\DBConnection::getConnection();
            $sql = "SELECT count(id) FROM courses WHERE id = :course_id";

            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
            $stmt->execute();

            if (!$stmt->fetchColumn()) {
                $response = [
                    'status' => 'error',
                    'message' => 'Course not found',
                    'data' => [],
                ];
                http_response_code(404);
                return json_encode($response);
            }
        }

        // fetch student performances
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT student_performances.id, student_performances.student_id, student_performances.exam_id, student_performances.score, users.name, exams.name as exam_name, exams.exam_date, courses.name, courses.id as course_id FROM student_performances INNER JOIN users ON student_performances.student_id = users.id INNER JOIN exams ON student_performances.exam_id = exams.id INNER JOIN course_instructors ON exams.course_id = course_instructors.course_id INNER JOIN courses ON exams.course_id = courses.id";

        if ($student_id) {
            $sql .= " WHERE student_performances.student_id = :student_id";
        }
        if ($exam_id) {
            $sql .= " WHERE student_performances.exam_id = :exam_id";
        }
        if ($course_id) {
            $sql .= " WHERE exams.course_id = :course_id";
        }
        if ($instructor_id) {
            $sql .= " WHERE course_instructors.instructor_id = :instructor_id";
        }

        $stmt = $connection->prepare($sql);
        if ($student_id) {
            $stmt->bindParam(':student_id', $student_id, \PDO::PARAM_INT);
        }
        if ($exam_id) {
            $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
        }
        if ($course_id) {
            $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        }
        if ($instructor_id) {
            $stmt->bindParam(':instructor_id', $instructor_id, \PDO::PARAM_INT);
        }
        $stmt->execute();

        $student_performances = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if ($student_performances) {
            $response = [
                'status' => 'success',
                'message' => 'Student performances fetched successfully',
                'data' => $student_performances,
            ];
            http_response_code(200);
        } else {
            $response = [
                'status' => 'error',
                'message' => 'No student performances found',
                'data' => [],
            ];
            http_response_code(404);
        }
        return json_encode($response);
    }

    public function getAverageScoresByCourse()
    {
        $connection = Utils\DBConnection::getConnection();

        // SQL to calculate average scores per course
        $sql = "SELECT courses.id as course_id, courses.name, AVG(student_performances.score) as average_score
                FROM courses
                JOIN exams ON courses.id = exams.course_id
                JOIN student_performances ON exams.id = student_performances.exam_id
                GROUP BY courses.id, courses.name";

        $stmt = $connection->prepare($sql);
        $stmt->execute();

        $averageScores = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if ($averageScores) {
            $response = [
                'status' => 'success',
                'message' => 'Average scores fetched successfully',
                'data' => $averageScores,
            ];
            http_response_code(200);
        } else {
            $response = [
                'status' => 'error',
                'message' => 'No average scores found',
                'data' => [],
            ];
            http_response_code(404);
        }
        return json_encode($response);
    }

}