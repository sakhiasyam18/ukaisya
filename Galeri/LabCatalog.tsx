// src/components/lab/LabCatalog.tsx
// ============================================================
// Catalog Section — Asymmetric Collage Grid
// Desktop: original hover overlay (ringan, smooth)
// Mobile: tap-to-expand lightbox + dynamic pattern
// ============================================================
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUpRight, X } from "lucide-react";
import { Container } from "@/components/Container";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

// ===== Product Data =====
// Mobile (2 cols): Wide → Portrait×2 → Square×2 → Wide → Portrait×2
// Desktop (3 cols): Bento with row-span
const products = [
  {
    id: "cat-1",
    name: "Tabung Reaksi & Gelas Laboratorium",
    category: "Alat Lab",
    image: "/images/jual alat lab madiun.avif",
    catColor: "bg-blue-500/10 text-blue-600 border-blue-200/50",
    className: "col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto lg:h-full",
  },
  {
    id: "cat-2",
    name: "Jas Dokter Lengan Panjang",
    category: "Jas Dokter",
    image: "/images/jual jas dokter di madiun.avif",
    catColor: "bg-violet-500/10 text-violet-600 border-violet-200/50",
    className: "col-span-1 aspect-[2/3] lg:aspect-[4/3]",
  },
  {
    id: "cat-3",
    name: "Jas Laboratorium Anti Kimia",
    category: "Jas Lab",
    image: "/images/labolatorium di madiun.avif",
    catColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200/50",
    className: "col-span-1 aspect-[2/3] lg:aspect-[4/3]",
  },
  {
    id: "cat-4",
    name: "Mikropipet & Alat Ukur Presisi",
    category: "Alat Lab",
    image: "/images/alat lab di madiun.avif",
    catColor: "bg-blue-500/10 text-blue-600 border-blue-200/50",
    className: "col-span-1 aspect-square lg:row-span-2 lg:aspect-auto lg:h-full",
  },
  {
    id: "cat-5",
    name: "Sentrifuge Digital Laboratorium",
    category: "Alat Lab",
    image: "/images/alat lab madiun.avif",
    catColor: "bg-blue-500/10 text-blue-600 border-blue-200/50",
    className: "col-span-1 aspect-square lg:col-span-2 lg:aspect-[16/9]",
  },
  {
    id: "cat-6",
    name: "Jas Dokter Lengan Pendek",
    category: "Jas Dokter",
    image: "/images/baju oka di madiun.avif",
    catColor: "bg-violet-500/10 text-violet-600 border-violet-200/50",
    className: "col-span-2 aspect-[21/9] lg:col-span-1 lg:aspect-[4/3]",
  },
  {
    id: "cat-7",
    name: "Peralatan Sterilisasi & Autoklaf",
    category: "Alat Lab",
    image: "/images/Perlengkapan medis lengkap.avif",
    catColor: "bg-blue-500/10 text-blue-600 border-blue-200/50",
    className: "col-span-1 aspect-[2/3] lg:col-span-2 lg:aspect-[16/9]",
  },
  {
    id: "cat-8",
    name: "Jas Lab Praktikum Kampus",
    category: "Jas Lab",
    image: "/images/labolatorium.avif",
    catColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200/50",
    className: "col-span-1 aspect-[2/3] lg:aspect-[4/3]",
  },
];

// ===== CatalogCard — Desktop hover overlay + Mobile tap =====
const CatalogCard = ({
  product,
  index,
  onTap,
}: {
  product: (typeof products)[0];
  index: number;
  onTap: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    onClick={onTap}
    className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer
      bg-white/40 backdrop-blur-xl border border-white/40
      shadow-[4px_4px_12px_rgba(0,0,0,0.05),-4px_-4px_12px_rgba(255,255,255,0.7)]
      hover:shadow-[6px_6px_20px_rgba(0,0,0,0.08),-6px_-6px_20px_rgba(255,255,255,0.9)]
      active:scale-[0.97] lg:active:scale-100 transition-all duration-300
      ${product.className}`}
  >
    {/* Neumorphic shimmer base (fallback) */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50/80 to-white" />
    
    {/* Actual Image */}
    <Image 
      src={product.image} 
      alt={product.name} 
      fill 
      sizes="(max-width: 1024px) 50vw, 33vw" 
      className="object-cover group-hover:scale-105 transition-transform duration-700" 
    />
    
    {/* Hover gradient (desktop) */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Category badge */}
    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
      <span
        className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold
          backdrop-blur-xl border shadow-sm ${product.catColor}`}
      >
        {product.category}
      </span>
    </div>

    {/* ===== Info Overlay ===== */}
    {/* Mobile: always visible compact name */}
    <div className="absolute bottom-0 inset-x-0 z-10 p-2 sm:p-3 lg:hidden">
      <div className="rounded-lg bg-white/70 backdrop-blur-xl border border-white/40 p-2 shadow-sm">
        <h3 className="font-semibold text-gray-900 text-[10px] sm:text-xs leading-tight line-clamp-2">
          {product.name}
        </h3>
      </div>
    </div>

    {/* Desktop: hover slide-up overlay with WhatsApp CTA */}
    <div className="absolute bottom-0 inset-x-0 z-10 p-4 lg:p-5 hidden lg:block">
      <div className="rounded-2xl bg-white/60 backdrop-blur-2xl border border-white/40 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)]
        translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h3>
        <p className="text-[11px] text-gray-400 mb-3">Hubungi kami untuk harga terbaik</p>
        <a
          href={buildWhatsAppUrl(`Halo, saya ingin bertanya tentang ${product.name}. Berapa harganya?`)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Tanya Harga
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  </motion.div>
);

export const LabCatalog = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (expandedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [expandedId]);

  const expandedProduct = products.find((p) => p.id === expandedId);
  const closeLightbox = useCallback(() => setExpandedId(null), []);

  const handleCardTap = useCallback((id: string) => {
    setExpandedId(id);
  }, []);

  return (
    <section
      id="katalog"
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
      aria-label="Katalog alat lab dan jas medis Nimas Medika Madiun"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-blue-50/30" />
        <div
          className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(78,113,255,0.07),transparent_70%)]"
          style={{ animation: "breathe 10s ease-in-out infinite 2s" }}
        />
      </div>
      <div className="noise-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2 sm:mb-3">
            Katalog Produk
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Koleksi Lengkap{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4E71FF] to-[#8DD8FF]">
              Alat Lab & Jas Medis
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Lihat berbagai koleksi jas dokter, jas lab praktikum, baju operasi (scrub), hingga instrumen medis yang kami sediakan. Stok tersedia langsung di toko Madiun atau siap antar via pesan WhatsApp.
          </p>
          <p className="mt-1 text-[10px] sm:text-xs text-gray-400">Klik produk untuk memperbesar</p>
        </motion.div>

        {/* ===== Collage Grid ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-5">
          {products.map((product, index) => (
            <CatalogCard
              key={product.id}
              product={product}
              index={index}
              onTap={() => handleCardTap(product.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 sm:mt-14"
        >
          <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-5">Tidak menemukan yang kamu cari?</p>
          <a
            href={buildWhatsAppUrl("Halo, saya ingin menanyakan ketersediaan produk alat lab dan jas medis di Nimas Medika Madiun.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 sm:px-7 sm:py-3.5
              bg-gradient-to-r from-[#25D366] to-[#20BD5A]
              text-sm font-semibold text-white
              shadow-[0_0_20px_rgba(37,211,102,0.25),0_6px_16px_rgba(37,211,102,0.20)]
              hover:shadow-[0_0_32px_rgba(37,211,102,0.35)]
              hover:scale-[1.03] active:scale-[0.98]
              transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4" />
            Hubungi via WhatsApp
          </a>
        </motion.div>
      </Container>

      {/* ===== Lightbox ===== */}
      <AnimatePresence>
        {expandedId && expandedProduct && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeLightbox}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-5 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="relative w-full max-w-sm sm:max-w-lg aspect-[3/4] sm:aspect-[4/3] rounded-3xl overflow-hidden pointer-events-auto
                  shadow-[0_32px_64px_rgba(0,0,0,0.25)]"
              >
                {/* Fallback background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-white" />
                
                {/* Image */}
                <Image 
                  src={expandedProduct.image} 
                  alt={expandedProduct.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                  className="object-cover" 
                />

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-semibold backdrop-blur-xl border shadow-sm ${expandedProduct.catColor}`}>
                    {expandedProduct.category}
                  </span>
                </div>

                {/* Product info panel */}
                <div className="absolute bottom-0 inset-x-0 z-10 p-5">
                  <div className="rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/50 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.10)]">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{expandedProduct.name}</h3>
                    <p className="text-xs text-gray-500 mb-4">Hubungi kami untuk harga terbaik & ketersediaan stok</p>
                    <a
                      href={buildWhatsAppUrl(`Halo, saya ingin bertanya tentang ${expandedProduct.name}. Berapa harganya?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
                        bg-gradient-to-r from-[#25D366] to-[#20BD5A]
                        text-sm font-semibold text-white shadow-md
                        active:scale-[0.97] transition-all"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Tanya Harga
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white
                    active:scale-95 transition-all"
                  aria-label="Tutup"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
