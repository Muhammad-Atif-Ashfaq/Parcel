<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionPoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'longitude',
        'latitude',
        'sides',
        'user_id',
        'last_collection_day',
        'last_collection_time'
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function recipient()
    {
        return $this->hasMany(Recipient::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

}
