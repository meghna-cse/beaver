<?php

namespace Beaver\Beaver;

// check if request method is POST
require 'vendor/autoload.php';

use Beaver\Beaver\Configs\AppConfig;
use Beaver\Beaver\CourseObjectives;
use Beaver\Beaver\Utils\AuthUtil;

AppConfig::allowOrigin();

class Exams
{
    // add exam
    public function addExam($name,$course_id,$exam_date,$exam_type,$exam_format,$max_score,$passing_score){
        // validate and clean user input
        $name = Utils\ValidateInput::cleanInput($name);
        $course_id = Utils\ValidateInput::cleanInput($course_id);
        $exam_date = Utils\ValidateInput::cleanInput($exam_date);
        $exam_type = Utils\ValidateInput::cleanInput($exam_type);
        $exam_format = Utils\ValidateInput::cleanInput($exam_format);
        $max_score = Utils\ValidateInput::cleanInput($max_score);
        $passing_score = Utils\ValidateInput::cleanInput($passing_score);

        $exam_date = date('Y-m-d',strtotime($exam_date));
        
        // //temp
        // $response = [
        //     'status' => 'error',
        //     'message' => 'All fields are required',
        //     'data' => $name,
        //     'data1' => $course_id,
        //     'data2' => $exam_date,
        //     'data3' => $exam_type,
        //     'data4' => $exam_format,
        //     'data5' => $max_score,
        //     'data6' => $passing_score,
        // ];

        // http_response_code(400);
        // return json_encode($response);
        // //temp


        // check if all required fields are provided
        if (empty($name) || empty($course_id) || empty($exam_date) || empty($exam_type) || empty($exam_format) ||
            empty($max_score) || empty($passing_score)){
            $response = [
                'status' => 'error',
                'message' => 'All fields are required',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        // validate course id
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT COUNT(id) FROM courses WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $course_id, \PDO::PARAM_INT);
        $stmt->execute();
        $fetched_course = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$fetched_course) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid course',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        // validate exam type
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT COUNT(id) FROM ref_exam_types WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $exam_type, \PDO::PARAM_INT);
        $stmt->execute();
        $fetched_exam_types = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$fetched_exam_types) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid exam type',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        // validate exam format
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT COUNT(id) FROM ref_exam_formats WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $exam_format, \PDO::PARAM_INT);
        $stmt->execute();
        $fetched_exam_formats = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$fetched_exam_formats) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid exam format',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        $connection = Utils\DBConnection::getConnection();
        $sql = "INSERT INTO exams (name,course_id,exam_date,exam_type,exam_format,max_score,passing_score) VALUES (:name,:course_id,:exam_date,:exam_type,:exam_format,:max_score,:passing_score)";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        $stmt->bindParam(':exam_date', $exam_date);
        $stmt->bindParam(':exam_type', $exam_type);
        $stmt->bindParam(':exam_format', $exam_format);
        $stmt->bindParam(':max_score', $max_score, \PDO::PARAM_INT);
        $stmt->bindParam(':passing_score', $passing_score, \PDO::PARAM_INT);
        $stmt->execute();

        $response = [
            'status' => 'success',
            'message' => 'Exam created successfully',
            'data' => null,
        ];

        http_response_code(201);
        return json_encode($response);
    }

    // update exam
    public function updateExam($id,$name,$course_id,$exam_date,$exam_type,$exam_format,$max_score,$passing_score){
        // validate and clean user input
        $id = Utils\ValidateInput::cleanInput($id);
        $name = Utils\ValidateInput::cleanInput($name);
        $course_id = Utils\ValidateInput::cleanInput($course_id);
        $exam_date = Utils\ValidateInput::cleanInput($exam_date);
        $exam_type = Utils\ValidateInput::cleanInput($exam_type);
        $exam_format = Utils\ValidateInput::cleanInput($exam_format);
        $max_score = Utils\ValidateInput::cleanInput($max_score);
        $passing_score = Utils\ValidateInput::cleanInput($passing_score);

        // check if all required fields are provided
        if (empty($id) || empty($name) || empty($course_id) || empty($exam_date) || empty($exam_type) || empty($exam_format) ||
            empty($max_score) || empty($passing_score)){
            $response = [
                'status' => 'error',
                'message' => 'All fields are required',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        // validate course id
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT COUNT(id) FROM courses WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $course_id, \PDO::PARAM_INT);
        $stmt->execute();
        $fetched_course = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$fetched_course) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid course',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        // validate exam type
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT COUNT(id) FROM ref_exam_types WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $exam_type, \PDO::PARAM_INT);
        $stmt->execute();
        $fetched_exam_type = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$fetched_exam_type) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid exam type',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        // validate exam format
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT COUNT(id) FROM ref_exam_formats WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $exam_format, \PDO::PARAM_INT);
        $stmt->execute();
        $fetched_exam_format = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$fetched_exam_format) {
            $response = [
                'status' => 'error',
                'message' => 'Invalid exam format',
                'data' => null,
            ];

            http_response_code(400);
            return json_encode($response);
        }

        $connection = Utils\DBConnection::getConnection();
        $sql = "UPDATE exams SET name = :name, course_id = :course_id, exam_date = :exam_date, exam_type = :exam_type, exam_format = :exam_format, max_score = :max_score, passing_score = :passing_score WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
        $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        $stmt->bindParam(':exam_date', $exam_date, \PDO::PARAM_STR);
        $stmt->bindParam(':exam_type', $exam_type, \PDO::PARAM_STR);
        $stmt->bindParam(':exam_format', $exam_format, \PDO::PARAM_STR);
        $stmt->bindParam(':max_score', $max_score, \PDO::PARAM_INT);
        $stmt->bindParam(':passing_score', $passing_score, \PDO::PARAM_INT);
        $stmt->execute();

        $response = [
            'status' => 'success',
            'message' => 'Exam updated successfully',
            'data' => null,
        ];

        http_response_code(200);
        return json_encode($response);
    }

    // list exams
    public function listExams(){
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT exams.*, ref_exam_types.type as exam_type_name, ref_exam_formats.format as exam_format_name FROM exams INNER JOIN ref_exam_types ON ref_exam_types.id = exams.exam_type INNER JOIN ref_exam_formats ON ref_exam_formats.id = exams.exam_format";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $exams = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $response = [
            'status' => 'success',
            'message' => 'Exams retrieved successfully',
            'data' => $exams,
        ];

        http_response_code(200);
        return json_encode($response);
    }

    // list exams by course
    public function listExamsByCourse($course_id){
        $connection = Utils\DBConnection::getConnection();
        $sql = "SELECT exams.*, ref_exam_types.type as exam_type_name, ref_exam_formats.format as exam_format_name FROM exams INNER JOIN ref_exam_types ON ref_exam_types.id = exams.exam_type INNER JOIN ref_exam_formats ON ref_exam_formats.id = exams.exam_format WHERE course_id = :course_id";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        $stmt->execute();
        $exams = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $response = [
            'status' => 'success',
            'message' => 'Exams retrieved successfully',
            'data' => $exams,
        ];

        http_response_code(200);
        return json_encode($response);
    }
}