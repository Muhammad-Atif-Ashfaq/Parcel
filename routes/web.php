<?php

use App\Http\Controllers\ProfileController;
use App\Models\CollectionPoint;
use App\Models\Order;
use App\Models\Contact;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/view-template', function (Request $request) {
    $order = Order::find(24);
   return view('parcel_collection', compact('order'));

});

Route::get('/', function (Request $request) {
    $email_error = session('email_error');
    $CollectionPoints = CollectionPoint::limit(30)->get();
    return Inertia::render('Web/Home/Home', [
        'CollectionPoints'=>$CollectionPoints,
        'email_error' => $email_error
    ]);
})->name('home');

Route::get('/send-parcel', function () {
    return Inertia::render('Web/SendParcel/SendParcel', []);
})->name('send-parcel');


Route::get('/track-parcel', function () {
    return Inertia::render('Web/TrackParcel/TrackParcel', []);
})->name('track-parcel');

Route::get('/collection-points', function () {
    $ukCollectionPoint = CollectionPoint::where('sides', 'uk')->get();
    $moldovaCollectionPoint = CollectionPoint::where('sides', 'moldova')->get();
    return Inertia::render('Web/CollectionPoint/CollectionPoint', [
        'ukCollectionPoint' => $ukCollectionPoint,
        'moldovaCollectionPoint' => $moldovaCollectionPoint,
    ]);
})->name('collection-points');

Route::get('/admin/dashboard', function () {
    $count = adminCount();
    $CollectionPoints = collectionPoint_count();
    return Inertia::render('Admin/Dashboard/Dashboard', [
        'count' => $count,
        'CollectionPoints' => $CollectionPoints
    ]);
})->middleware(['auth', 'verified'])->name('admin.dashboard');

Route::get('/admin/contact', function () {
    $contactUs = Contact::all();
    return Inertia::render('Admin/ContactUs/ContactUs', [
        'contactUs' => $contactUs
    ]);
})->middleware(['auth', 'verified'])->name('admin.contact');


Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/orders', [\App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders');
    Route::post('/orders/updateAll', [\App\Http\Controllers\Admin\OrderController::class, 'updateAll'])->name('orders.updateAll');
    Route::get('/ship_orders', [\App\Http\Controllers\Admin\OrderController::class, 'ship_orders'])->name('ship_orders');
    Route::get('/dropoff_orders', [\App\Http\Controllers\Admin\OrderController::class, 'dropoff_orders'])->name('dropoff_orders');
    Route::get('/archive', [\App\Http\Controllers\Admin\OrderController::class, 'archive'])->name('archive');
    Route::post('/order/{id}', [\App\Http\Controllers\Admin\OrderController::class, 'update'])->name('order.update');
    Route::delete('/order/{id}', [\App\Http\Controllers\Admin\OrderController::class, 'destroy'])->name('order.destroy');
    Route::resource('collection_points', \App\Http\Controllers\Admin\CollectionPointController::class);
    Route::resource('promo_codes', \App\Http\Controllers\Admin\PromoCodesController::class);

    Route::get('/veloce_link', [\App\Http\Controllers\Admin\VeloceLinkController::class, 'index'])->name('veloce_link');
    Route::post('/update/veloce_link/{id}', [\App\Http\Controllers\Admin\VeloceLinkController::class, 'update'])->name('veloce_link.update');

});

Route::get('/order/{service}/{to}', [\App\Http\Controllers\OrderController::class, 'index'])->name('order.index');
Route::post('/order', [\App\Http\Controllers\OrderController::class, 'store'])->name('order.store');
Route::get('/order-success/{id}', [\App\Http\Controllers\OrderController::class, 'success'])->name('order.success');
Route::post('/order-track/{id}', [\App\Http\Controllers\OrderController::class, 'track'])->name('order.track');
Route::post('/contact-us', [\App\Http\Controllers\OrderController::class, 'contact'])->name('contact');

Route::post('/check_promoCode/{promo_code}/{weight}', [\App\Http\Controllers\User\PromoCodeController::class, 'promo_code'])->name('check.promo_code');

Route::get('/places/search/{value}', [\App\Http\Controllers\PlacesController::class, 'search'])->name('place.search');
Route::get('/getNearCollection/{latitude}/{longitude}/{destinations}/{side}', [\App\Http\Controllers\PlacesController::class, 'getNearCollection'])->name('getNearCollection');
Route::get('/getNearCollections/{latitude}/{longitude}', [\App\Http\Controllers\PlacesController::class, 'getNearCollections'])->name('getNearCollections');
//Route::get('/images/{imagePath}', 'ImageController@show')
//    ->where('imagePath', '.*');

require __DIR__ . '/auth.php';
