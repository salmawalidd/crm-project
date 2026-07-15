<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        $superAdmin = User::updateOrCreate(
            [
                'email' => 'admin@crm.com',
            ],
            [
                'name' => 'Super Admin',
                'password' => 'Admin@123',
            ]
        );

        $superAdmin->syncRoles(['super-admin']);
    }
}
