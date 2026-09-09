import type { ReactNode } from 'react';
import BaseLayout from '@/Layouts/BaseLayout';
import FlashMessage from '@/Components/FlashMessage';

type AuthLayoutProps = {
    title: string;
    intro?: string;
    children: ReactNode;
};

export default function AuthLayout({ title, intro, children }: AuthLayoutProps) {
    return (
        <BaseLayout title={title}>
            <main className="mx-auto w-full max-w-xl px-5 py-12 sm:py-16">
                <div className="rise-0 border-4 border-ink bg-paper p-6 shadow-block-lg sm:p-10">
                    <h1 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">{title}</h1>
                    {intro && <p className="mt-3 text-lg font-medium text-ink/75">{intro}</p>}

                    <div className="mt-6 empty:mt-0">
                        <FlashMessage />
                    </div>

                    {children}
                </div>
            </main>
        </BaseLayout>
    );
}
