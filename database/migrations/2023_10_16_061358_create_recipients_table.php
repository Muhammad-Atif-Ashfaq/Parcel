<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipients', function (Blueprint $table) {
            $table->id();
            $table->string('sender_name');
            $table->string('sender_email')->nullable();
            $table->string('sender_phone');
            $table->string('sender_address')->nullable();
            $table->unsignedBigInteger('sender_collection_points_id')->nullable();
            $table->string('receiver_name');
            $table->string('receiver_email')->nullable();
            $table->string('receiver_phone');
            $table->string('receiver_address')->nullable();
            $table->unsignedBigInteger('receiver_collection_points_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipients');
    }
};
