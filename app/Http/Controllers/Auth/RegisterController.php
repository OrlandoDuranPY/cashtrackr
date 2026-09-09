<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class RegisterController extends Controller
{
    use ApiResponse;

    /**
     * Show the registration form.
     */
    public function index(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Show the post-registration confirmation notice.
     */
    public function confirm(Request $request): RedirectResponse|Response
    {
        $email = $request->session()->get('registered_email');

        if (! $email) {
            return redirect()->route('register');
        }

        return Inertia::render('Auth/RegisterSuccess', [
            'email' => $email,
        ]);
    }

    /**
     * Register a new user.
     */
    public function store(RegisterRequest $request): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            $user = User::create([
                ...$validated,
                'password' => Hash::make($validated['password']),
            ]);

            DB::commit();

            $user->sendEmailVerificationNotification();

            Auth::login($user);

            return redirect()
                ->route('register.confirm')
                ->with('registered_email', $user->email);
        } catch (Throwable $e) {
            DB::rollBack();

            Log::error('User registration failed.', [
                'email' => $request->input('email'),
                'exception' => $e,
            ]);

            return back()
                ->withInput($request->except('password', 'password_confirmation'))
                ->with('error', 'Ocurrió un error al procesar tu solicitud.');
        }
    }
}
