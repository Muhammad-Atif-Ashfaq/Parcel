<?php

namespace App\Enums;


final class SidesEunm
{

    const UK_SIDE = 'uk';
    const MOLDOVA_SIDE = 'moldova';

    const UK_SIDE_TEXT = 'UK';
    const MOLDOVA_SIDE_TEXT = 'Republic of Moldova';


    public static function getSides()
    {
        return [
            self::UK_SIDE,
            self::MOLDOVA_SIDE,
        ];
    }

    public static function getSidesText()
    {
        return [
            self::UK_SIDE_TEXT,
            self::MOLDOVA_SIDE_TEXT,
        ];
    }

    public static function getAllStatuses()
    {
        return [
            self::UK_SIDE => self::UK_SIDE_TEXT,
            self::MOLDOVA_SIDE => self::MOLDOVA_SIDE_TEXT,
        ];
    }
}
