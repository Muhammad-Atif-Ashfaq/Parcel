<?php
use App\Models\PromoCode;
use App\Models\CollectionPoint;
use App\Models\Order;
use App\Http\Resources\OrderResource;
use App\Http\Resources\DropOffOrderResource;
use App\Http\Resources\ShippedOrderResource;
use Carbon\Carbon;

function adminCount()
{
    $promoCodeCount = PromoCode::count();
    $collectionPointCount = CollectionPoint::count();
    $orderCount = Order::where('status','!=', 'Complete')->count();
    $orderArchive = Order::where('status', 'Complete')->count();

    $count = [
        'promoCode_count' => $promoCodeCount,
        'collectionPoint_count' => $collectionPointCount,
        'order_count' => $orderCount,
        'order_archive' => $orderArchive,
    ];

    return $count;
}

function collectionPoint_count()
{
    if(auth()->user()->id == 1)
    {
        $count = [
            'shippedOrders_count' => 0,
            'dropOffOrders_count' => 0
        ];
    }else
    {
        $collectionPoint = CollectionPoint::where('user_id', auth()->user()->id)->first();
        $shippedOrders = ShippedOrderResource::collection(Order::whereIn('status', ['In Progress', 'Received'])->whereHas('recipient', function ($q) use ($collectionPoint) {
            $q->where('sender_collection_points_id', $collectionPoint->id);
        })
        ->latest('updated_at')
        ->get());
        $lastCollectionDate =  $collectionPoint->last_collection_day . $collectionPoint->last_collection_time;
        // if ($latestShippedOrder) {
        //     $latestshippedUpdatedAt = Carbon::parse($latestShippedOrder->updated_at)->toDateString();
        //     // Now $latestUpdatedDate contains only the date portion (e.g., '2023-10-30')
        // } else {
        //     // Handle the case where there are no shipped orders in the collection
        //     $latestshippedUpdatedAt = null; // or any default value
        // }
        $shippedOrders_count = count($shippedOrders);
        $dropOffOrders = ShippedOrderResource::collection(Order::whereIn('status', ['In Transit', 'Awaiting Collection', 'Complete'])->whereHas('recipient', function ($q) use ($collectionPoint) {
            $q->where('receiver_collection_points_id', $collectionPoint->id);
        })
        // ->latest('updated_at')
        ->get());
        // $latestdropOffUpdatedAt = $latestShippedOrder->updated_at;
        $dropOffOrders_count = count($dropOffOrders);
        $count = [
            'shippedOrders_count' => $shippedOrders_count,
            'lastCollectionDate' => $lastCollectionDate,
            'dropOffOrders_count' => $dropOffOrders_count,
            // 'latestdropOffUpdatedAt' => $latestdropOffUpdatedAt
        ];
    }
    return $count;
}

?>
