<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class RegisterController extends Controller
{
    use ApiResponse;

    /**
     * Show the registration form.
     */
    public function index(): View
    {
        return view('auth.register');
    }

    /**
     * Register a new user.
     */
    public function store(RegisterRequest $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            $user = User::create([
                ...$validated,
                'password' => Hash::make($validated['password']),
            ]);

            DB::commit();

            return $this->successResponse(
                'Usuario registrado correctamente.',
                ['id' => $user->id, 'name' => $user->name, 'email' => $user->email],
                Response::HTTP_CREATED,
            );
        } catch (Throwable $e) {
            DB::rollBack();

            Log::error('User registration failed.', [
                'email' => $request->input('email'),
                'exception' => $e,
            ]);

            return $this->errorResponse(
                'Ocurrió un error al procesar tu solicitud.',
                exception: $e,
            );
        }
    }
}
