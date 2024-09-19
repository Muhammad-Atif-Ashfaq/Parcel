<?php


namespace App\Helpers;


class Helper
{
    public static function sendSeverError($error)
    {
        return abort(500, $error);
    }
}
