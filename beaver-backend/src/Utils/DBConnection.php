<?php

namespace Beaver\Beaver\Utils;

use Beaver\Beaver\Configs\DBConfig;

class DBConnection
{
    public static function getConnection()
    {
        $host = DBConfig::$host;
        $port = DBConfig::$port;
        $database = DBConfig::$database;
        $user = DBConfig::$user;
        $password = DBConfig::$password;

        try {
            $connection = new \PDO("mysql:host=$host;port=$port;dbname=$database", $user, $password);
            $connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            return $connection;
        }catch (\PDOException $e) {
            die("Error: " . $e->getMessage());
        }
    }
}