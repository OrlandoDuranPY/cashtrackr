import type { ReactNode } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

type BaseLayoutProps = {
    title: string;
    children: ReactNode;
};

export default function BaseLayout({ title, children }: BaseLayoutProps) {
    const { auth } = usePage().props;

    return (
        <div className="flex min-h-dvh flex-col">
            <Head title={title} />

            <header className="border-b-4 border-ink bg-lemon">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-4 sm:flex-row sm:justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <span aria-hidden="true" className="grid size-10 place-items-center border-4 border-ink bg-violet shadow-block-sm">
                            <svg viewBox="0 0 24 24" className="size-5 stroke-paper" fill="none" strokeWidth="3" strokeLinecap="square">
                                <path d="M4 20V10" />
                                <path d="M11 20V4" />
                                <path d="M18 20v-7" />
                            </svg>
                        </span>
                        <span className="font-display text-xl uppercase tracking-tight sm:text-2xl">CashTracker</span>
                    </Link>

                    <nav className="flex flex-wrap items-center justify-center gap-3">
                        {auth.user ? (
                            <>
                                <span className="hidden font-bold sm:inline">Hola, {auth.user.name}</span>
                                <Link
                                    href="/auth/logout"
                                    method="post"
                                    as="button"
                                    className="press border-4 border-ink bg-paper px-4 py-2 font-display text-sm uppercase tracking-wide shadow-block-sm hover:bg-tomato hover:text-paper"
                                >
                                    Cerrar sesión
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="border-b-4 border-transparent px-2 py-2 font-display text-sm uppercase tracking-wide hover:border-ink"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="press border-4 border-ink bg-violet px-4 py-2 font-display text-sm uppercase tracking-wide text-paper shadow-block-sm hover:bg-ink"
                                >
                                    Crear cuenta
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <div className="flex-1">{children}</div>

            <footer className="border-t-4 border-ink bg-ink px-5 py-6 text-center font-bold text-paper">
                CashTracker — presupuestos sin sorpresas.
            </footer>
        </div>
    );
}
