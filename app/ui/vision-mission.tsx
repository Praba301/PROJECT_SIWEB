import { NEON_PURPLE, NEON_PURPLE_GLOW } from './colors';

export default function VisionMission() {
  return (
    <section id="visi" style={{ padding: '80px 48px', backgroundColor: '#0a0a0f' }}>
      <h2 style={{ textAlign: 'center', fontSize: '40px', color: NEON_PURPLE, marginBottom: '48px' }}>
        Visi & Misi
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{
          backgroundColor: '#111827',
          borderRadius: '12px',
          padding: '40px',
          border: `1px solid ${NEON_PURPLE}`,
          boxShadow: NEON_PURPLE_GLOW,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px', height: '40px', backgroundColor: NEON_PURPLE,
              borderRadius: '8px', boxShadow: NEON_PURPLE_GLOW,
            }} />
            <h3 style={{ fontSize: '22px', color: NEON_PURPLE }}>Vision</h3>
          </div>
          <p style={{ fontWeight: 'bold', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
            Menjadi perusahaan logistik laut terdepan di Asia Tenggara yang menghubungkan setiap
            sudut kepulauan Indonesia dengan teknologi, keandalan, dan keberlanjutan.
          </p>
          <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.8' }}>
            Kami percaya bahwa lautan bukan halangan, melainkan jalan raya bagi kemajuan ekonomi bangsa.
            Paketrio hadir untuk memastikan setiap barang, dari Sabang hingga Merauke, sampai tepat
            waktu dan dalam kondisi sempurna.
          </p>
        </div>
        <div style={{
          backgroundColor: '#111827',
          borderRadius: '12px',
          padding: '40px',
          border: `1px solid ${NEON_PURPLE}`,
          boxShadow: NEON_PURPLE_GLOW,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px', height: '40px', backgroundColor: NEON_PURPLE,
              borderRadius: '8px', boxShadow: NEON_PURPLE_GLOW,
            }} />
            <h3 style={{ fontSize: '22px', color: NEON_PURPLE }}>Mission</h3>
          </div>
          {[
            '01 Menyediakan layanan pengiriman laut yang andal, tepat waktu, dan transparan dengan teknologi tracking realtime untuk setiap kargo.',
            '02 Membangun ekosistem logistik terintegrasi dari pelabuhan ke pintu, mencakup armada kapal, pergudangan, dan distribusi last-mile.',
            '03 Mengutamakan keselamatan armada dan keamanan kargo dengan standar internasional IMO serta asuransi penuh untuk setiap pengiriman.',
            '04 Mendukung pertumbuhan UKM dan industri nasional melalui harga kompetitif, fleksibilitas layanan, dan kemitraan jangka panjang.',
            '05 Berkomitmen pada pelayaran ramah lingkungan dengan investasi berkelanjutan pada teknologi kapal hemat bahan bakar dan pengurangan emisi karbon.',
          ].map((item, i) => (
            <p key={i} style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.8', marginBottom: '12px' }}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}