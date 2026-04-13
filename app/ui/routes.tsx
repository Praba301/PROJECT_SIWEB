import { NEON_PURPLE, NEON_PURPLE_GLOW } from './colors';

const routes = [
  { from: 'Jakarta', to: 'Surabaya', via: 'Via Selat Madura', duration: '18-22 jam' },
  { from: 'Surabaya', to: 'Makassar', via: 'Laut Flores', duration: '28-32 jam' },
  { from: 'Makassar', to: 'Manado', via: 'Laut Sulawesi', duration: '36-40 jam' },
  { from: 'Jakarta', to: 'Medan', via: 'Selat Malaka', duration: '48-54 jam' },
  { from: 'Surabaya', to: 'Sorong', via: 'Laut Banda', duration: '5-6 hari' },
  { from: 'Jakarta', to: 'Pontianak', via: 'Laut Natuna', duration: '30-36 jam' },
];

export default function Routes() {
  return (
    <section id="rute" style={{ padding: '80px 48px', backgroundColor: '#0a0a0f' }}>
      <h2 style={{ textAlign: 'center', fontSize: '40px', color: NEON_PURPLE, marginBottom: '16px' }}>
        Jangkauan Nusantara
      </h2>
      <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>
        Paketrio melayani rute pengiriman ke seluruh wilayah Indonesia dengan frekuensi keberangkatan hingga 3x seminggu di rute utama.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
        {routes.map((r, i) => (
          <div key={i} style={{
            backgroundColor: '#111827',
            borderRadius: '10px',
            padding: '24px 32px',
            textAlign: 'center',
            border: `1px solid ${NEON_PURPLE}`,
            boxShadow: NEON_PURPLE_GLOW,
          }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
              {r.from} – {r.to}
            </div>
            <div style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>
              {r.via} · {r.duration}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}