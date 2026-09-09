export default function InputError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <p role="alert" className="flex items-start gap-2 border-4 border-ink bg-tomato px-3 py-2 font-bold text-paper">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-5 shrink-0 stroke-current" fill="none" strokeWidth="2.5" strokeLinecap="square">
                <path d="M12 7v6" />
                <path d="M12 17h.01" />
                <path d="M3 21 12 3l9 18H3Z" strokeLinejoin="miter" />
            </svg>
            {message}
        </p>
    );
}
