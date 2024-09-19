<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Helpers\ExceptionHandlerHelper;
use Illuminate\Support\Facades\Redirect;
use App\Models\Order;
use App\Models\Recipient;
use App\Models\CollectionPoint;
use App\Http\Resources\VeloceOrderCollection;

class VeloceLinkController extends Controller
{
    public function index(Request $request)
    {
        $orders = VeloceOrderCollection::collection(Order::where('service', '!=', 'CTC')
                                                    ->leftJoin('promo_codes', 'orders.promo_code', '=', 'promo_codes.code')
                                                    ->select('orders.*', 'promo_codes.type as promo_type', 'promo_codes.price as promo_price')
                                                    ->get());
        $collectionPoint = CollectionPoint::all();
        return Inertia::render('Admin/VeloceLink/Orders',[
            'orders' => $orders,
            'collectionPoint' => $collectionPoint
        ]);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        $recipent = Recipient::find($order->recipient_id);
        $update = $recipent->update([
                'sender_collection_points_id'  =>  $request->senderCollectionPoint ?? $recipent->senderCollectionPoint,
                'receiver_collection_points_id'=>  $request->receiverCollectionPoint ?? $recipent->receiverCollectionPoint
        ]);
        return Redirect::back();
    }
}
