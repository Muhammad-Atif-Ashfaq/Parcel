<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\OrderRequest;
use App\Mail\ContactUsMail;

use App\Models\CollectionPoint;
use App\Models\Contact;
use App\Models\Order;
use App\Models\PromoCode;
use App\Models\PromoCodeUse;
use App\Models\Recipient;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfermationMail;

class OrderController extends Controller
{

    public function index(Request $request, $service, $to): Response
    {
        return Inertia::render('Web/CreateOrder/CreateOrder', [
            'service' => $service,
            'to' => $to
        ]);
    }

    public function store(OrderRequest $request): RedirectResponse
    {

//         return ExceptionHandlerHelper::tryCatch(function() use ($request){
        $order_recipient = Recipient::create([
            'sender_name' => $request->sender_name,
            'sender_email' => $request->sender_email,
            'sender_phone' => $request->sender_phone,
            'sender_address' => $request->sender_address ?? null,
            'sender_collection_points_id' => $request->sender_collection_points_id,
            'receiver_name' => $request->receiver_name,
            'receiver_email' => $request->receiver_email,
            'receiver_phone' => $request->receiver_phone,
            'receiver_address' => $request->receiver_address ?? null,
            'receiver_collection_points_id' => $request->receiver_collection_points_id,

        ]);
        if ($order_recipient) {
            $order = Order::create([
                'recipient_id' => $order_recipient->id,
                'service' => $request->service,
                'order_destination' => $request->order_destination,
                'weight' => $request->weight ?? '0.00',
                'rate' => $request->rate,
                'price' => $request->price ?? '0.00',
                'promo_code' => $request->promo_code ?? null,
                'description' => $request->description ?? null,
                'needs_refrigeration' => $request->needs_refrigeration ?? false
            ]);
            if ($order) {
                if (!empty($request->promo_code)) {
                    $promo_code = PromoCode::where('code', $request->promo_code)->first();
                        if ($promo_code->update([
                            'used_at' => Carbon::now()
                        ])) {
                            $use = PromoCodeUse::create([
                                'promo_code_id' => $promo_code->id
                            ]);
                        }
                    }
                try {
                    if(!empty($request->sender_email)){
                        Mail::to($request->sender_email)->send(new OrderConfermationMail($order));
                    }
                    if(!empty($request->receiver_email)){
                        Mail::to($request->receiver_email)->send(new OrderConfermationMail($order));
                    }

                } catch (\Throwable $th) {
                    $order_recipient->delete();
                    $order->delete();
                    $use->delete();


                    return back()->with([
                        'email_error' => 'their is error in email configration',
                    ]);
                }
            }
            return Redirect::route('order.success', $order->id);
        }
//         });
    }

    public function success(Request $request, $id)
    {
        $desiredLength = 6;
        $idLength = strlen($id);
        if ($idLength < $desiredLength) {
            $padding = str_repeat('0', $desiredLength - $idLength);
            $formattedId = $padding . $id;
        } else {
            $formattedId = $id; // ID is already at least 6 characters long
        }
        $CollectionPoints = CollectionPoint::all();
        $order = Order::find($id);
        if(empty($order)){
            return Redirect::route('home');
        }
        return Inertia::render('Web/OrderConferm/OrderConferm', [
            'id' => $formattedId,
            'CollectionPoints' => $CollectionPoints,
            'order' => $order
        ]);
    }

    public function track($id)
    {

        $orderDetail = Order::find($id);

        if ($orderDetail) {
            return $this->sendResponse(['orderDetail' => $orderDetail], 'Order Detail');
        } else {
            return $this->sendError('Wrong Order', [], 404);
        }
    }

    public function contact(Request $request)
    {
        // return ExceptionHandlerHelper::tryCatch(function() use ($request){
        $contact = Contact::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message
        ]);
        if ($contact) {
            Mail::to($request->email)->send(new ContactUsMail($contact));
        }
        return Redirect::route('home');
        // });
    }


}
