// src/components/lab/LabHero.tsx
// ============================================================
// Hero Section PREMIUM — Glassmorphism + Ambient Background
// Desktop: original hover-zoom behavior (ringan)
// Mobile: tap-to-expand lightbox + asymmetric collage pattern
// ============================================================
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Container";
import { ShieldCheck, Star, Truck, Clock, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const trustBadges = [
  { icon: Clock, label: "Buka 06.00 – 22.00", description: "Setiap hari untuk kebutuhan mendesak" },
  { icon: Star, label: "Pilihan Alat Medis Lengkap", description: "Alat kesehatan, laboratorium & jas dokter" },
  { icon: Truck, label: "Pesan & Antar ke Rumah", description: "Melayani area Kota Madiun dan sekitarnya" },
  { icon: ShieldCheck, label: "Pelayanan Cepat & Responsif", description: "Siap membantu Via WhatsApp" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ===== Collage Items =====
// Mobile (2 cols): Wide → Portrait×2 → Square×2 → Wide banner
// Desktop (4 cols): Bento layout with row-span
const collageItems = [
  { id: "hero-1", label: "Alat Lab", subtitle: "Peralatan Laboratorium Medis",
    image: "/images/jual alat lab madiun.avif",
    className: "col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto lg:h-full" },
  { id: "hero-2", label: "Jas Dokter", subtitle: "Profesional & Nyaman",
    image: "/images/jual jas dokter di madiun.avif",
    className: "col-span-1 aspect-[2/3] lg:col-span-2 lg:aspect-[16/9]" },
  { id: "hero-3", label: undefined, subtitle: undefined,
    image: "/images/baju oka di madiun.avif",
    className: "col-span-1 aspect-[2/3] lg:aspect-[4/3]" },
  { id: "hero-4", label: "Jas Lab", subtitle: "Anti Kimia & Tahan Lama",
    image: "/images/labolatorium.avif",
    className: "col-span-1 aspect-square lg:row-span-2 lg:aspect-auto lg:h-full" },
  { id: "hero-5", label: undefined, subtitle: undefined,
    image: "/images/alat lab di madiun.avif",
    className: "col-span-1 aspect-square lg:col-span-2 lg:aspect-[16/9]" },
  { id: "hero-6", label: undefined, subtitle: undefined,
    image: "/images/alat lab madiun.avif",
    className: "col-span-2 aspect-[21/9] lg:col-span-1 lg:aspect-square" },
];

// ===== Shimmer Card (Desktop: hover zoom, Mobile: tap opens lightbox) =====
const ShimmerCard = ({
  item,
  delay,
  onTap,
}: {
  item: (typeof collageItems)[0];
  delay: number;
  onTap: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    onClick={onTap}
    className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer
      active:scale-[0.97] lg:active:scale-100 transition-transform ${item.className}`}
  >
    {/* Neumorphic base (fallback background) */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-white shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]" />
    
    {/* Actual Image */}
    <Image 
      src={item.image} 
      alt={item.subtitle || item.label || "Katalog Nimas Medika"} 
      fill 
      sizes="(max-width: 1024px) 50vw, 25vw" 
      className="object-cover group-hover:scale-105 transition-transform duration-700" 
    />
    
    {/* Glass overlay on hover (desktop) */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {/* Label badge */}
    {item.label && (
      <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-10">
        <span className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-white/70 backdrop-blur-xl border border-white/40 text-slate-700 shadow-sm">
          {item.label}
        </span>
      </div>
    )}
  </motion.div>
);

export const LabHero = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Lock scroll when lightbox open
  useEffect(() => {
    if (expandedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [expandedId]);

  const expandedItem = collageItems.find((c) => c.id === expandedId);
  const closeLightbox = useCallback(() => setExpandedId(null), []);

  const handleCardTap = useCallback((id: string) => {
    setExpandedId(id);
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-32"
      aria-label="Hero layanan alat laboratorium dan jas medis Nimas Medika Madiun"
    >
      {/* ===== Ambient Background ===== */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-blue-50/30" />
        <div
          className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(78,113,255,0.12),transparent_70%)]"
          style={{ animation: "breathe 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(141,216,255,0.15),transparent_70%)]"
          style={{ animation: "breathe 10s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute top-[40%] right-[30%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.08),transparent_70%)]"
          style={{ animation: "breathe 12s ease-in-out infinite 4s" }}
        />
      </div>
      <div className="noise-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* ===== Left: Copywriting ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900 lg:text-[3.4rem] leading-[1.15]">
              Jual Alat Lab &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4E71FF] via-[#6B8CFF] to-[#8DD8FF]">
                Jas Dokter Madiun
              </span>
            </h1>

            <div className="mt-4 sm:mt-6 text-sm sm:text-lg leading-6 sm:leading-8 text-gray-600 space-y-2.5 sm:space-y-4">
              <p>
                Cari alat laboratorium Madiun, jas dokter, atau jas lab Madiun? Nimas Medika menyediakan berbagai perlengkapan laboratorium, jas dokter, dan kebutuhan medis lainnya dan bisa dicoba di tempat sesuai kebutuhan.
              </p>
              <p>
                <strong className="text-primary">Nimas Medika Alkes</strong> menyediakan{" "}
                <strong className="text-gray-900">alat laboratorium</strong>,{" "}
                <strong className="text-gray-900">jas dokter Madiun</strong>, dan{" "}
                <strong className="text-gray-900">jas lab Madiun</strong> dengan harga terjangkau dan kualitas terjamin.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.a
                href="#katalog"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 sm:px-8 sm:py-3.5
                  bg-gradient-to-r from-[#2C5BFF] via-[#4E71FF] to-[#8DD8FF]
                  font-semibold text-white text-sm sm:text-base
                  shadow-[0_0_28px_rgba(78,113,255,0.35),0_8px_20px_rgba(78,113,255,0.20)]
                  hover:shadow-[0_0_44px_rgba(141,216,255,0.50),0_12px_28px_rgba(78,113,255,0.30)]
                  transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Lihat Katalog
              </motion.a>
              <motion.a
                href={buildWhatsAppUrl("Halo, saya tertarik dengan alat laboratorium dan jas medis di Nimas Medika Madiun.")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 sm:px-8 sm:py-3.5
                  border border-white/60 bg-white/60 backdrop-blur-xl
                  font-semibold text-slate-800 text-sm sm:text-base
                  shadow-[0_8px_30px_rgb(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]
                  hover:shadow-[0_14px_40px_-10px_rgba(78,113,255,0.3)]
                  hover:border-primary/40 hover:bg-white/80
                  transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Tanya via WhatsApp
              </motion.a>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 sm:mt-10 grid grid-cols-2 gap-2 sm:gap-3"
            >
              {trustBadges.map((badge) => (
                <motion.div
                  key={badge.label}
                  variants={itemVariants}
                  className="flex items-start gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl p-3 sm:p-4
                    bg-white/50 backdrop-blur-xl border border-white/40
                    shadow-[0_4px_20px_rgb(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.7)]
                    hover:bg-white/70 hover:border-primary/20
                    transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 grid place-items-center h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:scale-110 transition-transform duration-300">
                    <badge.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">{badge.label}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 leading-tight mt-0.5">{badge.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ===== Right: Collage Grid ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -m-8 rounded-[3rem] bg-gradient-to-br from-blue-100/30 via-transparent to-violet-100/20"
              style={{ animation: "breathe 10s ease-in-out infinite 1s" }}
            />

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 max-w-md mx-auto lg:max-w-none">
              {collageItems.map((item, i) => (
                <ShimmerCard key={item.id} item={item} delay={0.1 + i * 0.08} onTap={() => handleCardTap(item.id)} />
              ))}
            </div>

            <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-3">
              Klik untuk memperbesar
            </p>
          </motion.div>
        </div>
      </Container>

      {/* ===== Lightbox ===== */}
      <AnimatePresence>
        {expandedId && expandedItem && (
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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-white shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]" />
                
                {/* Image */}
                <Image 
                  src={expandedItem.image} 
                  alt={expandedItem.subtitle || expandedItem.label || "Katalog Nimas Medika"} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                  className="object-cover" 
                />

                {/* Info overlay */}
                <div className="absolute bottom-0 inset-x-0 z-10 p-6 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                  {expandedItem.label && (
                    <h3 className="text-2xl font-bold text-white mb-1">{expandedItem.label}</h3>
                  )}
                  {expandedItem.subtitle && (
                    <p className="text-sm text-white/70">{expandedItem.subtitle}</p>
                  )}
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
