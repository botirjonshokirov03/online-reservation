'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiUsers, FiShield, FiClock, FiStar } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Ceremony {
  _id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

export default function Home() {
  const [upcomingCeremonies, setUpcomingCeremonies] = useState<Ceremony[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingCeremonies();
  }, []);

  const fetchUpcomingCeremonies = async () => {
    try {
      const response = await api.get('/ceremonies/upcoming');
      setUpcomingCeremonies(response.data);
    } catch (error) {
      console.error('Error fetching ceremonies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-banner.png"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Experience the <span className="text-gradient">Magic</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Book tickets to the most amazing ceremonies and events
          </p>
          <Link href="/app" className="btn-primary text-lg px-8 py-4 inline-block">
            Explore Events
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Why Choose Tisky?
          </h2>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Your trusted partner for unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl card-hover" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--primary)', opacity: 0.1 }}>
              <FiShield className="w-8 h-8" style={{ color: 'var(--primary)' }} />
            </div>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Secure Booking
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Your transactions are protected with industry-leading security measures
            </p>
          </div>

          <div className="p-8 rounded-2xl card-hover" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--secondary)', opacity: 0.1 }}>
              <FiClock className="w-8 h-8" style={{ color: 'var(--secondary)' }} />
            </div>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Instant Confirmation
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Get your tickets immediately after booking with instant email confirmation
            </p>
          </div>

          <div className="p-8 rounded-2xl card-hover" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}>
              <FiStar className="w-8 h-8" style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Premium Events
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Access to exclusive ceremonies and VIP experiences
            </p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Upcoming Events
            </h2>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              Don't miss out on these amazing experiences
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ backgroundColor: 'var(--surface-hover)' }}>
                  <div className="h-64 bg-gray-300" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-4" />
                    <div className="h-4 bg-gray-300 rounded mb-2" />
                    <div className="h-4 bg-gray-300 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : upcomingCeremonies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingCeremonies.slice(0, 6).map((ceremony) => (
                <Link
                  key={ceremony._id}
                  href={`/ceremony/${ceremony._id}`}
                  className="rounded-2xl overflow-hidden card-hover"
                  style={{ backgroundColor: 'var(--background)' }}
                >
                  <div className="relative h-64">
                    <Image
                      src={ceremony.image || '/images/ceremony-placeholder.png'}
                      alt={ceremony.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                      {ceremony.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                        <FiCalendar className="w-4 h-4" />
                        <span>{new Date(ceremony.date).toLocaleDateString()} at {ceremony.time}</span>
                      </div>
                      <div className="flex items-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                        <FiMapPin className="w-4 h-4" />
                        <span>{ceremony.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                No upcoming events at the moment. Check back soon!
              </p>
            </div>
          )}

          {upcomingCeremonies.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/app" className="btn-primary text-lg px-8 py-4 inline-block">
                View All Events
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <Image
          src="/images/promo-banner.png"
          alt="Promo Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90" />

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Memories?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers and book your next experience today
          </p>
          <Link href="/app" className="btn-secondary text-lg px-8 py-4 inline-block">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
