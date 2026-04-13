import { NEON_PURPLE } from './colors';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0a0a0f',
      padding: '60px 48px',
      borderTop: `1px solid ${NEON_PURPLE}`,
      boxShadow: `0 -4px 20px ${NEON_PURPLE}33`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
        <div>
          <h3 style={{ color: NEON_PURPLE, marginBottom: '16px', letterSpacing: '2px' }}>PRAKETRIO</h3>
          <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.8' }}>
            Platform pelacakan pengiriman terpercaya untuk bisnis Indonesia dan global.
          </p>
        </div>
        <div>
          <h4 style={{ color: NEON_PURPLE, marginBottom: '16px', letterSpacing: '1px' }}>LAYANAN</h4>
          {['Lacak Paket', 'Pengiriman Domestik', 'Pengiriman Internasional', 'Same-Day Delivery'].map((item, i) => (
            <p key={i} style={{ color: '#888', fontSize: '14px', marginBottom: '8px' }}>{item}</p>
          ))}
        </div>
        <div>
          <h4 style={{ color: NEON_PURPLE, marginBottom: '16px', letterSpacing: '1px' }}>PERUSAHAAN</h4>
          {['Tentang Kami', 'Karir', 'Blog', 'Pers'].map((item, i) => (
            <p key={i} style={{ color: '#888', fontSize: '14px', marginBottom: '8px' }}>{item}</p>
          ))}
        </div>
        <div>
          <h4 style={{ color: NEON_PURPLE, marginBottom: '16px', letterSpacing: '1px' }}>BANTUAN</h4>
          {['Pusat Bantuan', 'Dokumentasi API', 'Status Sistem', 'Kontak Kami'].map((item, i) => (
            <p key={i} style={{ color: '#888', fontSize: '14px', marginBottom: '8px' }}>{item}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}