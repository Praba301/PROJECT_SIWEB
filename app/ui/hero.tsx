import Image from 'next/image';
import { NEON_PURPLE } from './colors';

export default function Hero() {
  return (
    <section style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '80px 48px',
      backgroundColor: '#0a0a0f',
      minHeight: '80vh',
    }}>
      <div style={{ maxWidth: '500px' }}>
        <h1 style={{ fontSize: '52px', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '24px' }}>
          Kirim Lebih Jauh,{' '}
          <span style={{ color: NEON_PURPLE }}>Lebih Andal</span> via Laut
        </h1>
        <p style={{ color: '#aaaaaa', fontSize: '15px', lineHeight: '1.8', marginBottom: '32px' }}>
          Praketrio menghadirkan layanan pengiriman barang melalui kapal laut dengan teknologi
          tracking realtime, rute luas ke seluruh kepulauan Indonesia, dan armada berkapasitas tinggi.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{
            backgroundColor: NEON_PURPLE,
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: `0 0 12px ${NEON_PURPLE}`,
          }}>
            Minta Penawaran
          </button>
          <button style={{
            backgroundColor: 'transparent',
            color: '#fff',
            border: `1px solid ${NEON_PURPLE}`,
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: `0 0 8px ${NEON_PURPLE}55`,
          }}>
            Lihat Layanan
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Image
          src="/logo.png"
          alt="Praketrio Logo"
          width={250}
          height={250}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </section>
  );
}