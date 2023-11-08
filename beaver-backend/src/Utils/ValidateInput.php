<?php

namespace Beaver\Beaver\Utils;

class ValidateInput
{
    public static function cleanInput($input)
    {
        $input = trim($input);
        $input = stripslashes($input);
        return htmlspecialchars($input);
    }
}