<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\ResponseTrait;

class PromoCodeRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'code'      => 'required|unique:promo_codes,code',
            'price'     => 'required|numeric'

        ];
    }
}
