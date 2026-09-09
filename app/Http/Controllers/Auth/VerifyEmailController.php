<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class VerifyEmailController extends Controller
{
    /**
     * Show the email verification notice.
     */
    public function index(Request $request): RedirectResponse|Response
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->route('home');
        }

        return Inertia::render('Auth/VerifyEmail', [
            'email' => $request->user()->email,
        ]);
    }

    /**
     * Send another verification email to the current user.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->route('home');
        }

        try {
            $request->user()->sendEmailVerificationNotification();

            return back()->with('success', 'Te enviamos un nuevo enlace de confirmación.');
        } catch (Throwable $e) {
            Log::error('Verification email could not be sent.', [
                'user_id' => $request->user()->getKey(),
                'exception' => $e,
            ]);

            return back()->with('error', 'No pudimos enviar el correo. Inténtalo de nuevo en unos minutos.');
        }
    }

    /**
     * Confirm the signed verification link, with or without an active session.
     */
    public function update(Request $request, string $id, string $hash): RedirectResponse
    {
        $user = User::find($id);

        if (! $user || ! hash_equals($hash, sha1($user->getEmailForVerification()))) {
            return redirect()
                ->route('login')
                ->with('error', 'El enlace de confirmación no es válido.');
        }

        if ($user->hasVerifiedEmail()) {
            return redirect()
                ->route($request->user() ? 'home' : 'login')
                ->with('success', 'Tu cuenta ya estaba confirmada.');
        }

        $user->markEmailAsVerified();

        event(new Verified($user));

        return redirect()
            ->route($request->user() ? 'home' : 'login')
            ->with('success', 'Tu cuenta quedó confirmada. Ya puedes iniciar sesión.');
    }
}
