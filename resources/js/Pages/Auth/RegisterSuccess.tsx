import { Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function RegisterSuccess({ email }: { email: string }) {
    return (
        <AuthLayout title="Confirma tu cuenta" intro="Tu cuenta fue creada. Solo falta confirmarla.">
            <p className="mt-6 border-4 border-ink bg-mint px-4 py-3 font-bold break-words shadow-block-sm">
                Enviamos el enlace a {email}
            </p>

            <p className="mt-6 max-w-[65ch] font-medium text-ink/80">
                Abre el correo y pulsa <span className="font-bold">Confirmar cuenta</span>. El enlace vence en 60
                minutos. Si no llega, revisa la carpeta de spam.
            </p>

            <Link
                href="/auth/login"
                className="press mt-8 block w-full border-4 border-ink bg-violet px-6 py-4 text-center font-display text-xl uppercase tracking-tight text-paper shadow-block hover:bg-lemon hover:text-ink sm:text-2xl"
            >
                Ir a iniciar sesión
            </Link>
        </AuthLayout>
    );
}
