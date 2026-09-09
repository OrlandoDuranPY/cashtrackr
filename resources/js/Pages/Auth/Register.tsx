import type { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import TextInput from '@/Components/TextInput';
import SubmitButton from '@/Components/SubmitButton';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        post('/auth/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }

    return (
        <AuthLayout title="Crear cuenta" intro="Empieza con el presupuesto de este mes. Toma menos de un minuto.">
            <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    label="Nombre"
                    placeholder="Tu Nombre"
                    value={data.name}
                    error={errors.name}
                    onChange={(event) => setData('name', event.target.value)}
                />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Email de Registro"
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
                    value={data.password}
                    error={errors.password}
                    onChange={(event) => setData('password', event.target.value)}
                />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    label="Repetir Password"
                    placeholder="Repite tu password"
                    value={data.password_confirmation}
                    error={errors.password_confirmation}
                    onChange={(event) => setData('password_confirmation', event.target.value)}
                />

                <SubmitButton disabled={processing}>Registrarme</SubmitButton>
            </form>

            <p className="mt-8 border-t-4 border-ink pt-5 font-medium">
                ¿Ya tienes cuenta?{' '}
                <Link href="/auth/login" className="border-b-4 border-ink font-bold hover:bg-lemon">
                    Inicia sesión
                </Link>
            </p>
        </AuthLayout>
    );
}
