<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArchiveOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'service' => $this->service,
            'order_destination'  => $this->order_destination,
            'sender_name' => $this->recipient->sender_name,
            'sender_email' => $this->recipient->sender_email,
            'sender_phone' => $this->recipient->sender_phone,
            'sender_address' => $this->recipient->sender_address,
            'sender_collection_point' => $this->recipient->sender_collection_point->name ?? null,
            'sender_collection_points_id' => $this->recipient->sender_collection_points_id,
            'receiver_name' => $this->recipient->receiver_name,
            'receiver_email' => $this->recipient->receiver_email,
            'receiver_phone' => $this->recipient->receiver_phone,
            'receiver_address' => $this->recipient->receiver_address,
            'receiver_collection_point' => $this->recipient->reciever_collection_point->name ?? null,
            'receiver_collection_points_id' => $this->recipient->receiver_collection_points_id,
            'rate' => $this->rate,
            'weight' => $this->weight,
            'price'  => $this->price,
            'needs_refrigeration' => $this->needs_refrigeration,
            'extra_notes' => $this->extra_notes,
            'promo_code'  => $this->promo_code,
            'status'  => $this->status,
            'created_at' => $this->created_at,
            'promo_code_price' => $this->promo_price,
            'promo_code_type' => $this->promo_type,
        ];
    }
}
