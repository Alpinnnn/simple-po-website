import React from 'react';
import { getCanteens } from './utils/api';
import CanteenCard from './components/canteen/CanteenCard';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const canteens = await getCanteens();

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                Pesan Makanan <span className="text-blue-600 dark:text-blue-400">Sekarang</span> Ambil <span className="text-blue-600 dark:text-blue-400">Nanti</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Jelajahi kantin kami dan pesan makanan favorit Anda dengan mudah melalui WhatsApp. Tidak perlu antre lagi!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#kantin" 
                  className="btn-primary bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary dark:from-primary dark:to-primary-dark dark:hover:from-primary dark:hover:to-primary-dark rounded-lg px-6 py-3.5 text-gray-800 shadow-md hover:shadow-lg transition-all text-lg"
                >
                  Lihat Kantin
                </a>
                <a 
                  href="/about" 
                  className="btn-secondary border border-secondary-dark dark:border-secondary hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg px-6 py-3.5 transition-all text-lg"
                >
                  Tentang Kami
                </a>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-lg mx-auto lg:mx-0">
              <div className="relative h-[400px] w-full">
                <Image
                  src="https://www.pcgamesn.com/wp-content/sites/pcgamesn/2023/05/honkai-star-rail-bronya-build-550x309.jpg"
                  alt="Food delivery illustration"
                  fill
                  priority
                  className="object-cover rounded-2xl shadow-xl"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent dark:bg-accent rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-dark dark:text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">Pesanan Siap</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Pesan Sekarang!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-20" id="kantin">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Kantin Kami</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Pilih dari berbagai kantin berkualitas yang menyediakan makanan favorit Anda
          </p>
        </div>
        
        {canteens.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Belum Ada Kantin</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">Kantin belum tersedia saat ini.</p>
            <p className="text-gray-500 dark:text-gray-400">Silakan kembali lagi nanti.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {canteens.map((canteen) => (
              <CanteenCard
                key={canteen.id}
                id={canteen.id}
                name={canteen.name}
                description={canteen.description || ''}
                imageUrl={canteen.image_url || ''}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-100 dark:border-gray-800 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Mengapa Memilih Kami
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Nikmati pengalaman memesan makanan yang lebih baik dengan platform kami
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Hemat Waktu</h3>
              <p className="text-gray-600 dark:text-gray-300">Pesan makanan sebelumnya dan lewati antrean dengan sistem pemesanan yang mudah</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Pembayaran Mudah</h3>
              <p className="text-gray-600 dark:text-gray-300">Berbagai opsi pembayaran tersedia untuk kenyamanan Anda saat memesan</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="bg-accent-light dark:bg-accent p-3 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-dark dark:text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Kualitas Terjamin</h3>
              <p className="text-gray-600 dark:text-gray-300">Kami bermitra dengan penyedia makanan berkualitas untuk pengalaman terbaik</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
