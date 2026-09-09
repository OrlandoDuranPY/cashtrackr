import type { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import SubmitButton from '@/Components/SubmitButton';

export default function VerifyEmail({ email }: { email: string }) {
    const { post, processing } = useForm({});

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        post('/email/verify');
    }

    return (
        <AuthLayout title="Confirma tu correo" intro="Te enviamos un enlace para activar tu cuenta.">
            <p className="mt-6 border-4 border-ink bg-lemon px-4 py-3 font-bold break-words shadow-block-sm">{email}</p>

            <p className="mt-6 max-w-[65ch] font-medium text-ink/80">
                Abre el correo y pulsa <span className="font-bold">Confirmar cuenta</span>. El enlace vence en 60
                minutos. Si no aparece, revisa la carpeta de spam.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
                <SubmitButton disabled={processing}>Reenviar enlace</SubmitButton>
            </form>

            <p className="mt-8 border-t-4 border-ink pt-5 font-medium">
                ¿Correo equivocado?{' '}
                <Link
                    href="/auth/logout"
                    method="post"
                    as="button"
                    className="border-b-4 border-ink font-bold hover:bg-lemon"
                >
                    Cierra sesión y regístrate de nuevo
                </Link>
            </p>
        </AuthLayout>
    );
}
