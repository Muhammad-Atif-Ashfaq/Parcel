<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\ResponseTrait;

class OrderRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'sender_name'    => 'required',
            'sender_email'   => 'nullable|email',
            'sender_phone'   => 'required',
            'receiver_name'  => 'required',
            'receiver_email' => 'nullable|email',
            'receiver_phone' => 'required',
            'service'     => 'required',
            'receiver_collection_points_id' => 'nullable',
            'sender_collection_points_id' => 'nullable',
            'sender_address'  => 'required',
            'receiver_address'  => 'required',
            'weight'         => 'nullable',
            'price'          => 'nullable',
            'needs_refrigeration'   => 'nullable',
        ];
    }
}
