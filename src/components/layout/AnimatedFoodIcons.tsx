'use client';

import { useEffect, useState, useRef } from 'react';
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
        
        // Jeda sebelum menyala lagi
        setTimeout(setRandomGlow, Math.random() * 5000 + 2000); // 2-7 detik
      }, glowDuration);
    };
    
    // Mulai efek glow dengan delay
    const timer = setTimeout(setRandomGlow, data.delay);
    
    return () => clearTimeout(timer);
  }, [data.delay]);

  // Menentukan style CSS untuk animasi linear
  const getAnimationStyle = () => {
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
  };

  return (
    <div
      className={cn(
        "absolute text-gray-400/30 transition-colors duration-300",
        isGlowing && "text-orange-500 filter drop-shadow-[0_0_12px_rgba(249,115,22,0.9)]"
      )}
      style={{
        top: `${data.row * 32}px`, // Spacing yang lebih kecil antar baris
        ...getAnimationStyle()
      }}
    >
      {icon}
    </div>
  );
};

export default function AnimatedFoodIcons() {
  // Daftar ikon makanan yang tersedia (ditambahkan lebih banyak ikon)
  const foodIcons = [
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
  ];
  
  const [mounted, setMounted] = useState(false);
  const [icons, setIcons] = useState<AnimatedIconData[]>([]);
  const totalRows = 25; // Meningkatkan jumlah baris untuk memenuhi layar
  const rowLastAddTime = useRef<number[]>(Array(totalRows).fill(0));
  
  // Fungsi untuk membuat ikon baru
  const createIcon = (row: number, reverse: boolean, initialPosition = 0): AnimatedIconData => {
    return {
      id: `icon-${Math.random().toString(36).substr(2, 9)}`,
      iconIndex: Math.floor(Math.random() * foodIcons.length),
      row,
      delay: Math.random() * 2000, // 0-2 detik delay untuk glow
      duration: 50 + Math.random() * 30, // 50-80 detik (durasi yang lebih singkat untuk menghindari penumpukan)
      scale: Math.random() * 0.3 + 0.9, // 0.9-1.2
      reverse,
      initialPosition
    };
  };
  
  // Menghapus ikon yang sudah kedaluwarsa (melebihi durasi animasi)
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      const currentTime = Date.now();
      
      setIcons(prevIcons => {
        // Filter ikon yang masih dalam waktu animasi
        return prevIcons.filter(icon => {
          const creationTime = parseInt(icon.id.split('-')[1], 36) || 0;
          const elapsedSeconds = (currentTime - creationTime) / 1000;
          return elapsedSeconds < icon.duration;
        });
      });
    }, 10000); // Cek setiap 10 detik
    
    return () => clearInterval(interval);
  }, [mounted]);
  
  // Regenerasi ikon secara berkala dengan memastikan jarak yang tepat
  useEffect(() => {
    if (!mounted) return;
    
    const checkAndAddIcons = () => {
      const currentTime = Date.now();
      
      // Array untuk menyimpan ikon baru
      const newIcons: AnimatedIconData[] = [];
      
      // Cek setiap baris
      for (let row = 0; row < totalRows; row++) {
        const reverse = row % 2 === 1; // Baris ganjil bergerak dari kanan ke kiri
        const lastAddedTime = rowLastAddTime.current[row];
        
        // Minimal 6 detik antara penambahan ikon pada baris yang sama (lebih sering)
        if (currentTime - lastAddedTime > 6000) {
          // Tambahkan ikon baru pada baris ini
          const newIcon = createIcon(row, reverse, 0);
          newIcons.push(newIcon);
          
          // Update waktu terakhir ditambahkan
          rowLastAddTime.current[row] = currentTime;
        }
      }
      
      if (newIcons.length > 0) {
        setIcons(prev => [...prev, ...newIcons]);
      }
    };
    
    // Cek setiap 1.5 detik untuk menambahkan ikon baru (lebih sering)
    const interval = setInterval(checkAndAddIcons, 1500);
    
    return () => clearInterval(interval);
  }, [mounted]);
  
  // Inisialisasi ikon-ikon awal
  useEffect(() => {
    if (mounted) return;
    
    setMounted(true);
    
    // Inisialisasi dengan beberapa ikon untuk setiap baris
    const initialIcons: AnimatedIconData[] = [];
    const currentTime = Date.now();
    
    for (let row = 0; row < totalRows; row++) {
      const reverse = row % 2 === 1; // Baris ganjil bergerak dari kanan ke kiri
      
      // Tambahkan 5-6 ikon per baris dengan posisi tersebar (lebih banyak)
      const iconsPerRow = Math.floor(Math.random() * 2) + 5; // 5-6 ikon
      
      for (let i = 0; i < iconsPerRow; i++) {
        // Posisi awal ikon dalam persentase viewport width (0-100)
        // Memastikan tersebar merata di sepanjang viewport
        const initialPosition = (i * 100) / iconsPerRow;
        
        initialIcons.push(createIcon(row, reverse, initialPosition));
      }
      
      // Set waktu terakhir ditambahkan untuk baris ini
      rowLastAddTime.current[row] = currentTime;
    }
    
    setIcons(initialIcons);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none" style={{ minHeight: '200vh' }}>
      <style jsx global>{`
        @keyframes moveIcon {
          from {
            transform: translateX(var(--initial-position, 0));
          }
          to {
            transform: translateX(100vw);
          }
        }
        
        @keyframes moveIconReverse {
          from {
            transform: translateX(calc(-1 * var(--initial-position, 0)));
          }
          to {
            transform: translateX(-100vw);
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