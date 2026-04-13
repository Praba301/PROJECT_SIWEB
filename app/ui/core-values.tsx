import { NEON_PURPLE, NEON_PURPLE_GLOW } from './colors';

const values = [
  { icon: '⚓', title: 'Integritas', desc: 'Jujur dan bertanggung jawab dalam setiap transaksi' },
  { icon: '🚀', title: 'Inovasi', desc: 'Terus berinovasi untuk solusi logistik terbaik' },
  { icon: '🤝', title: 'Kemitraan', desc: 'Tumbuh bersama mitra dan pelanggan kami' },
  { icon: '🛡️', title: 'Keselamatan', desc: 'Safety first di setiap pelayaran dan operasi' },
  { icon: '🌿', title: 'Keberlanjutan', desc: 'Pelayaran hijau untuk generasi mendatang' },
];

export default function CoreValues() {
  return (
    <section style={{ padding: '80px 48px', backgroundColor: '#0a0a0f' }}>
      <h2 style={{ textAlign: 'center', fontSize: '24px', color: NEON_PURPLE, letterSpacing: '3px', marginBottom: '40px' }}>
        NILAI INTI PERUSAHAAN
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {values.map((v, i) => (
          <div key={i} style={{
            backgroundColor: '#111827',
            borderRadius: '12px',
            padding: '28px 20px',
            border: `1px solid ${NEON_PURPLE}`,
            boxShadow: NEON_PURPLE_GLOW,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{v.icon}</div>
            <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>{v.title}</h4>
            <p style={{ color: '#888', fontSize: '12px', lineHeight: '1.6' }}>{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}