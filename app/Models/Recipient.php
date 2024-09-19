<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_name','sender_address', 'sender_email', 'sender_phone', 'sender_collection_points_id', 'receiver_name', 'receiver_email',
        'receiver_phone','receiver_address', 'receiver_collection_points_id'
    ];

    protected $with = ['sender_collection_point', 'reciever_collection_point'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function sender_collection_point()
    {
        return $this->belongsTo(CollectionPoint::class,'sender_collection_points_id','id');
    }

    public function reciever_collection_point()
    {
        return $this->belongsTo(CollectionPoint::class,'receiver_collection_points_id','id');
    }
}
