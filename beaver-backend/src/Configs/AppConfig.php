<?php

namespace Beaver\Beaver\Configs;

class AppConfig
{
    public static $app_name = 'Beaver';
    public static $app_url = '';
    public static $app_logo = '';
    public static $app_description = '';
    public static $app_author = 'Beaver';
    public static $app_author_url = 'http://localhost/beaver';

    public static $app_secret_key = 'bfe8c1013699190a66290ad53e213194f18e6fccec0dcd8ac285ff0cc5a03178';

    public static function allowOrigin(){
        // Enable CORS for all domains. You can specify allowed origins instead of '*'.
        header('Access-Control-Allow-Origin: *');
        // Allow specific HTTP methods (e.g., GET, POST, PUT, DELETE).
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        // Allow specific HTTP headers.
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
        // Allow credentials (cookies and HTTP authentication).
        header('Access-Control-Allow-Credentials: true');
        // Set the maximum age for preflight requests (in seconds).
        header('Access-Control-Max-Age: 86400');
        // check if the request method is POST

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            // Respond with a 200 status for preflight requests.
            header('HTTP/1.1 200 OK');
            exit();
        }
    }
}