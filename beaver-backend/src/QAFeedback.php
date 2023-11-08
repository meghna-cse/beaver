<?php

namespace Beaver\Beaver;

class QAFeedback
{
    // add qa feedback
    public function addQAFeedback($exam_id,$comment,$course_objective_id,$created_by)
    {
        // validate user input
        $exam_id = Utils\ValidateInput::cleanInput($exam_id);
        $comment = Utils\ValidateInput::cleanInput($comment);
        $course_objective_id = Utils\ValidateInput::cleanInput($course_objective_id);
        $created_by = Utils\ValidateInput::cleanInput($created_by);

        // check if there is any field missing, then return an error for all missing fields
        $error_data = [];

        if (empty($comment) || $comment == "") {
            $error_data['comment'] = 'Comment is required';
        }

        // ensure that either exam_id or course_objective_id is provided
        if (empty($exam_id) && empty($course_objective_id)) {
            $error_data['exam_id'] = 'Exam id or course objective id is required';
            $error_data['course_objective_id'] = 'Course objective id or exam id is required';
        }

        if (empty($created_by) || $created_by == "") {
            $error_data['created_by'] = 'Created by is required';
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

        // check if the qa exists
        $sql = "SELECT count(id) FROM users WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $created_by, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'QA not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        if (!empty($exam_id)) {
            // check if the exam exists
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
        }

        if (!empty($course_objective_id)) {
            // check if the course objective exists
            $sql = "SELECT count(id) FROM course_objectives WHERE id = :id";

            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':id', $course_objective_id, \PDO::PARAM_INT);
            $stmt->execute();

            if (!$stmt->fetchColumn()) {
                $response = [
                    'status' => 'error',
                    'message' => 'Course objective not found',
                    'data' => null,
                ];
                http_response_code(404);
                return json_encode($response);
            }
        }


        

        // insert the qa feedback
        $sql = "INSERT INTO qa_feedback (exam_id,comment,course_objective_id,created_by) VALUES (:exam_id,:comment,:course_objective_id,:created_by)";

        $stmt = $connection->prepare($sql);
       
            $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
            $stmt->bindParam(':course_objective_id', $course_objective_id, \PDO::PARAM_NULL);
    

        $stmt->bindParam(':comment', $comment, \PDO::PARAM_STR);
        $stmt->bindParam(':created_by', $created_by, \PDO::PARAM_INT);

        if ($stmt->execute()){
            $response = [
                'status' => 'success',
                'message' => 'QA Feedback added successfully',
                'data' => null,
            ];
            http_response_code(201);
        }else{
            $response = [
                'status' => 'error',
                'message' => 'Error adding QA Feedback',
                'data' => null,
            ];
            http_response_code(500);
        }
        return json_encode($response);
    }

    // update qa feedback
    public function updateQAFeedback($id,$exam_id,$comment,$course_objective_id)
    {
        // validate user input
        $id = Utils\ValidateInput::cleanInput($id);
        $exam_id = Utils\ValidateInput::cleanInput($exam_id);
        $comment = Utils\ValidateInput::cleanInput($comment);
        $course_objective_id = Utils\ValidateInput::cleanInput($course_objective_id);

        // check if there is any field missing, then return an error for all missing fields
        $error_data = [];
        if (empty($id) || $id == "") {
            $error_data['id'] = 'Id is required';
        }

        if (empty($comment) || $comment == "") {
            $error_data['comment'] = 'Comment is required';
        }

        // ensure that either exam_id or course_objective_id is provided
        if (empty($exam_id) && empty($course_objective_id)) {
            $error_data['exam_id'] = 'Exam id or course objective id is required';
            $error_data['course_objective_id'] = 'Course objective id or exam id is required';
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

        // check if the qa feedback exists
        $connection = Utils\DBConnection::getConnection();

        $sql = "SELECT count(*) FROM qa_feedback WHERE id = :id";

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();

        if (!$stmt->fetchColumn()) {
            $response = [
                'status' => 'error',
                'message' => 'QA Feedback not found',
                'data' => null,
            ];
            http_response_code(404);
            return json_encode($response);
        }

        if (!empty($exam_id)) {
            // check if the exam exists
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
        }

        if (!empty($course_objective_id)) {
            // check if the course objective exists
            $sql = "SELECT count(id) FROM course_objectives WHERE id = :id";

            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':id', $course_objective_id, \PDO::PARAM_INT);
            $stmt->execute();

            if (!$stmt->fetchColumn()) {
                $response = [
                    'status' => 'error',
                    'message' => 'Course objective not found',
                    'data' => null,
                ];
                http_response_code(404);
                return json_encode($response);
            }
        }

        // update the qa feedback
        $sql = "UPDATE qa_feedback SET exam_id = :exam_id, comment = :comment, course_objective_id = :course_objective_id WHERE id = :id";

        $stmt = $connection->prepare($sql);
        if (!empty($exam_id)) {
            $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
            $stmt->bindParam(':course_objective_id', $course_objective_id, \PDO::PARAM_NULL);
        }
        if (!empty($course_objective_id)) {
            $stmt->bindParam(':course_objective_id', $course_objective_id, \PDO::PARAM_INT);
            $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_NULL);
        }
        $stmt->bindParam(':comment', $comment, \PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);

        if ($stmt->execute()) {
            $response = [
                'status' => 'success',
                'message' => 'QA Feedback updated successfully',
                'data' => null,
            ];
            http_response_code(200);
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Error updating QA Feedback',
                'data' => null,
            ];
            http_response_code(500);
        }
        return json_encode($response);

    }

    // list qa feedback
    public function fetchAllQAFeedback($feedback_id = null,$qa_id = null,$exam_id = null,$course_objective_id = null,$course_id = null){
        // validate user input if set
        if (!empty($feedback_id)) {
            $feedback_id = Utils\ValidateInput::cleanInput($feedback_id);
        }

        if (!empty($qa_id)) {
            $qa_id = Utils\ValidateInput::cleanInput($qa_id);
        }

        if (!empty($exam_id)) {
            $exam_id = Utils\ValidateInput::cleanInput($exam_id);
        }

        if (!empty($course_objective_id)) {
            $course_objective_id = Utils\ValidateInput::cleanInput($course_objective_id);
        }

        if (!empty($course_id)) {
            $course_id = Utils\ValidateInput::cleanInput($course_id);
        }

        // check if the qa feedback exists
        $connection = Utils\DBConnection::getConnection();

        if (!empty($feedback_id)) {
            $sql = "SELECT count(id) FROM qa_feedback WHERE id = :id";

            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':id', $feedback_id, \PDO::PARAM_INT);
            $stmt->execute();

            if (!$stmt->fetchColumn()) {
                $response = [
                    'status' => 'error',
                    'message' => 'QA Feedback not found',
                    'data' => null,
                ];
                http_response_code(404);
                return json_encode($response);
            }
        }

        if (!empty($qa_id)) {
            $sql = "SELECT count(id) FROM users WHERE id = :qa_id";

            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':qa_id', $qa_id, \PDO::PARAM_INT);
            $stmt->execute();

            if (!$stmt->fetchColumn()) {
                $response = [
                    'status' => 'error',
                    'message' => 'QA not found',
                    'data' => null,
                ];
                http_response_code(404);
                return json_encode($response);
            }
        }

        if (!empty($exam_id)) {
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
        }

        if (!empty($course_objective_id)) {
            $sql = "SELECT count(id) FROM course_objectives WHERE id = :id";

            $stmt = $connection->prepare($sql);
            $stmt->bindParam(':id', $course_objective_id, \PDO::PARAM_INT);
            $stmt->execute();

            if (!$stmt->fetchColumn()) {
                $response = [
                    'status' => 'error',
                    'message' => 'Course objective not found',
                    'data' => null,
                ];
                http_response_code(404);
                return json_encode($response);
            }
        }

        // fetch all qa feedback
        $sql = "SELECT qaf.id,qaf.comment,qaf.created_at,qaf.updated_at,qaf.created_by,qaf.updated_by,qaf.exam_id,qaf.course_objective_id,e.name as exam_name,co.name as course_objective_name,u.name as qa_name FROM qa_feedback qaf LEFT JOIN exams e ON qaf.exam_id = e.id LEFT JOIN course_objectives co ON qaf.course_objective_id = co.id JOIN users u ON qaf.created_by = u.id";

        // check if the id is set
        if (!empty($feedback_id)) {
            $sql .= " WHERE qaf.id = :id";
        }

        // check if the qa id is set
        if (!empty($qa_id)) {
            $sql .= " WHERE qaf.created_by = :qa_id";
        }

        // check if the exam id is set
        if (!empty($exam_id)) {
            $sql .= " WHERE qaf.exam_id = :exam_id";
        }

        // check if the course objective id is set
        if (!empty($course_objective_id)) {
            $sql .= " WHERE qaf.course_objective_id = :course_objective_id";
        }

        // check if the course id is set
        if (!empty($course_id)) {
            $sql .= " WHERE e.course_id = :course_id";
        }

        $stmt = $connection->prepare($sql);

        // check if the id is set
        if (!empty($feedback_id)) {
            $stmt->bindParam(':id', $feedback_id, \PDO::PARAM_INT);
        }

        // check if the qa id is set
        if (!empty($qa_id)) {
            $stmt->bindParam(':qa_id', $qa_id, \PDO::PARAM_INT);
        }

        // check if the exam id is set
        if (!empty($exam_id)) {
            $stmt->bindParam(':exam_id', $exam_id, \PDO::PARAM_INT);
        }

        // check if the course objective id is set
        if (!empty($course_objective_id)) {
            $stmt->bindParam(':course_objective_id', $course_objective_id, \PDO::PARAM_INT);
        }

        // check if the course id is set
        if (!empty($course_id)) {
            $stmt->bindParam(':course_id', $course_id, \PDO::PARAM_INT);
        }

        $stmt->execute();

        $qa_feedback = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (!$qa_feedback) {
            $response = [
                'status' => 'error',
                'message' => 'QA Feedback not found',
                'data' => [],
            ];
            http_response_code(404);
        } else {
            $response = [
                'status' => 'success',
                'message' => 'QA Feedback fetched successfully',
                'data' => $qa_feedback,
            ];
            http_response_code(200);
        }
        return json_encode($response);
    }
}