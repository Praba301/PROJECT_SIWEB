import { NEON_PURPLE, NEON_PURPLE_GLOW } from './colors';

const team = [
  { name: 'Capt. Tristo Thomas', role: 'CEO & Founder', desc: '25+ tahun pengalaman di industri pelayaran Indonesia. Mantan Kapten Kapal niaga lintas Pasifik.' },
  { name: 'Kresna Praba', role: 'CTO', desc: 'Arsitek sistem fleet tracking dan platform digital Paketrio. Lulusan ITB Teknik Informatika.' },
  { name: 'Kevin Melvern', role: 'Head Of Seafty', desc: 'Sertifikasi STCW internasional. Memimpin protokol keselamatan armada dan kepatuhan IMO.' },
];

export default function Team() {
  return (
    <section id="tim" style={{ padding: '80px 48px', backgroundColor: '#0a0a0f' }}>
      <h2 style={{ textAlign: 'center', fontSize: '40px', color: NEON_PURPLE, marginBottom: '48px' }}>
        Orang-Orang Dibalik Praketrio
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {team.map((t, i) => (
          <div key={i} style={{
            backgroundColor: '#111827',
            borderRadius: '12px',
            padding: '32px',
            border: `1px solid ${NEON_PURPLE}`,
            boxShadow: NEON_PURPLE_GLOW,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>💡</div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>{t.name}</h3>
            <p style={{ color: NEON_PURPLE, fontSize: '14px', marginBottom: '12px' }}>{t.role}</p>
            <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.7' }}>{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}