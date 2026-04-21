import Link from "next/link";

const footerLinks = [
  {
    title: "Layanan",
    links: [
      { label: "Lacak Paket", href: "#" },
      { label: "Pengiriman Domestik", href: "#" },
      { label: "Pengiriman Internasional", href: "#" },
      { label: "Same-Day Delivery", href: "#" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "#tentang" },
      { label: "Karir", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Pers", href: "#" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "Pusat Bantuan", href: "#" },
      { label: "Dokumentasi API", href: "#" },
      { label: "Status Sistem", href: "#" },
      { label: "Kontak Kami", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A12] border-t border-[#1E1E2E] py-16 px-6">
      <div className="max-w-7xl mx-auto w-full">

        {/* Top: Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#A855F7] font-bold text-xl font-mono tracking-widest uppercase">
              Praketrio
            </h3>
            <p className="text-[#A0A0B0] text-sm leading-relaxed max-w-xs">
              Platform pelacakan pengiriman terpercaya untuk bisnis Indonesia
              dan global.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h4 className="text-[#A855F7] font-semibold text-sm uppercase tracking-widest">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#A0A0B0] text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-[#1E1E2E] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6B6B80] text-xs">
            © {new Date().getFullYear()} Praketrio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[#6B6B80] text-xs hover:text-white transition-colors duration-200">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="text-[#6B6B80] text-xs hover:text-white transition-colors duration-200">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}