<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\CollectionPoint;
use App\Helpers\ExceptionHandlerHelper;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Resources\OrderResource;
use App\Http\Resources\DropOffOrderResource;
use App\Http\Resources\ShippedOrderResource;
use App\Http\Resources\ArchiveOrderResource;
use App\Mail\StatusMail;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $order->update([
            'weight' => $request->weight ?? $order->weight,
            'status' => $request->status ?? $order->status,
            'service' => $request->service ?? $order->service,
            'extra_notes' => $request->notes ?? $order->extra_notes,
            'price'  => $request->price
        ]);
        if($request->has('status'))
        {
            if($request->status == 'Awaiting Collection')
            {
                if(!empty($order->recipient->sender_email)){
                    Mail::to($order->recipient->sender_email)->send(new StatusMail($order));
                }
                if(!empty($order->recipient->receiver_email)){
                    Mail::to($order->recipient->receiver_email)->send(new StatusMail($order));
                }
            }
        }
        return Redirect::back();
    }

    public function updateAll(Request $request)
    {
        foreach ($request->input('orders',[]) as $orderId){
            $order = Order::findOrFail($orderId);

            $order->update([
                'status' =>  $request->status,
            ]);
            if($request->status == 'Awaiting Collection')
            {
                if(!empty($order->recipient->sender_email)){
                    Mail::to($order->recipient->sender_email)->send(new StatusMail($order));
                }
                if(!empty($order->recipient->receiver_email)){
                    Mail::to($order->recipient->receiver_email)->send(new StatusMail($order));
                }
            }
        }
        return Redirect::back();
    }

    public function index()
    {
        $orders = OrderResource::collection(Order::where('status', '!=', 'Complete')
                                            ->leftJoin('promo_codes', 'orders.promo_code', '=', 'promo_codes.code')
                                            ->select('orders.*', 'promo_codes.type as promo_type', 'promo_codes.price as promo_price')
                                            ->get());
        $collectionPoint = CollectionPoint::all();
        return Inertia::render('Admin/Orders/Orders',[
            'orders' => $orders,
            'collectionPoint' => $collectionPoint
        ]);
    }

    public function ship_orders()
    {

        $collectionPoint = CollectionPoint::where('user_id', auth()->user()->id)->first();
        $orders = ShippedOrderResource::collection(Order::whereIn('status', ['In Progress', 'Received'])->whereHas('recipient', function ($q) use ($collectionPoint) {
            $q->where('sender_collection_points_id', $collectionPoint->id);
        })->leftJoin('promo_codes', 'orders.promo_code', '=', 'promo_codes.code')
        ->select('orders.*', 'promo_codes.type as promo_type', 'promo_codes.price as promo_price')
        ->get());
        $collectionPoint = CollectionPoint::all();
        return Inertia::render('Admin/shippedOrders/Orders',[
            'orders' => $orders,
            'collectionPoint' => $collectionPoint
        ]);
    }

    public function dropoff_orders()
    {
        $collectionPoint = CollectionPoint::where('user_id', auth()->user()->id)->first();
        $orders = ShippedOrderResource::collection(Order::whereIn('status', ['In Transit', 'Awaiting Collection', 'Complete'])->whereHas('recipient', function ($q) use ($collectionPoint) {
            $q->where('receiver_collection_points_id', $collectionPoint->id);
        })->leftJoin('promo_codes', 'orders.promo_code', '=', 'promo_codes.code')
        ->select('orders.*', 'promo_codes.type as promo_type', 'promo_codes.price as promo_price')
        ->get());
        $collectionPoint = CollectionPoint::all();
        return Inertia::render('Admin/dropOffOrders/Orders',[
            'orders' => $orders,
            'collectionPoint' => $collectionPoint
        ]);
    }

    public function archive()
    {
        $orders = ArchiveOrderResource::collection(Order::where('status', 'Complete')
                                                ->leftJoin('promo_codes', 'orders.promo_code', '=', 'promo_codes.code')
                                                ->select('orders.*', 'promo_codes.type as promo_type', 'promo_codes.price as promo_price')
                                                ->get());
        $collectionPoint = CollectionPoint::all();
        return Inertia::render('Admin/Archive/Orders',[
            'orders' => $orders,
            'collectionPoint' => $collectionPoint
        ]);
    }

    public function destroy(string $id)
    {
        return ExceptionHandlerHelper::tryCatch(function ()use ($id) {
            $order = Order::findOrFail($id);
           $response = $order->delete();
           if($response)
           {
            return Redirect::back();
           }
       });
    }


}
