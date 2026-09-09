import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const isSuccess = Boolean(flash.success);
    const message = flash.success ?? flash.error;

    if (!message) {
        return null;
    }

    return (
        <p
            role="status"
            className={`flex items-center gap-3 border-4 border-ink px-4 py-3 font-bold shadow-block-sm ${
                isSuccess ? 'bg-mint text-ink' : 'bg-tomato text-paper'
            }`}
        >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0 stroke-current" fill="none" strokeWidth="3" strokeLinecap="square">
                {isSuccess ? <path d="m4 12 5 5L20 6" /> : <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>}
            </svg>
            {message}
        </p>
    );
}
