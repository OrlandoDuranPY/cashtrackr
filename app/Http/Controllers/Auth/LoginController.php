<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Traits\ApiResponse;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class LoginController extends Controller
{
    use ApiResponse;

    /**
     * Show the login form.
     */
    public function index(): View
    {
        return view('auth.login');
    }

    /**
     * Authenticate the user and start the session.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            $credentials = [
                'email' => $validated['email'],
                'password' => $validated['password'],
            ];

            if (! Auth::attempt($credentials, (bool) ($validated['remember'] ?? false))) {
                Log::warning('Failed login attempt.', [
                    'email' => $validated['email'],
                    'ip' => $request->ip(),
                ]);

                DB::rollBack();

                return $this->errorResponse(
                    'Las credenciales proporcionadas son incorrectas.',
                    ['email' => ['Las credenciales proporcionadas son incorrectas.']],
                    Response::HTTP_UNAUTHORIZED,
                );
            }

            $request->session()->regenerate();

            $user = Auth::user();

            DB::commit();

            return $this->successResponse(
                'Sesión iniciada correctamente.',
                ['id' => $user->id, 'name' => $user->name, 'email' => $user->email],
            );
        } catch (Throwable $e) {
            DB::rollBack();

            Log::error('Login failed.', [
                'email' => $request->input('email'),
                'exception' => $e,
            ]);

            return $this->errorResponse(
                'Ocurrió un error al procesar tu solicitud.',
                exception: $e,
            );
        }
    }

    /**
     * Log the user out and invalidate the session.
     */
    public function destroy(Request $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            DB::commit();

            return $this->successResponse('Sesión cerrada correctamente.');
        } catch (Throwable $e) {
            DB::rollBack();

            Log::error('Logout failed.', ['exception' => $e]);

            return $this->errorResponse(
                'Ocurrió un error al procesar tu solicitud.',
                exception: $e,
            );
        }
    }
}
