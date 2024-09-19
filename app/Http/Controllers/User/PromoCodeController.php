<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Helpers\ExceptionHandlerHelper;
use Illuminate\Http\Request;
use App\Models\PromoCode;
use App\Models\PromoCodeUse;
use Carbon\Carbon;

class PromoCodeController extends Controller
{
    public function promo_code(Request $request, $promo_code, $weight)
    {
        // return ExceptionHandlerHelper::tryCatch(function () use ($request,$promo_code, $price){
            $promoCode = PromoCode::where('code', $promo_code)->first();

            if ($promoCode) {
//                if ($promoCode->used_at) {
//                    return $this->sendError('This promo code has already been used', [], 401);
//                }
//                else {
//                    if($promoCode->type == 'price' && $weight >= 20)
//                    {
//                        $update = $promoCode->update([
//                            'used_at'  =>  Carbon::now()
//                        ]);
//                        if($update)
//                        {
//                            $use = PromoCodeUse::create([
//                                'promo_code_id' => $promoCode->id
//                            ]);
//                        }
//                    }
//                    elseif($promoCode->type == 'without_price')
//                    {
//                        $update = $promoCode->update([
//                            'used_at'  =>  Carbon::now()
//                        ]);
//                        if($update)
//                        {
//                            $use = PromoCodeUse::create([
//                                'promo_code_id' => $promoCode->id
//                            ]);
//                        }
//                    }else
//                    {
//                        return $this->sendError( 'Something went wrong', [], 401);
//                    }

                    return $this->sendResponse(['price' => $promoCode->price, 'type' => $promoCode->type, 'weight' => $promoCode->weight], 'Promo code is applied');
//                }
            } else {
                return $this->sendError( 'This promo code is not available', [], 401);
            }
        // });
    }
}
