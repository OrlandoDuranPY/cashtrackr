import type { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import TextInput from '@/Components/TextInput';
import SubmitButton from '@/Components/SubmitButton';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        post('/auth/login', {
            onFinish: () => reset('password'),
        });
    }

    return (
        <AuthLayout title="Iniciar sesión" intro="Vuelve a tus presupuestos justo donde los dejaste.">
            <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Email de Registro"
                    tabIndex={1}
                    value={data.email}
                    error={errors.email}
                    onChange={(event) => setData('email', event.target.value)}
                />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password de Registro"
                    tabIndex={2}
                    value={data.password}
                    error={errors.password}
                    onChange={(event) => setData('password', event.target.value)}
                    labelExtra={
                        <Link href="#" className="border-b-2 border-ink text-sm font-bold hover:bg-lemon" tabIndex={3}>
                            ¿Olvidaste tu contraseña?
                        </Link>
                    }
                />

                <label className="flex w-fit cursor-pointer items-center gap-3 font-bold">
                    <input
                        type="checkbox"
                        name="remember"
                        checked={data.remember}
                        onChange={(event) => setData('remember', event.target.checked)}
                        className="size-5 appearance-none border-4 border-ink bg-paper checked:bg-violet"
                    />
                    Mantener sesión iniciada
                </label>

                <SubmitButton disabled={processing}>Iniciar sesión</SubmitButton>
            </form>

            <p className="mt-8 border-t-4 border-ink pt-5 font-medium">
                ¿Aún no tienes cuenta?{' '}
                <Link href="/auth/register" className="border-b-4 border-ink font-bold hover:bg-lemon">
                    Crea una en un minuto
                </Link>
            </p>
        </AuthLayout>
    );
}
