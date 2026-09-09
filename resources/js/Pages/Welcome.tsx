import { Link, usePage } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';

type LedgerRow = {
    label: string;
    spent: number;
    budget: number;
    tone: string;
};

const ledger: LedgerRow[] = [
    { label: 'Renta', spent: 620, budget: 800, tone: 'bg-mint' },
    { label: 'Comida', spent: 340, budget: 400, tone: 'bg-lemon' },
    { label: 'Transporte', spent: 210, budget: 150, tone: 'bg-tomato' },
];

const steps = [
    {
        title: 'Define el presupuesto',
        body: 'Un monto, un nombre, listo. Nada de hojas de cálculo con quince pestañas.',
    },
    {
        title: 'Anota cada gasto',
        body: 'Registra en segundos y mira cuánto queda antes de gastar de más.',
    },
    {
        title: 'Cierra el mes sin sustos',
        body: 'Ves en qué se fue el dinero y qué presupuesto se salió de control.',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <BaseLayout title="Bienvenido">
            <main>
                <section className="border-b-4 border-ink bg-paper">
                    <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
                        <div>
                            <h1 className="rise-0 font-display text-5xl uppercase leading-[0.88] tracking-[-0.04em] sm:text-7xl">
                                Controla tu
                                <span className="mt-2 block w-fit border-4 border-ink bg-lemon px-3 shadow-block">dinero. Ya.</span>
                            </h1>

                            <p className="rise-1 mt-7 max-w-[60ch] text-lg font-medium text-ink/80 sm:text-xl">
                                CashTracker es un cuaderno de presupuestos honesto: pones un límite, anotas los gastos
                                y sabes exactamente cuánto te queda.
                            </p>

                            <div className="rise-2 mt-9 flex flex-wrap items-center gap-4">
                                <Link
                                    href={auth.user ? '/' : '/auth/register'}
                                    className="press border-4 border-ink bg-violet px-7 py-4 font-display text-lg uppercase tracking-tight text-paper shadow-block hover:bg-ink"
                                >
                                    {auth.user ? 'Ir a mis presupuestos' : 'Crear cuenta gratis'}
                                </Link>

                                {!auth.user && (
                                    <Link
                                        href="/auth/login"
                                        className="border-b-4 border-ink px-1 py-2 font-display text-lg uppercase tracking-tight hover:bg-lemon"
                                    >
                                        Ya tengo cuenta
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="rise-3 border-4 border-ink bg-paper p-5 shadow-block-lg sm:p-7 lg:rotate-[1.5deg]">
                            <div className="flex items-baseline justify-between border-b-4 border-ink pb-3">
                                <h2 className="font-display text-lg uppercase tracking-tight">Marzo</h2>
                                <span className="font-display text-lg tabular-nums">$1,350 / $1,350</span>
                            </div>

                            <ul className="mt-5 space-y-5">
                                {ledger.map(({ label, spent, budget, tone }) => (
                                    <li key={label}>
                                        <div className="flex items-baseline justify-between font-bold">
                                            <span>{label}</span>
                                            <span className="tabular-nums">
                                                ${spent} <span className="text-ink/55">/ ${budget}</span>
                                            </span>
                                        </div>
                                        <div className="mt-2 h-5 border-4 border-ink bg-paper">
                                            <div
                                                className={`h-full ${tone}`}
                                                style={{ width: `${Math.min((spent / budget) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-6 border-4 border-ink bg-tomato px-3 py-2 font-bold text-paper">
                                Transporte se pasó por $60.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-violet">
                    <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
                        <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-tight text-paper sm:text-5xl">
                            Tres pasos. Sin curva de aprendizaje.
                        </h2>

                        <ol className="mt-10 grid gap-6 lg:grid-cols-3">
                            {steps.map(({ title, body }, index) => (
                                <li key={title} className="border-4 border-ink bg-paper p-6 shadow-block">
                                    <span className="grid size-11 place-items-center border-4 border-ink bg-lemon font-display text-xl">
                                        {index + 1}
                                    </span>
                                    <h3 className="mt-4 font-display text-xl uppercase tracking-tight">{title}</h3>
                                    <p className="mt-2 font-medium text-ink/80">{body}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {!auth.user && (
                    <section className="border-t-4 border-ink bg-lemon">
                        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-16 text-center">
                            <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
                                Empieza con el presupuesto de este mes.
                            </h2>
                            <Link
                                href="/auth/register"
                                className="press border-4 border-ink bg-ink px-7 py-4 font-display text-lg uppercase tracking-tight text-paper shadow-block hover:bg-violet"
                            >
                                Crear cuenta gratis
                            </Link>
                        </div>
                    </section>
                )}
            </main>
        </BaseLayout>
    );
}
