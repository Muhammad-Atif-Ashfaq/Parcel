<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $services = ['CTC', 'CTD', 'DTC', 'DTD'];
        foreach($services as $ser)
        {
            $service = Service::create([
                'name' => $ser
            ]);
        }
    }
}