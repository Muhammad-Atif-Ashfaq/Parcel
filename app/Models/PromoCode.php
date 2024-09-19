<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'price',
        'used_at',
        'type',
        'weight'
    ];

    public function promoCodeUse()
    {
        return $this->hasMany(PromoCodeUse::class);
    }

}
