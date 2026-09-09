<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Welcome'))->name('home');

// ─────────────────────────────────────────────────────────────────
//  Register
// ─────────────────────────────────────────────────────────────────
Route::get('/auth/register', [RegisterController::class, 'index'])->name('register');
Route::post('/auth/register', [RegisterController::class, 'store'])->name('register.store');
Route::get('/auth/register/confirmacion', [RegisterController::class, 'confirm'])->name('register.confirm');

// ─────────────────────────────────────────────────────────────────
//  Login
// ─────────────────────────────────────────────────────────────────
Route::get('/auth/login', [LoginController::class, 'index'])->name('login');
Route::post('/auth/login', [LoginController::class, 'store'])->middleware('throttle:5,1')->name('login.store');
Route::post('/auth/logout', [LoginController::class, 'destroy'])->middleware('auth')->name('logout');

// ─────────────────────────────────────────────────────────────────
//  Verify Email
// ─────────────────────────────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/email/verify', [VerifyEmailController::class, 'index'])->name('verification.notice');
    Route::post('/email/verify', [VerifyEmailController::class, 'store'])->middleware('throttle:6,1')->name('verification.send');
});

Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, 'update'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');


Route::middleware(['auth', 'verified'])->group(function () {
    // ─────────────────────────────────────────────────────────────────
    //  Dashboard
    // ─────────────────────────────────────────────────────────────────
    Route::get('/dashboard', fn() => Inertia::render('Dashboard/Home'))
        ->name('dashboard');
});
