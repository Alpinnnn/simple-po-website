'use client';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Coffee, Pizza, Apple, Cookie, Sandwich, IceCream, Beef, Cake, EggFried, Salad, UtensilsCrossed, Croissant, Banana, Drumstick, Cherry, Beer, Candy, Fish, Soup, Carrot, Egg } from 'lucide-react';
import { cn } from '@/lib/utils';

// Representasi posisi sebuah ikon
interface AnimatedIconData {
  id: string;
  iconIndex: number;
  row: number; 
  delay: number;
  duration: number;
  scale: number;
  reverse: boolean;
  initialPosition: number; // Posisi awal dalam persen (0-100)
}

const IconRenderer = ({ data, icon }: { data: AnimatedIconData, icon: React.ReactNode }) => {
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    // Fungsi untuk mengatur glow secara acak
    const setRandomGlow = () => {
      const glowDuration = Math.random() * 1000 + 500; // 500-1500ms
      
      setIsGlowing(true);
      
      setTimeout(() => {
        setIsGlowing(false);
        
        // Jeda sebelum menyala lagi (diperpanjang untuk mengurangi perubahan state)
        setTimeout(setRandomGlow, Math.random() * 10000 + 5000); // 5-15 detik
      }, glowDuration);
    };
    
    // Mulai efek glow dengan delay
    const timer = setTimeout(setRandomGlow, data.delay);
    
    return () => clearTimeout(timer);
  }, [data.delay]);

  // Menentukan style CSS untuk animasi linear
  const animationStyle = useMemo(() => {
    const viewportPercentage = data.initialPosition;
    
    if (data.reverse) {
      // Untuk icon yang bergerak dari kanan ke kiri
      return {
        left: 'auto',
        right: '0',
        transform: `translateX(0) scale(${data.scale})`,
        animationName: 'moveIconReverse',
        animationDuration: `${data.duration}s`,
        animationDelay: `0s`,
        animationTimingFunction: 'linear', // Memastikan linear
        animationIterationCount: '1',
        animationFillMode: 'forwards',
        '--initial-position': `${viewportPercentage}vw`,
      } as React.CSSProperties;
    } else {
      // Untuk icon yang bergerak dari kiri ke kanan
      return {
        left: '0',
        right: 'auto',
        transform: `translateX(0) scale(${data.scale})`,
        animationName: 'moveIcon',
        animationDuration: `${data.duration}s`,
        animationDelay: `0s`,
        animationTimingFunction: 'linear', // Memastikan linear
        animationIterationCount: '1',
        animationFillMode: 'forwards',
        '--initial-position': `${viewportPercentage}vw`,
      } as React.CSSProperties;
    }
  }, [data.initialPosition, data.reverse, data.scale, data.duration]);

  return (
    <div
      className={cn(
        "absolute text-gray-400/30 transition-colors duration-300",
        isGlowing && "text-orange-500 filter drop-shadow-[0_0_12px_rgba(249,115,22,0.9)]"
      )}
      style={{
        top: `${data.row * 32}px`, // Spacing yang lebih kecil antar baris
        ...animationStyle
      }}
    >
      {icon}
    </div>
  );
};

export default function AnimatedFoodIcons() {
  const [mounted, setMounted] = useState(false);
  const [icons, setIcons] = useState<AnimatedIconData[]>([]);
  const [isMobile, setIsMobile] = useState(true); // Default ke true untuk mencegah rendering awal

  // Effect untuk deteksi ukuran layar
  useEffect(() => {
    const checkMobile = () => {
      const isMobileScreen = window.innerWidth < 426;
      setIsMobile(isMobileScreen);
      console.log('Screen width:', window.innerWidth, 'Is Mobile:', isMobileScreen);
    };

    // Check awal
    checkMobile();

    // Tambahkan event listener untuk resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Daftar ikon makanan yang tersedia
  const foodIcons = useMemo(() => [
    <Pizza key="pizza" size={28} />,
    <Coffee key="coffee" size={26} />,
    <Apple key="apple" size={24} />,
    <Cookie key="cookie" size={30} />,
    <Sandwich key="sandwich" size={32} />,
    <IceCream key="icecream" size={28} />,
    <Beef key="beef" size={26} />,
    <Cake key="cake" size={30} />,
    <EggFried key="egg" size={28} />,
    <Salad key="salad" size={32} />,
    <UtensilsCrossed key="utensils" size={26} />,
    <Croissant key="croissant" size={30} />,
    <Banana key="banana" size={28} />,
    <Drumstick key="drumstick" size={32} />,
    <Cherry key="cherry" size={26} />,
    <Beer key="beer" size={28} />,
    <Candy key="candy" size={26} />,
    <Fish key="fish" size={30} />,
    <Soup key="soup" size={28} />,
    <Carrot key="carrot" size={26} />,
    <Egg key="boiledegg" size={24} />
  ], []);
  
  // Konfigurasi animasi
  const totalRows = 20;
  const iconsPerRow = 4;
  const iconInterval = 6000;
  
  const rowLastAddTime = useRef<number[]>(Array(25).fill(0));
  
  // Fungsi untuk membuat ikon baru
  const createIcon = useCallback((row: number, reverse: boolean, initialPosition = 0): AnimatedIconData => {
    return {
      id: `icon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      iconIndex: Math.floor(Math.random() * foodIcons.length),
      row,
      delay: Math.random() * 5000, // 0-5 detik delay untuk glow
      duration: 80 + Math.random() * 40, // 80-120 detik
      scale: Math.random() * 0.3 + 0.9, // 0.9-1.2
      reverse,
      initialPosition
    };
  }, [foodIcons]);
  
  // Inisialisasi animasi
  useEffect(() => {
    if (mounted || isMobile) return;
    
    console.log('Initializing animation, isMobile:', isMobile);
    setMounted(true);
    
    // Inisialisasi dengan beberapa ikon untuk setiap baris
    const initialIcons: AnimatedIconData[] = [];
    const currentTime = Date.now();
    
    for (let row = 0; row < totalRows; row++) {
      const reverse = row % 2 === 1; // Baris ganjil bergerak dari kanan ke kiri
      
      // Tambahkan ikon per baris dengan posisi tersebar
      for (let i = 0; i < iconsPerRow; i++) {
        // Posisi awal ikon dalam persentase viewport width (0-100)
        const initialPosition = (i * 100) / iconsPerRow;
        
        initialIcons.push(createIcon(row, reverse, initialPosition));
      }
      
      // Set waktu terakhir ditambahkan untuk baris ini
      rowLastAddTime.current[row] = currentTime;
    }
    
    console.log('Setting initial icons:', initialIcons.length);
    setIcons(initialIcons);
  }, [mounted, isMobile, createIcon]);
  
  // Menghapus ikon yang sudah kedaluwarsa dan menambahkan ikon baru
  useEffect(() => {
    if (!mounted || isMobile) return;
    
    console.log('Setting up cleanup and regeneration, isMobile:', isMobile);
    
    // Menghapus ikon yang kedaluwarsa
    const cleanupInterval = setInterval(() => {
      const currentTime = Date.now();
      
      setIcons(prevIcons => {
        return prevIcons.filter(icon => {
          const iconTimestamp = icon.id.split('-')[1];
          const creationTime = iconTimestamp ? parseInt(iconTimestamp) : 0;
          const elapsedSeconds = (currentTime - creationTime) / 1000;
          return elapsedSeconds < icon.duration;
        });
      });
    }, 15000);
    
    // Menambahkan ikon baru secara berkala
    const regenerationInterval = setInterval(() => {
      const currentTime = Date.now();
      const newIcons: AnimatedIconData[] = [];
      
      for (let row = 0; row < totalRows; row++) {
        const reverse = row % 2 === 1;
        const lastAddedTime = rowLastAddTime.current[row];
        
        if (currentTime - lastAddedTime > iconInterval) {
          newIcons.push(createIcon(row, reverse, 0));
          rowLastAddTime.current[row] = currentTime;
        }
      }
      
      if (newIcons.length > 0) {
        console.log('Adding new icons:', newIcons.length);
        setIcons(prev => [...prev, ...newIcons]);
      }
    }, 4000);
    
    return () => {
      clearInterval(cleanupInterval);
      clearInterval(regenerationInterval);
    };
  }, [mounted, isMobile, createIcon]);

  // Debugging
  useEffect(() => {
    console.log('Component state - mounted:', mounted, 'isMobile:', isMobile, 'icons count:', icons.length);
  }, [mounted, isMobile, icons.length]);

  // Jika layar mobile atau belum ter-mount, tidak menampilkan animasi
  if (isMobile || !mounted) {
    console.log('Not rendering animation - isMobile:', isMobile, 'mounted:', mounted);
    return null;
  }

  console.log('Rendering animation with', icons.length, 'icons');
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none" style={{ minHeight: '200vh' }}>
      <style jsx global>{`
        @keyframes moveIcon {
          from {
            transform: translateX(var(--initial-position, 0)) scale(var(--scale, 1));
          }
          to {
            transform: translateX(100vw) scale(var(--scale, 1));
          }
        }
        
        @keyframes moveIconReverse {
          from {
            transform: translateX(calc(-1 * var(--initial-position, 0))) scale(var(--scale, 1));
          }
          to {
            transform: translateX(-100vw) scale(var(--scale, 1));
          }
        }
      `}</style>
      
      {icons.map(iconData => (
        <IconRenderer 
          key={iconData.id} 
          data={iconData} 
          icon={foodIcons[iconData.iconIndex]} 
        />
      ))}
    </div>
  );
} 