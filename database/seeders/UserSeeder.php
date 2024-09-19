<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name'  => Role::MASTER_ACCESS,
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'show_password' => 'password'
        ]);
        $user->assignRole(Role::MASTER_ACCESS);

        $user = User::create([
            'name'  => Role::UK_ACCESS,
            'email' => 'ukadmin@admin.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'show_password' => 'password'
        ]);
        $user->assignRole(Role::UK_ACCESS);

        $user = User::create([
            'name'  => Role::MOLDOVA_ACCESS,
            'email' => 'moldovaadmin@admin.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'show_password' => 'password'
        ]);
        $user->assignRole(Role::MOLDOVA_ACCESS);
    }
}