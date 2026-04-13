import { NEON_PURPLE, NEON_PURPLE_GLOW } from './colors';

export default function About() {
  return (
    <section id="tentang" style={{ padding: '80px 48px', backgroundColor: '#0a0a0f' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
      }}>
        <div>
          <h2 style={{ fontSize: '40px', color: NEON_PURPLE, marginBottom: '24px' }}>
            Pengiriman Laut Terpercaya
          </h2>
          <p style={{ color: '#aaa', fontSize: '15px', lineHeight: '1.8', marginBottom: '32px' }}>
            Paketrio berdiri sejak 2011 sebagai mitra logistik laut terpercaya di Indonesia.
            Kami menghubungkan lebih dari 34 kota pelabuhan dari Sabang hingga Merauke dengan
            armada kapal modern, sistem tracking realtime, dan tim operasional berpengalaman.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { icon: '🚀', title: 'Lacak Paket Real Time', desc: 'Pantau posisi paket Anda setiap saat dengan update lokasi langsung dari kurir di lapangan.' },
              { icon: '📦', title: 'Full Container', desc: 'Layanan FCL dan LCL untuk kebutuhan kargo besar maupun kecil.' },
              { icon: '🛡️', title: 'Asuransi Kargo', desc: 'Perlindungan penuh untuk setiap pengiriman barang Anda.' },
              { icon: '⚡', title: 'Express Shipment', desc: 'Layanan prioritas untuk pengiriman dengan tenggat waktu ketat.' },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: '#111827',
                borderRadius: '12px',
                padding: '24px',
                border: `1px solid ${NEON_PURPLE}`,
                boxShadow: NEON_PURPLE_GLOW,
              }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          backgroundColor: '#111827',
          borderRadius: '12px',
          padding: '32px',
          border: `1px solid ${NEON_PURPLE}`,
          boxShadow: NEON_PURPLE_GLOW,
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '2',
        }}>
          <p style={{ color: NEON_PURPLE, marginBottom: '16px', fontWeight: 'bold' }}>Praketrio Fleet Monitor</p>
          <p style={{ color: '#888' }}>$./ track --ship KRI-NUSANTARA-07</p>
          <p style={{ color: '#4ade80' }}>✓ Status: AKTIF — Laut Jawa</p>
          <p style={{ color: '#4ade80' }}>✓ Kecepatan: 14.2 knot</p>
          <p style={{ color: '#4ade80' }}>✓ Muatan: 87% kapasitas</p>
          <p style={{ color: '#4ade80' }}>✓ ETA Surabaya: 18 Apr 06:30</p>
          <br />
          <p style={{ color: '#888' }}>$./ weather --route JKT-SBY</p>
          <p style={{ color: '#4ade80' }}>✓ Kondisi: Cerah Berawan</p>
          <p style={{ color: '#4ade80' }}>✓ Gelombang: 0.8m — AMAN</p>
          <p style={{ color: '#facc15' }}>⚠ Angin Timur 22 km/h di Selat Madura</p>
          <br />
          <p style={{ color: '#888' }}>$./ fleet --status summary</p>
          <p style={{ color: '#4ade80' }}>✓ Kapal Aktif: 142/150</p>
          <p style={{ color: '#4ade80' }}>✓ Dalam Perbaikan: 8</p>
          <p style={{ color: '#4ade80' }}>✓ Uptime Sistem: 99.97%</p>
        </div>
      </div>
    </section>
  );
}