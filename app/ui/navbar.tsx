'use client';
import { NEON_PURPLE } from './colors';
import { useState } from 'react';

const navLinks = [
  { label: 'Tentang', href: '#tentang' },
  { label: 'Visi & Misi', href: '#visi' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Paket', href: '#paket' },
  { label: 'Rute', href: '#rute' },
  { label: 'Tim', href: '#tim' },
];

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 48px',
      backgroundColor: '#0a0a0f',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: `1px solid ${NEON_PURPLE}`,
      boxShadow: `0 0 12px ${NEON_PURPLE}55`,
    }}>
      <span style={{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '20px',
        letterSpacing: '2px',
      }}>
        PRAKETRIO
      </span>

      <div style={{ display: 'flex', gap: '32px', fontSize: '14px' }}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            onMouseEnter={() => setHoveredLink(link.href)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              color: hoveredLink === link.href ? NEON_PURPLE : '#fff',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              borderBottom: hoveredLink === link.href ? `1px solid ${NEON_PURPLE}` : '1px solid transparent',
              paddingBottom: '2px',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <button
        onMouseEnter={() => setHoveredBtn(true)}
        onMouseLeave={() => setHoveredBtn(false)}
        style={{
          border: `1px solid ${NEON_PURPLE}`,
          background: hoveredBtn ? NEON_PURPLE : 'transparent',
          color: '#fff',
          padding: '8px 20px',
          // halo
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          boxShadow: hoveredBtn ? `0 0 12px ${NEON_PURPLE}` : `0 0 8px ${NEON_PURPLE}55`,
          transition: 'all 0.3s ease',
          fontFamily: 'var(--font-roboto-mono), monospace',
        }}
      >
        Hubungi Kami
      </button>
    </nav>
  );
}