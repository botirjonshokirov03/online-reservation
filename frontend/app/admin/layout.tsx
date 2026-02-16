'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, checkAuth } = useAdminStore();

    useEffect(() => {
        checkAuth();
        if (!isAuthenticated) {
            router.push('/admin/login');
        }
    }, [isAuthenticated, checkAuth, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
            <AdminSidebar />
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
