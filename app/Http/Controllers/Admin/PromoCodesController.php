<?php

namespace App\Http\Controllers\Admin;

use App\Services\GenerateRandomService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\PromoCodeRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\PromoCode;
use App\Helpers\ExceptionHandlerHelper;
use Auth;
use Illuminate\Validation\Rule;

class PromoCodesController extends Controller
{

    public function index()
    {

        $promo_code = PromoCode::with('promoCodeUse')->get()->toArray();
        return Inertia::render('Admin/PromoCodes/PromoCodes', [
            'promoCode' =>  $promo_code,
        ]);
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => [
                'required',
                Rule::unique('promo_codes'),
            ],
        ]);
        // return ExceptionHandlerHelper::tryCatch(function () use($request){
            // $code = GenerateRandomService::RandomSixString();
            $promo_code = PromoCode::create([
                'code'  =>  $request->code,
                'price' => $request->price ?? null,
                'used_at' => $request->used_at ?? null,
                'type'  => $request->type ?? 'without_price',
                'weight'=> $request->weight ?? null
            ]);

            return Redirect::route('admin.promo_codes.index');
        // });
    }

    public function show(string $id)
    {
        //
    }


    public function edit(string $id)
    {

    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'code' => [
                'required',
                Rule::unique('promo_codes')->ignore($id),
            ],
        ]);
        // return ExceptionHandlerHelper::tryCatch(function ()use ($id) {
            $promoCode = PromoCode::findOrFail($id);
            $promoCode->update([
                'price' => $request->price ?? $promoCode->price,
                'code'  => $request->code  ?? $promo_code->code
            ]);
            return Redirect::route('admin.promo_codes.index');
    //    });
    }

    public function destroy(string $id)
    {
        return ExceptionHandlerHelper::tryCatch(function ()use ($id) {
            $promoCode = PromoCode::findOrFail($id);
           $response = $promoCode->delete();
           if($response)
           {
            return Redirect::route('admin.promo_codes.index');
           }
       });
    }
}
