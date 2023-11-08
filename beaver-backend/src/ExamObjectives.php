<?php

namespace Beaver\Beaver;

use Beaver\Beaver\Utils\DBConnection;

class ExamObjectives
{
    // add exam objectives
    public function addExamObjective($name,$description,$exam_id){
        // validate user input
        $name = Utils\ValidateInput::cleanInput($name);
        $description = Utils\ValidateInput::cleanInput($description);
        $exam_id = Utils\ValidateInput::cleanInput($exam_id);

        // check if there is any field missing, then return an error for all missing fields
        $error_data = [];
        if (empty($name) || $name == "") {
            $error_data['name'] = 'Name is required';
        }

        if (empty($description) || $description == "") {
            $error_data['description'] = 'Description is required';
        }

        if (empty($exam_id) || $exam_id == "") {
            $error_data['exam_id'] = 'Exam id is required';
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

        // check if the exam exists
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT count(id) FROM exams WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $exam_id, \PDO::PARAM_INT);
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

        // insert the exam objective
        $sql = "INSERT INTO exam_objectives (name,description,exam_id) VALUES (:name,:description,:exam_id)";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, \PDO::PARAM_STR);
        $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);

        if ($stmt->execute()){
            $response = [
                'status' => 'success',
                'message' => 'Exam objective added successfully',
                'data' => null,
            ];
            http_response_code(201);
            return json_encode($response);
        }else{
            $response = [
                'status' => 'error',
                'message' => 'Error adding exam objective',
                'data' => null,
            ];
            http_response_code(500);
            return json_encode($response);
        }
    }

    // update exam objectives
    public function updateExamObjectives($id,$name,$description,$exam_id){
        // validate user input
        $id = Utils\ValidateInput::cleanInput($id);
        $name = Utils\ValidateInput::cleanInput($name);
        $description = Utils\ValidateInput::cleanInput($description);
        $exam_id = Utils\ValidateInput::cleanInput($exam_id);

        // check if there is any field missing, then return an error for all missing fields
        $error_data = [];
        if (empty($id) || $id == "") {
            $error_data['id'] = 'Id is required';
        }
        if (empty($name) || $name == "") {
            $error_data['name'] = 'Name is required';
        }
        if (empty($description) || $description == "") {
            $error_data['description'] = 'Description is required';
        }
        if (empty($exam_id) || $exam_id == "") {
            $error_data['exam_id'] = 'Exam id is required';
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

        // check if the exam exists
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT count(id) FROM exams WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $exam_id, \PDO::PARAM_INT);
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

        // update the exam objective
        $sql = "UPDATE exam_objectives SET name = :name, description = :description, exam_id = :exam_id WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, \PDO::PARAM_STR);
        $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);

        if ($stmt->execute()){
            $response = [
                'status' => 'success',
                'message' => 'Exam objective updated successfully',
                'data' => null,
            ];
            http_response_code(200);
            return json_encode($response);
        }else{
            $response = [
                'status' => 'error',
                'message' => 'Error updating exam objective',
                'data' => null,
            ];
            http_response_code(500);
            return json_encode($response);
        }
    }

    // list exam objectives according to exam, course , exam objective id or all
    public function fetchAllExamObjectives($id = null, $exam_id = null, $course_id = null){
        // validate user input
        $id = Utils\ValidateInput::cleanInput($id);
        $exam_id = Utils\ValidateInput::cleanInput($exam_id);
        $course_id = Utils\ValidateInput::cleanInput($course_id);

        $connection = DBConnection::getConnection();

        // fetch the exam objectives, including the exam name and course name
        $sql = "SELECT eo.id,eo.name as objective_name,eo.description,eo.exam_id,e.name as exam_name,c.name as course_name FROM exam_objectives eo JOIN exams e ON eo.exam_id = e.id JOIN courses c ON e.course_id = c.id";

        // check if the id is set
        if (!empty($id)){
            $sql .= " WHERE eo.id = :id";
        }

        // check if the exam id is set
        if (!empty($exam_id)){
            $sql .= " WHERE eo.exam_id = :exam_id";
        }

        // check if the course id is set
        if (!empty($course_id)){
            $sql .= " WHERE e.course_id = :course_id";
        }

        $stmt = $connection->prepare($sql);

        // check if the id is set
        if (!empty($id)){
            $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        }

        // check if the exam id is set
        if (!empty($exam_id)){
            $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
        }

        // check if the course id is set
        if (!empty($course_id)){
            $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        }

        $stmt->execute();

        $exam_objectives = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (!$exam_objectives) {
            $response = [
                'status' => 'error',
                'message' => 'Exam objectives not found',
                'data' => [],
            ];
            http_response_code(404);
        }else{
            $response = [
                'status' => 'success',
                'message' => 'Exam objectives fetched successfully',
                'data' => $exam_objectives,
            ];
            http_response_code(200);
        }
        return json_encode($response);
    }
}