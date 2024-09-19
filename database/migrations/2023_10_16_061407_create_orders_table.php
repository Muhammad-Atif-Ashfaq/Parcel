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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('service');
            $table->unsignedBigInteger('recipient_id');
            $table->string('order_destination');
            $table->decimal('weight')->default('0.00');
            $table->decimal('rate');
            $table->decimal('price');
            $table->string('promo_code')->nullable();
            $table->longText('description')->nullable();
            $table->longText('extra_notes')->nullable();
            $table->boolean('needs_refrigeration')->default(false);
            $table->string('status')->default('In Progress');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
