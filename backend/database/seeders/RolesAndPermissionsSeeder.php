<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [

            // Customers
            'view customers',
            'create customers',
            'edit customers',
            'delete customers',

            // Leads
            'view leads',
            'create leads',
            'edit leads',
            'delete leads',

            // Users
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Roles
            'manage roles',
            'assign roles',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        $superAdmin = Role::firstOrCreate([
            'name' => 'super-admin',
            'guard_name' => 'web',
        ]);

        $teamLead = Role::firstOrCreate([
            'name' => 'team-lead',
            'guard_name' => 'web',
        ]);

        $sales = Role::firstOrCreate([
            'name' => 'sales',
            'guard_name' => 'web',
        ]);

        // Super Admin gets everything
        $superAdmin->syncPermissions(Permission::all());

        // Team Lead permissions
        $teamLead->syncPermissions([
            'view customers',
            'create customers',
            'edit customers',
            'delete customers',

            'view leads',
            'create leads',
            'edit leads',
            'delete leads',

            'view users',
        ]);

        // Sales permissions
        $sales->syncPermissions([
            'view customers',
            'create customers',
            'edit customers',

            'view leads',
            'create leads',
            'edit leads',
        ]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
