import { NEON_PURPLE, NEON_PURPLE_GLOW } from './colors';

const services = [
  { icon: '📦', title: 'Full Container Load', desc: 'Sewa kontainer penuh untuk pengiriman masif. Ideal untuk eksportir, importir, dan perusahaan manufaktur dengan volume besar.' },
  { icon: '🌍', title: 'Less Container Load', desc: 'Gabungkan kargo Anda dengan pengirim lain untuk efisiensi biaya. Cocok untuk UKM dan pengiriman reguler bervolume kecil-menengah.' },
  { icon: '🚚', title: 'Express Sea Freight', desc: 'Pengiriman prioritas dengan jadwal keberangkatan tetap dan jaminan waktu tiba. Untuk kargo mendesak dengan deadline ketat.' },
  { icon: '🧊', title: 'Reefer Cargo', desc: 'Pengiriman kargo berpendingin untuk produk segar, farmasi, dan bahan kimia sensitif suhu dengan monitoring temperatur realtime.' },
  { icon: '🔔', title: 'Project Cargo', desc: 'Solusi pengiriman khusus untuk barang oversized, alat berat, dan infrastruktur industri yang membutuhkan penanganan ekstra.' },
  { icon: '🚀', title: 'Warehousing & Logistik', desc: 'Layanan pergudangan terintegrasi di 12 pelabuhan utama dengan sistem manajemen inventaris dan distribusi last-mile.' },
];

export default function Services() {
  return (
    <section id="layanan" style={{ padding: '80px 48px', backgroundColor: '#0a0a0f' }}>
      <h2 style={{ textAlign: 'center', fontSize: '40px', color: NEON_PURPLE, marginBottom: '16px' }}>
        Solusi Pengiriman Lengkap
      </h2>
      <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
        Kami menyediakan berbagai solusi logistik laut untuk memenuhi kebutuhan bisnis Anda dari skala kecil hingga industri besar.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {services.map((s, i) => (
          <div key={i} style={{
            backgroundColor: '#111827',
            borderRadius: '12px',
            padding: '32px',
            border: `1px solid ${NEON_PURPLE}`,
            boxShadow: NEON_PURPLE_GLOW,
          }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>{s.icon}</div>
            <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#fff' }}>{s.title}</h3>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.7' }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}