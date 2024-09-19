<?php

namespace App\Http\Controllers;

use App\Models\CollectionPoint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class PlacesController extends Controller
{
    public function search($value)
    {

        $apiKey = 'AIzaSyCnQJgCNCPgLiVoow1bXx1h7NI3qQ73Gb0'; // Replace with your actual API key
        $endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=$value&key=$apiKey";

        try {
            $response = Http::get($endpoint);
            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred'], 500);
        }
    }

    public function getNearCollection($latitude, $longitude,$destinations, $side)
    {
        try {
            $city = '';
            if($destinations == "UK-to-Moldova"){
                if($side == 'left'){
                    $city = "uk";
                }elseif($side == 'right'){
                    $city = "moldova";
                }
            }elseif($destinations == "Moldova-to-UK"){
                if($side == 'left'){
                    $city = "moldova";
                }elseif($side == 'right'){
                    $city = "uk";
                }
            }

            $nearestCollectionPoint = CollectionPoint::select(DB::raw("*, ( 3959 * acos( cos( radians('$latitude') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians('$longitude') ) + sin( radians('$latitude') ) * sin( radians( latitude ) ) ) ) AS distance"))
                ->where('sides', $city)
                // ->having("distance", "<", 2)
                ->orderBy('distance')
                ->limit(4)
                ->get();


            return response()->json($nearestCollectionPoint);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred'], 500);
        }

    }


    public function getNearCollections($latitude, $longitude)
    {
        try {
            $nearestCollectionPoint = CollectionPoint::select(DB::raw("*, ( 3959 * acos( cos( radians('$latitude') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians('$longitude') ) + sin( radians('$latitude') ) * sin( radians( latitude ) ) ) ) AS distance"))
                // ->having("distance", "<", 2)
                ->orderBy('distance')
                ->limit(4)
                ->get();


            return response()->json($nearestCollectionPoint);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred'], 500);
        }

    }

}
