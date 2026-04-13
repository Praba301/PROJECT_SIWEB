'use client';
import { NEON_PURPLE, NEON_PURPLE_GLOW } from './colors';
import { useState } from 'react';

const plans = [
  {
    target: 'UNTUK UKM & PERORANGAN',
    name: 'Starter',
    price: 'Rp 850K',
    unit: '/ pengiriman',
    desc: 'Untuk kargo hingga 500 kg atau 2 CBM',
    features: [
      { label: 'LCL (Less Container Load)', active: true },
      { label: 'Tracking via aplikasi & web', active: true },
      { label: 'Asuransi dasar (max Rp 10 juta)', active: true },
      { label: 'Notifikasi email & WhatsApp', active: true },
      { label: 'Dukungan via live chat', active: true },
      { label: 'Dedicated account manager', active: false },
      { label: 'Reefer / cold chain', active: false },
    ],
    button: 'Mulai Sekarang',
    popular: false,
  },
  {
    target: 'UNTUK BISNIS MENENGAH',
    name: 'Business',
    price: 'Rp 3.5 Jt',
    unit: '/ pengiriman',
    desc: 'Untuk kargo 500 kg – 5 ton atau 1 TEU',
    features: [
      { label: 'FCL 20ft container', active: true },
      { label: 'Realtime GPS tracking dashboard', active: true },
      { label: 'Asuransi penuh (max Rp 150 juta)', active: true },
      { label: 'Dedicated account manager', active: true },
      { label: 'Prioritas jadwal keberangkatan', active: true },
      { label: 'Laporan pengiriman bulanan', active: true },
      { label: 'Reefer / cold chain', active: false },
    ],
    button: 'Pilih Paket Ini →',
    popular: true,
  },
  {
    target: 'UNTUK KORPORASI & INDUSTRI',
    name: 'Enterprise',
    price: 'Custom',
    unit: '',
    desc: 'Penawaran khusus sesuai volume & kontrak',
    features: [
      { label: 'FCL 40ft / multi-container', active: true },
      { label: 'Charter kapal penuh (bareboat/voyage)', active: true },
      { label: 'Asuransi tanpa batas nilai kargo', active: true },
      { label: 'Reefer & cold chain tersedia', active: true },
      { label: 'API integration ke sistem klien', active: true },
      { label: 'SLA & kontrak tahunan', active: true },
      { label: 'Tim operasional on-site 24/7', active: true },
    ],
    button: 'Hubungi Sales',
    popular: false,
  },
];

export default function Pricing() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="paket" style={{ padding: '80px 48px', backgroundColor: '#0a0a0f' }}>
      <p style={{ textAlign: 'center', color: NEON_PURPLE, fontSize: '13px', letterSpacing: '3px', marginBottom: '12px' }}>
      </p>
      <h2 style={{ textAlign: 'center', fontSize: '42px', fontWeight: 'bold', marginBottom: '8px' }}>
        Pilih <span style={{ color: NEON_PURPLE }}>Paket</span> Sesuai Kebutuhan
      </h2>
      <div style={{
        width: '60px', height: '3px', backgroundColor: NEON_PURPLE,
        margin: '0 auto 24px', boxShadow: NEON_PURPLE_GLOW,
      }} />
      <p style={{ textAlign: 'center', color: '#888', maxWidth: '560px', margin: '0 auto 56px', lineHeight: '1.8', fontSize: '14px' }}>
        Kami menawarkan tiga pilihan paket pengiriman laut yang fleksibel — dari UKM hingga korporasi besar, semua terlayani dengan standar terbaik.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'start' }}>
        {plans.map((plan, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              backgroundColor: '#111827',
              borderRadius: '12px',
              padding: '32px',
              border: plan.popular ? `2px solid ${NEON_PURPLE}` : `1px solid ${hovered === i ? NEON_PURPLE : '#2a2a3a'}`,
              boxShadow: plan.popular || hovered === i ? NEON_PURPLE_GLOW : 'none',
              transform: hovered === i ? 'translateY(-6px)' : 'translateY(0)',
              transition: 'all 0.3s ease',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            {plan.popular && (
              <span style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: NEON_PURPLE,
                color: '#fff',
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '20px',
                fontWeight: 'bold',
                letterSpacing: '1px',
              }}>
                TERPOPULER
              </span>
            )}
            <p style={{ color: NEON_PURPLE, fontSize: '11px', letterSpacing: '2px', marginBottom: '8px' }}>
              {plan.target}
            </p>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#fff' }}>
              {plan.name}
            </h3>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '32px', fontWeight: 'bold', color: NEON_PURPLE }}>{plan.price}</span>
              {plan.unit && <span style={{ color: '#888', fontSize: '14px' }}> {plan.unit}</span>}
            </div>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #2a2a3a' }}>
              {plan.desc}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {plan.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: f.active ? NEON_PURPLE : '#444', fontSize: '13px', fontWeight: 'bold' }}>
                    {f.active ? '✓' : '✗'}
                  </span>
                  <span style={{ color: f.active ? '#ccc' : '#444', fontSize: '13px' }}>{f.label}</span>
                </div>
              ))}
            </div>
            <button style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              border: plan.popular ? 'none' : `1px solid ${NEON_PURPLE}`,
              backgroundColor: plan.popular ? NEON_PURPLE : 'transparent',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: plan.popular ? NEON_PURPLE_GLOW : 'none',
              fontFamily: 'var(--font-roboto-mono), monospace',
              transition: 'all 0.3s ease',
            }}>
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}