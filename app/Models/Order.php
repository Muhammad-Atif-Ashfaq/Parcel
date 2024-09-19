<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'service', 'recipient_id', 'weight','rate', 'promo_code', 'description',
        'needs_refrigeration', 'price', 'order_destination', 'status', 'extra_notes'
    ];

    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('Y-m-d'); // Example: Format date as 'Y-m-d'
    }

    public function getNeedsRefrigerationAttribute($value)
    {
        return $value === 1 ? "true":"false";
    }

    protected $with = ['recipient', 'collection_point'];


    public function recipient()
    {
        return $this->belongsTo(Recipient::class,'recipient_id','id');
    }

    public function collection_point()
    {
        return $this->belongsTo(CollectionPoint::class,'collection_points_id','id');
    }


}
