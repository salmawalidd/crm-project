<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'CRM API is running',
    ]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/users', [UserController::class, 'index'])
        ->middleware('permission:view users');

    Route::get('/users/{user}', [UserController::class, 'show'])
        ->middleware('permission:view users');

    Route::post('/users', [UserController::class, 'store'])
        ->middleware('permission:create users');

    Route::patch('/users/{user}', [UserController::class, 'update'])
        ->middleware('permission:edit users');

    Route::patch('/users/{user}/role', [UserController::class, 'updateRole'])
        ->middleware('permission:assign roles');

    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->middleware('permission:delete users');

    Route::get('/sales-area', function () {
        return response()->json([
            'message' => 'You can access the sales area.',
        ]);
    })->middleware('role:sales|team-lead|super-admin');

    Route::get('/team-lead-area', function () {
        return response()->json([
            'message' => 'You can access the team lead area.',
        ]);
    })->middleware('role:team-lead|super-admin');

    Route::get('/admin-area', function () {
        return response()->json([
            'message' => 'You can access the super admin area.',
        ]);
    })->middleware('role:super-admin');

    Route::get('/customers/create-check', function () {
        return response()->json([
            'message' => 'You have permission to create customers.',
        ]);
    })->middleware('permission:create customers');
});
