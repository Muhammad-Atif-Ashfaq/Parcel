<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCodeUse extends Model
{
    use HasFactory;
    protected $fillable = [
        'promo_code_id',
    ];

    public function promoCode()
    {
        return $this->belongsTo(PromoCode::class,'promo_code_id','id');
    }



}
