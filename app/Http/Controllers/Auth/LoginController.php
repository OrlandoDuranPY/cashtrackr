<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Traits\ApiResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class LoginController extends Controller
{
    use ApiResponse;

    /**
     * Show the login form.
     */
    public function index(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Authenticate the user and start the session.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            $credentials = [
                'email' => $validated['email'],
                'password' => $validated['password'],
            ];

            if (! Auth::attempt($credentials, (bool) ($validated['remember'] ?? false))) {
                DB::rollBack();

                Log::warning('Failed login attempt.', [
                    'email' => $validated['email'],
                    'ip' => $request->ip(),
                ]);

                return back()
                    ->withInput($request->except('password'))
                    ->withErrors(['email' => 'Las credenciales proporcionadas son incorrectas.']);
            }

            $request->session()->regenerate();

            DB::commit();

            return redirect()
                ->intended(route('home'))
                ->with('success', 'Sesión iniciada correctamente.');
        } catch (Throwable $e) {
            DB::rollBack();

            Log::error('Login failed.', [
                'email' => $request->input('email'),
                'exception' => $e,
            ]);

            return back()
                ->withInput($request->except('password'))
                ->with('error', 'Ocurrió un error al procesar tu solicitud.');
        }
    }

    /**
     * Log the user out and invalidate the session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        DB::beginTransaction();

        try {
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            DB::commit();

            return redirect()
                ->route('home')
                ->with('success', 'Sesión cerrada correctamente.');
        } catch (Throwable $e) {
            DB::rollBack();

            Log::error('Logout failed.', ['exception' => $e]);

            return back()->with('error', 'Ocurrió un error al procesar tu solicitud.');
        }
    }
}
