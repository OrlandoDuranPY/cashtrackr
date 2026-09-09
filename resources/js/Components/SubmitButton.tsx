import type { ReactNode } from 'react';

type SubmitButtonProps = {
    children: ReactNode;
    disabled?: boolean;
};

export default function SubmitButton({ children, disabled }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className="press w-full border-4 border-ink bg-violet px-6 py-4 font-display text-xl uppercase tracking-tight text-paper shadow-block hover:bg-lemon hover:text-ink disabled:cursor-not-allowed disabled:bg-ink/40 disabled:text-paper disabled:shadow-block-sm sm:text-2xl"
        >
            {disabled ? 'Enviando…' : children}
        </button>
    );
}
