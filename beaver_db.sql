-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2023 at 03:08 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beaver_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `description`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 'Data Analysis and Modeling Techniques', 'The objective of this course is to provide students the basic data analysis and modeling concepts and methodologies using probability theory. Basic statics concepts and probability concepts will be covered. Fundamental data analysis and hypothesis techniques will be covered. Further data modeling methodologies such as Hidden Markov Models and Bayesian networks will be introduced. Students successfully completing this course will have gained a solid understanding of probabilistic data modeling, interpretation, and analysis and thus have formed an important basis solve practical statistics and data analysis related problems arising in broad computer science and engineering, and daily life.', '2023-10-30 15:43:51', NULL, NULL, NULL, 1),
(2, 'Artificial Intelligence', 'This course gives an introduction to the philosophies and techniques of Artificial Intelligence. AI\ntechniques have become an essential element in modern computer software and are thus essential for a\nsuccessful career and advanced studies in computer science. Topics covered in this course include\nsearch algorithms (such as breadth-first, depth-first, A*), game-playing algorithms (such as Minimax),\nconstraint satisfaction problems, knowledge and logic reasoning, planning methods, probabilistic\nreasoning.', '2023-11-03 09:40:18', NULL, NULL, NULL, 1),
(3, 'Design and Analysis of Algorithms', 'Design and Analysis of Algorithms is THE most important basic course in any graduate computer science and engineering curriculum. It is vital for every computer science student to be fluent with algorithms and their analysis. ALGORITHMS ARE FUN; ALGORITHM ANALYSIS is a NECESSARY TOOL; Students are encouraged to solve homework problems and discuss/solve problems in the class. Each student will be given one specific algorithm or problem to carry out an in-depth study. Typically, this course should be taken in the very first semester of your graduate study because algorithms are used in Networks, Operating Systems, Databases, and other (including advanced) courses.', '2023-11-03 09:40:36', NULL, NULL, NULL, 1),
(4, 'Software Testing and Maintenance', 'Software testing and maintenance play a critical role in ensuring the quality, and thus the success, of a software product. Software testing is the single most widely used approach to detecting software bugs, and often consumes more than 50% of the cost of software development. Software maintenance is key to provide continuity of service, and is mainly concerned with how to control and manage software changes and evolution after the major features are released.', '2023-11-03 09:41:46', NULL, NULL, NULL, 1),
(5, 'Secure Programming', 'This course is an introduction to methods of secure software design and development for upper-level undergraduate students and graduate students. Students will learn about the major security problems found in software today. Using this knowledge, they will work in teams to find these bugs in software, fix the bugs, and design software so that it has fewer security problems. Static analysis tools will be a core part of the class, but students will also be exposed to black box testing tools. Topics will include input validation, buffer overflow prevention, error handling, web application issues, and XML. Enrollment Requirements: Restricted to Graduate Computer Science and Engineering majors.', '2023-11-03 11:58:34', NULL, NULL, NULL, 1),
(6, 'Information Security', 'Hands-on introduction to the basics of security. Includes system security, buffer overflows, a high-level overview of cryptography, firewalls and IDS/IPS, malware, penetration testing, forensics, and system administration. Prerequisite: CSE 3320 or consent of instructor.', '2023-11-03 21:41:09', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `course_instructors`
--

CREATE TABLE `course_instructors` (
  `id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `instructor_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_instructors`
--

INSERT INTO `course_instructors` (`id`, `course_id`, `instructor_id`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 1, 2, '2023-10-30 15:43:51', NULL, NULL, NULL, 1),
(5, 5, 7, '2023-11-03 11:58:34', NULL, NULL, NULL, 1),
(6, 6, 10, '2023-11-03 21:41:09', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `course_objectives`
--

CREATE TABLE `course_objectives` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `course_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_objectives`
--

INSERT INTO `course_objectives` (`id`, `name`, `description`, `course_id`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 'Student Learning Outcomes', 'Students successfully completing this course will have gained a solid understanding of probabilistic data modeling, interpretation, and analysis and thus have formed an important basis solve practical statistics and data analysis related problems arising in broad computer science and engineering, and daily life.', 1, '2023-10-30 16:02:49', NULL, NULL, NULL, 1),
(2, 'Prerequisite', '\nAll students are expected to have a background in basic probability, Calculus, and Algebra before attending this course', 1, '2023-11-03 11:41:39', NULL, NULL, NULL, 1),
(4, 'Student Learning Outcomes', 'Students successfully completing this course will be able to apply a\nvariety of techniques for the design of efficient algorithms for complex problems.', 2, '2023-11-03 11:42:54', NULL, NULL, NULL, 1),
(9, 'Course Goal', 'The objective of this course is to build a solid foundation of the most important fundamental subject in computer science. Creative thinking is essential to algorithm design. Algorithm analysis and verification demands sound mathematical acumen and programming skills.', 5, '2023-11-03 11:48:20', NULL, NULL, NULL, 1),
(10, 'Course Aim', 'This course is designed to cover the fundamental concepts, principles, methods, and techniques for performing effective software testing and maintenance. Examples of the topics to be covered include the notion of test adequacy, graph-based coverage criteria, control flow-based testing, data flow-based testing, combinatorial testing, regression testing, configuration management and software refactoring.', 4, '2023-11-03 11:50:16', NULL, NULL, NULL, 1),
(11, 'Student Learning Outcomes', 'The student should understand the principles necessary to develop\nsecure software within the larger context of System Security Engineering. In addition, the student will\nhave the opportunity to apply their understanding of secure software development principles through the\nuse of static code analysis (both manual and automated) as well as implementation and exploitation of\nvulnerabilities that are the result of poor programming practices.', 5, '2023-11-03 11:51:49', NULL, NULL, NULL, 1),
(12, 'Prequisite', 'Course 5333 :Discrete Structures', 1, '2023-11-03 21:26:40', NULL, NULL, NULL, 1),
(13, 'Preprequisite', 'Course 5323: Information Security', 5, '2023-11-03 21:28:53', NULL, NULL, NULL, 1),
(14, 'Prerequisite', 'CSE 3320. OPERATING SYSTEMS.\n\nFunctions and components of an operating system, including process synchronization, job scheduling, memory management, file systems protection, and deadlocks. Related system software, such as loaders, linkers, assemblers, and windowing systems.', 6, '2023-11-03 21:42:11', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `course_id` bigint(20) NOT NULL,
  `exam_date` datetime DEFAULT NULL,
  `exam_type` bigint(20) DEFAULT NULL,
  `exam_format` bigint(20) DEFAULT NULL,
  `max_score` int(3) UNSIGNED DEFAULT NULL,
  `passing_score` int(3) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `name`, `course_id`, `exam_date`, `exam_type`, `exam_format`, `max_score`, `passing_score`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 'Exam 1', 1, '2023-10-30 00:00:00', 1, 1, 100, 70, '2023-10-31 02:31:33', NULL, NULL, NULL, 1),
(2, 'Exam 2', 1, '2023-11-30 00:00:00', 3, 3, 100, 70, '2023-10-31 02:31:33', NULL, NULL, NULL, 1),
(3, 'Quiz 1', 5, '2023-11-30 00:00:00', 2, 1, 100, 70, '2023-10-31 02:31:33', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `exam_objectives`
--

CREATE TABLE `exam_objectives` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `exam_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exam_objectives`
--

INSERT INTO `exam_objectives` (`id`, `name`, `description`, `exam_id`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 'Exam 1', 'The exam will be in MCQ format. More details will be shared by the instructor of the course.', 1, '2023-11-01 10:22:51', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL,
  `sender_id` bigint(20) DEFAULT NULL,
  `receiver_id` bigint(20) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `message_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `content`, `message_time`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 1, 2, 'Check hii maneno mdau', '2023-11-01 10:54:41', '2023-11-01 10:54:41', NULL, NULL, NULL, 1),
(2, 2, 1, 'Ndio nacheki!', '2023-11-03 03:10:35', '2023-11-03 03:10:35', NULL, NULL, NULL, 1),
(3, 1, 2, 'sample', '2023-11-03 03:19:09', '2023-11-03 03:19:09', NULL, NULL, NULL, 1),
(4, 1, 2, 'nimeweka bana', '2023-11-03 03:19:20', '2023-11-03 03:19:20', NULL, NULL, NULL, 1),
(5, 1, 2, 'cheki hii sasa', '2023-11-03 03:21:15', '2023-11-03 03:21:15', NULL, NULL, NULL, 1),
(6, 1, 2, 'na hii umeona', '2023-11-03 03:21:36', '2023-11-03 03:21:36', NULL, NULL, NULL, 1),
(7, 1, 2, 'sasa imedo?', '2023-11-03 03:22:05', '2023-11-03 03:22:05', NULL, NULL, NULL, 1),
(8, 1, 2, 'umeona?', '2023-11-03 03:22:37', '2023-11-03 03:22:37', NULL, NULL, NULL, 1),
(9, 1, 2, 'uko wapi?', '2023-11-03 03:22:58', '2023-11-03 03:22:58', NULL, NULL, NULL, 1),
(10, 1, 2, '???', '2023-11-03 03:23:13', '2023-11-03 03:23:13', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `qa_feedback`
--

CREATE TABLE `qa_feedback` (
  `id` bigint(20) NOT NULL,
  `exam_id` bigint(20) DEFAULT NULL,
  `course_objective_id` bigint(20) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qa_feedback`
--

INSERT INTO `qa_feedback` (`id`, `exam_id`, `course_objective_id`, `comment`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(3, 1, 1, 'The mode of exam needs to be improved to help students gain better knowledge to the course. ', '2023-11-01 12:00:40', NULL, 1, NULL, 1),
(4, 1, 11, 'The mode of exam needs to be improved to help students gain better knowledge to the course. ', '2023-11-03 10:59:20', NULL, 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ref_exam_formats`
--

CREATE TABLE `ref_exam_formats` (
  `id` bigint(20) NOT NULL,
  `format` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ref_exam_formats`
--

INSERT INTO `ref_exam_formats` (`id`, `format`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 'Multiple Choice', '2023-10-30 16:20:38', NULL, NULL, NULL, 1),
(2, 'Essay', '2023-10-30 16:20:38', NULL, NULL, NULL, 1),
(3, 'Practical', '2023-10-30 16:20:39', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ref_exam_types`
--

CREATE TABLE `ref_exam_types` (
  `id` bigint(20) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ref_exam_types`
--

INSERT INTO `ref_exam_types` (`id`, `type`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 'Mid-term Exams', '2023-10-30 16:18:40', NULL, NULL, NULL, 1),
(2, 'Quiz', '2023-10-30 16:18:40', NULL, NULL, NULL, 1),
(3, 'Final Exam', '2023-10-30 16:18:40', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(3, 'administrator'),
(2, 'coordinator'),
(5, 'instructor'),
(4, 'qa'),
(1, 'student');

-- --------------------------------------------------------

--
-- Table structure for table `student_enrolments`
--

CREATE TABLE `student_enrolments` (
  `id` bigint(20) NOT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `course_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_enrolments`
--

INSERT INTO `student_enrolments` (`id`, `student_id`, `course_id`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 6, 1, '2023-10-31 02:52:55', NULL, NULL, NULL, 1),
(2, 6, 5, '2023-10-31 02:52:55', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_performances`
--

CREATE TABLE `student_performances` (
  `id` bigint(20) NOT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `exam_id` bigint(20) DEFAULT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_performances`
--

INSERT INTO `student_performances` (`id`, `student_id`, `exam_id`, `score`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 1, 1, 90.00, '2023-11-01 09:51:19', NULL, NULL, NULL, 1),
(2, 6, 1, 90.00, '2023-11-01 09:51:19', NULL, NULL, NULL, 1),
(3, 6, 3, 70.00, '2023-11-01 09:51:19', NULL, NULL, NULL, 1),
(10, 6, 2, 90.00, '2023-11-01 09:51:19', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` bigint(20) NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `priority_level` enum('High','Medium','Low') DEFAULT NULL,
  `raised_by` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `priority_level`, `raised_by`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(2, 'Deactivate', 'User 1', 'Low', 10, '2023-11-04 09:40:36', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `mobile`, `identification_number`, `password`, `role_id`, `created_at`, `updated_at`, `created_by`, `updated_by`, `status`) VALUES
(1, 'Maina Mike', 'mikemdogo', '', '', 'Selina', '$2y$10$a.s70UfqJMzBbmMtbdH2CeSIRSlPD3alhszJgeOBC85Uymn/hYYCi', 1, '2023-10-30 13:31:13', NULL, NULL, NULL, 1),
(2, 'Wesley Delaney', 'delaney', '', '', '89089', '$2y$10$E6PVJRgomLVXwBskcm8oa.JXnMlf9/GtpPpZQ/Vpj902BtChP9VMu', 5, '2023-10-30 15:42:19', NULL, NULL, NULL, 1),
(3, 'Maina Kilos', 'mainakilos', '', '', '12341234', '$2y$10$/3ItkE1oO/xQlpDMA.V0Suc1MZ0MkUsScTcL8wYVcNCcZPMRV5RNi', 4, '2023-11-03 12:37:31', NULL, NULL, NULL, 1),
(4, 'Lupin', 'lupin', '', '', '789789789', '$2y$10$agjJ3xuwAKb770kvq.rmreQCIcuBZ8hJIcDZRT5XTTykKaVR0Bydm', 2, '2023-11-03 12:40:11', NULL, NULL, NULL, 1),
(6, 'Meghna J', 'mxj3631', 'mxj36@gmail.com', '', '1883854232', '$2y$10$2H2/0Iqi4JDBOGuSTjlIu.ztBtoHoEE71LcREVT5LOOHzk/NpcTia', 1, '2023-11-03 20:46:40', NULL, NULL, NULL, 1),
(7, 'Instructor A', 'instructorA', '', '', '9898789876', '$2y$10$P1.5JSOGSt91nSgolCUeYuiSgyhZVuyGhn9biHIel2WE2uXzVDktC', 5, '2023-11-03 21:15:24', NULL, NULL, NULL, 1),
(8, 'CoordinatorA', 'coordinatorA', '', '', '3457654345', '$2y$10$jzHZ3FGhCqBW.0PBCII64OhoDP1KzTWLb1fmFQ4gEFAoT8zU08aPi', 2, '2023-11-03 21:24:35', NULL, NULL, NULL, 1),
(9, 'Quality Assurance', 'qa1', '', '', '67654358765', '$2y$10$N6es7pWITLAQKaLN3czaGeSCmGmEpC6c77hTiC9aKJFdHoC/AmqUm', 4, '2023-11-03 21:34:01', NULL, NULL, NULL, 1),
(10, 'Admin', 'admin1', '', '', '4567654345', '$2y$10$MbUgLJKMSTwLDp7FxzO0K.bq3zyWhxx1Q0ZBkZtzCqRQ06tSo6oaW', 3, '2023-11-03 21:39:06', NULL, NULL, NULL, 1),
(19, 'Apeksha', 'gdgdfg', 'lonesomhelme@gmail.com', '0000000000', '33343434', '$2y$10$dE8aTyInrPyIoVdudzdSSuzo/IVxvUyII4jv7fC7eJnorNQop3V2y', 3, '2023-11-04 13:00:29', NULL, NULL, NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `course_instructors`
--
ALTER TABLE `course_instructors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course_id` (`course_id`,`instructor_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `course_objectives`
--
ALTER TABLE `course_objectives`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course_id` (`course_id`,`name`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course_id` (`course_id`,`name`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`),
  ADD KEY `exam_type` (`exam_type`),
  ADD KEY `exam_format` (`exam_format`);

--
-- Indexes for table `exam_objectives`
--
ALTER TABLE `exam_objectives`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `exam_id` (`exam_id`,`name`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `qa_feedback`
--
ALTER TABLE `qa_feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`),
  ADD KEY `exam_id` (`exam_id`),
  ADD KEY `course_objective_id` (`course_objective_id`);

--
-- Indexes for table `ref_exam_formats`
--
ALTER TABLE `ref_exam_formats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `ref_exam_types`
--
ALTER TABLE `ref_exam_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `student_enrolments`
--
ALTER TABLE `student_enrolments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`,`course_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `student_performances`
--
ALTER TABLE `student_performances`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`,`exam_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`),
  ADD KEY `exam_id` (`exam_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`),
  ADD KEY `raised_by` (`raised_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `identification_number` (`identification_number`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`),
  ADD KEY `users_roles_id_fk` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `course_instructors`
--
ALTER TABLE `course_instructors`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `course_objectives`
--
ALTER TABLE `course_objectives`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `exam_objectives`
--
ALTER TABLE `exam_objectives`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `qa_feedback`
--
ALTER TABLE `qa_feedback`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ref_exam_formats`
--
ALTER TABLE `ref_exam_formats`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ref_exam_types`
--
ALTER TABLE `ref_exam_types`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `student_enrolments`
--
ALTER TABLE `student_enrolments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `student_performances`
--
ALTER TABLE `student_performances`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `course_instructors`
--
ALTER TABLE `course_instructors`
  ADD CONSTRAINT `course_instructors_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `course_instructors_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `course_instructors_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `course_instructors_ibfk_4` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `course_objectives`
--
ALTER TABLE `course_objectives`
  ADD CONSTRAINT `course_objectives_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `course_objectives_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `course_objectives_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `exams_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `exams_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `exams_ibfk_4` FOREIGN KEY (`exam_type`) REFERENCES `ref_exam_types` (`id`),
  ADD CONSTRAINT `exams_ibfk_5` FOREIGN KEY (`exam_format`) REFERENCES `ref_exam_formats` (`id`);

--
-- Constraints for table `exam_objectives`
--
ALTER TABLE `exam_objectives`
  ADD CONSTRAINT `exam_objectives_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `exam_objectives_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `exam_objectives_ibfk_3` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_4` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `qa_feedback`
--
ALTER TABLE `qa_feedback`
  ADD CONSTRAINT `qa_feedback_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `qa_feedback_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `qa_feedback_ibfk_3` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `qa_feedback_ibfk_4` FOREIGN KEY (`course_objective_id`) REFERENCES `course_objectives` (`id`);

--
-- Constraints for table `ref_exam_formats`
--
ALTER TABLE `ref_exam_formats`
  ADD CONSTRAINT `ref_exam_formats_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ref_exam_formats_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `ref_exam_types`
--
ALTER TABLE `ref_exam_types`
  ADD CONSTRAINT `ref_exam_types_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ref_exam_types_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `student_enrolments`
--
ALTER TABLE `student_enrolments`
  ADD CONSTRAINT `student_enrolments_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `student_enrolments_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `student_enrolments_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `student_enrolments_ibfk_4` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `student_performances`
--
ALTER TABLE `student_performances`
  ADD CONSTRAINT `student_performances_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `student_performances_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `student_performances_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `student_performances_ibfk_4` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`raised_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
