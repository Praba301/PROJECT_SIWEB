import { NEON_PURPLE, NEON_PURPLE_GLOW } from './colors';

const stats = [
  { value: '150+', label: 'Armada Kapal' },
  { value: '34', label: 'Kota Tujuan' },
  { value: '97.6%', label: 'On-Time' },
  { value: '12K+', label: 'Pengiriman/Bulan' },
];

export default function Stats() {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      padding: '40px 48px',
      backgroundColor: '#0d0d1a',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: '32px',
          border: `1px solid ${NEON_PURPLE}`,
          boxShadow: NEON_PURPLE_GLOW,
          backgroundColor: '#111827',
          borderRadius: '12px',
          textAlign: 'left',
        }}>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: NEON_PURPLE }}>{s.value}</div>
          <div style={{ color: '#888', fontSize: '13px', marginTop: '8px', letterSpacing: '1px' }}>{s.label}</div>
        </div>
      ))}
    </section>
  );
}