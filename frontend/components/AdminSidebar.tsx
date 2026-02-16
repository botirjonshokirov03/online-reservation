'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiMapPin, FiCalendar, FiUsers, FiLogOut } from 'react-icons/fi';
import { useAdminStore } from '@/store/adminStore';

const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { admin, logout } = useAdminStore();

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: FiHome },
        { name: 'Venues', path: '/admin/venues', icon: FiMapPin },
        { name: 'Ceremonies', path: '/admin/ceremonies', icon: FiCalendar },
        { name: 'Users', path: '/admin/users', icon: FiUsers },
    ];

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    return (
        <div className="w-64 min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="p-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <h1 className="text-2xl font-bold text-gradient">Tisky Admin</h1>
                <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                    {admin?.name}
                </p>
            </div>

            <nav className="flex-1 p-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${isActive ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white' : ''
                                }`}
                            style={
                                !isActive
                                    ? { color: 'var(--color-text-secondary)' }
                                    : {}
                            }
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full transition-all hover:bg-red-50"
                    style={{ color: 'var(--color-error)' }}
                >
                    <FiLogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
