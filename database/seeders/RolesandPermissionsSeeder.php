<?php

namespace Database\Seeders;


use App\Models\Role;
use Illuminate\Database\Seeder;


class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        Role::create(['name' => Role::MASTER_ACCESS]);
        Role::create(['name' => Role::UK_ACCESS]);
        Role::create(['name' => Role::MOLDOVA_ACCESS]);
    }
}