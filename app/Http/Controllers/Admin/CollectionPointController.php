<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CollectionPointRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CollectionPoint;
use App\Helpers\ExceptionHandlerHelper;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class CollectionPointController extends Controller
{
   
    public function index()
    {
        $collectionPoint = CollectionPoint::with('users')->get();
        return Inertia::render('Admin/CollectionPoints/CollectionPoints', [
            'collectionPoint' =>  $collectionPoint,
        ]);
    }

    
    public function create()
    {
        //
    }

    public function store(CollectionPointRequest $request)
    {
        // return ExceptionHandlerHelper::tryCatch(function () use($request){
            $role = ($request->location == 'uk') ? Role::UK_ACCESS : Role::MOLDOVA_ACCESS;
            $user = User::create([
                'name'  => $request->name,
                'email' => $request->email,
                'password' => Hash::make('password'),
                'show_password' => $request->password,
                'email_verified_at' => Carbon::now()
            ]);
            $user->assignRole($role);
            if($user)
            {
                $promo_code = CollectionPoint::create([
                    'user_id'   => $user->id,
                    'name'      => $request->name,
                    'address'   => $request->address ?? null,
                    'longitude' => $request->longitude,
                    'latitude'  => $request->latitude,
                    'sides'     => $request->location
                ]);
                return Redirect::route('admin.collection_points.index');
            }
        // });
    }

   
    public function show(string $id)
    {
        //
    }

   
    public function edit(string $id)
    {
        //
    }

    
    public function update(Request $request, string $id)
    {
        $collectionPoint = CollectionPoint::findOrFail($id);
        $update = $collectionPoint->update([
            'name'  =>  $request->name ?? $collectionPoint->name,
            'address'  => $request->address ?? $collectionPoint->address,
            'latitude' => $request->latitude ?? $collectionPoint->latitude,
            'longitude' => $request->longitude ?? $collectionPoint->longitude,
            'sides'    =>  $request->sides ?? $collectionPoint->sides,
            'last_collection_day' => $request->last_collection_day,
            'last_collection_time' => $request->last_collection_time
        ]);
        if($request->has('email') || $request->has('password'))
        {
            $user = User::findOrFail($collectionPoint->user_id);
            $update_user = $user->update([
                'email'  =>   $request->email ?? $user->email,
                'password'  => Hash::make($request->password) ?? $user->password,
                'show_password'  => $request->password ?? $user->password
            ]);
        }
        return Redirect::route('admin.collection_points.index');
    }

   
    public function destroy(string $id)
    {
        return ExceptionHandlerHelper::tryCatch(function ()use ($id) {
            $collectionPoint = CollectionPoint::findOrFail($id);
           $response = $collectionPoint->delete();
           if($response)
           {
            return Redirect::route('admin.collection_points.index');
           }
       });
    }
}
