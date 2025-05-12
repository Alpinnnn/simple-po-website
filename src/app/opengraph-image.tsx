import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'OrderEase - Sistem Pre-Order Makanan';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: 'linear-gradient(to bottom, hsl(220, 15%, 15%), hsl(220, 15%, 25%))',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'hsl(30, 80%, 55%)',
            fontWeight: 700,
            position: 'relative',
            padding: '0 48px',
          }}
        >
          {/* Background Decorative Elements */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              right: 40,
              width: 120,
              height: 120,
              borderRadius: 60,
              background: 'hsl(170, 60%, 45%, 0.5)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: 40,
              width: 160,
              height: 160,
              borderRadius: 80,
              background: 'hsl(30, 80%, 55%, 0.3)',
            }}
          />
          
          {/* Logo and brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 48px',
              borderRadius: 24,
              background: 'rgba(0,0,0,0.2)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              marginBottom: 32,
            }}
          >
            <span style={{ marginRight: 16 }}>🍽️</span>
            <span>OrderEase</span>
          </div>
          
          {/* Tagline */}
          <div 
            style={{
              fontSize: 48,
              color: 'hsl(220, 10%, 85%)',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Sistem Pre-Order Makanan via WhatsApp
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error: any) {
    console.log(`${error.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 