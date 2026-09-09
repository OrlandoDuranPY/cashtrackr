import type { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
}

export interface SharedProps {
    auth: {
        user: User | null;
    };
    flash: {
        success?: string;
        error?: string;
    };
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, SharedProps {}
}
