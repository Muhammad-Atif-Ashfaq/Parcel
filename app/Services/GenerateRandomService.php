<?php

namespace App\Services;


use App\Models\PromoCode;
use Illuminate\Support\Str;

class GenerateRandomService extends Service
{
    public static function RandomSixString()
    {
        do {
            $code = Str::random(6);
        } while (PromoCode::where("code", "=", $code)->first());

        return $code;
    }

    public static function RandomSixNumber()
    {
        do {
            $code = mt_rand(100000, 999999);
        } while (VerificationCode::where("otp", "=", $code)->first());

        return $code;
    }
}


