<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    public function run(): void
    {
        # Poblamos la tabla users con los usuarios que son admin
        $admins = [
            [
                'user_name' => 'Pablo',
                'email' => 'pablo@pixela.com',
                'password' => Hash::make('admin123'),
                'is_admin' => true,
            ],
            [
                'user_name' => 'Ruyi',
                'email' => 'ruyi@pixela.com',
                'password' => Hash::make('admin123'),
                'is_admin' => true,
            ]
        ];

        foreach ($admins as $admin) {
            User::create($admin);
        }
    }
} 