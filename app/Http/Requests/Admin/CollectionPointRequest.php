<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\ResponseTrait;

class CollectionPointRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'name'=> 'required',
            // 'longitude'     => 'required' ,
            // 'latitude'     => 'required',
            // 'location'     => 'required',
            'email'        => 'required',
            'password'     => 'required'
        ];
    }
}
