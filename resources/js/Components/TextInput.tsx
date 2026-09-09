import type { InputHTMLAttributes, ReactNode } from 'react';
import InputError from '@/Components/InputError';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    error?: string;
    labelExtra?: ReactNode;
};

export default function TextInput({ id, label, error, labelExtra, ...props }: TextInputProps) {
    return (
        <div className="space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <label className="font-display text-sm uppercase tracking-widest" htmlFor={id}>
                    {label}
                </label>
                {labelExtra}
            </div>

            <input
                id={id}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`w-full border-4 bg-paper px-4 py-3 text-lg font-medium placeholder:text-ink/45 focus:bg-lemon/35 ${
                    error ? 'border-tomato' : 'border-ink'
                }`}
                {...props}
            />

            <div id={`${id}-error`}>
                <InputError message={error} />
            </div>
        </div>
    );
}
