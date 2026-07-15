<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UpdateUserRoleRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::with('roles')
            ->latest()
            ->get()
            ->map(function (User $user) {
                return $this->userData($user);
            });

        return response()->json([
            'message' => 'Users retrieved successfully.',
            'data' => [
                'users' => $users,
            ],
        ]);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        $user->assignRole($validated['role']);

        return response()->json([
            'message' => 'User created successfully.',
            'data' => [
                'user' => $this->userData($user),
            ],
        ], 201);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json([
            'message' => 'User retrieved successfully.',
            'data' => [
                'user' => $this->userData($user),
            ],
        ]);
    }

    public function update(
        UpdateUserRequest $request,
        User $user
    ): JsonResponse {
        $validated = $request->validated();

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'] ?? $user->password,
        ]);

        return response()->json([
            'message' => 'User updated successfully.',
            'data' => [
                'user' => $this->userData($user->fresh()),
            ],
        ]);
    }

    public function updateRole(
        UpdateUserRoleRequest $request,
        User $user
    ): JsonResponse {
        $validated = $request->validated();

        $user->syncRoles([$validated['role']]);

        return response()->json([
            'message' => 'User role updated successfully.',
            'data' => [
                'user' => $this->userData($user),
            ],
        ]);
    }
public function destroy(User $user): JsonResponse
{
    $user->delete();

    return response()->json([
        'message' => 'User deleted successfully.',
    ]);
}
    private function userData(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames()->values(),
            'permissions' => $user->getAllPermissions()
                ->pluck('name')
                ->values(),
            'created_at' => $user->created_at,
        ];
    }
}
