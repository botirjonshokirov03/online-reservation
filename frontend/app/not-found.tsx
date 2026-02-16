import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-max w-full text-center">
                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 error</p>
                    <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/"
                            className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Go back home<span aria-hidden="true"> &rarr;</span>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
