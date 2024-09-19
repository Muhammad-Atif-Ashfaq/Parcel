<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

class ImageController extends Controller
{
    public function show($imagePath)
    {
        $imagePath = 'images/' . $imagePath; // Modify the path as needed

        // Check if the image exists
        if (Storage::disk('public')->exists($imagePath)) {
            // Serve the image with the appropriate content type
            return Response::file(storage_path('app/public/' . $imagePath), ['Content-Type' => 'image/jpeg']);
        }

        // Return a 404 response if the image doesn't exist
        return response()->json(['message' => 'Image not found'], 404);
    }
}
