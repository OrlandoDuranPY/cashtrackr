import BaseLayout from "@/Layouts/BaseLayout";

export default function Home({ email }: { email: string }) {
    return (
        <BaseLayout title="Dashboard">
            <span>{email}</span>
        </BaseLayout>
    );
}
