import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Zap } from "lucide-react";

interface TornPageBreakthroughProps {
  active: boolean;
  onComplete: () => void;
}

// 4 Curated Indian Flats optimized for fast GPU texture decoding
const flatSlides = [
  {
    id: 1,
    title: "Sunlit Apartment with Balcony",
    location: "Indiranagar, Bengaluru",
    price: "₹32,000 / mo",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=75",
    tag: "SLIDE 01 · VERIFIED FLAT",
  },
  {
    id: 2,
    title: "Contemporary Metro-Side Home",
    location: "Koregaon Park, Pune",
    price: "₹28,000 / mo",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=75",
    tag: "SLIDE 02 · VERIFIED FLAT",
  },
  {
    id: 3,
    title: "High-Rise Lakeview Sanctuary",
    location: "Powai, Mumbai",
    price: "₹45,000 / mo",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=75",
    tag: "SLIDE 03 · VERIFIED FLAT",
  },
  {
    id: 4,
    title: "Aesthetic Penthouse Loft",
    location: "Hauz Khas, Delhi",
    price: "₹38,000 / mo",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=75",
    tag: "SLIDE 04 · VERIFIED FLAT",
  },
];

// 10 lightweight flying debris shards (optimized for 60-120fps)
const debrisParticles = Array.from({ length: 10 }).map((_, i) => {
  const angle = (i / 10) * 360 * (Math.PI / 180);
  const distance = 240 + (i % 3) * 60;
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    rot: (i % 2 === 0 ? 1 : -1) * (120 + i * 30),
    size: 14 + (i % 3) * 6,
    delay: 0.05 + (i % 3) * 0.04,
  };
});

export const TornPageBreakthrough: React.FC<TornPageBreakthroughProps> = ({
  active,
  onComplete,
}) => {
  const [phase, setPhase] = useState<"holding" | "charging" | "tearing" | "done">("holding");

  useEffect(() => {
    if (!active) {
      setPhase("holding");
      return;
    }

    // Fast, crisp, punchy sequence:
    // 0ms - 220ms: Flat preview
    // 220ms - 520ms: Electric seam charging
    // 520ms - 1380ms: Punchy 3D tear breakthrough (860ms duration)
    // 1450ms: Complete & clean up
    const t1 = setTimeout(() => setPhase("charging"), 220);
    const t2 = setTimeout(() => setPhase("tearing"), 520);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [active, onComplete]);

  if (!active || phase === "done") return null;

  const isTearing = phase === "tearing";
  const isCharging = phase === "charging" || isTearing;

  return (
    <div className="torn-overlay-portal">
      <div className="torn-portal-perspective">
        {/* ================= SLIDE 1: TOP-LEFT FLAT ================= */}
        <motion.div
          className="torn-sheet torn-top-left"
          style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
          initial={{ x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 }}
          animate={
            isTearing
              ? {
                  x: "-120%",
                  y: "-120%",
                  rotateX: 25,
                  rotateY: -30,
                  rotateZ: -12,
                  scale: 0.88,
                  opacity: 0,
                }
              : { x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 }
          }
          transition={{
            duration: 0.82,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="torn-slide-media">
            <img
              src={flatSlides[0].image}
              alt={flatSlides[0].title}
              className="torn-slide-img"
              loading="eager"
            />
            <div className="torn-slide-scrim torn-scrim-tl" />
          </div>

          <div className="torn-sheet-inner">
            <div className="torn-flat-pill">
              <span className="torn-flat-number">01</span>
              <span>{flatSlides[0].tag}</span>
            </div>
            <div className="torn-flat-details">
              <h4 className="torn-flat-title">{flatSlides[0].title}</h4>
              <div className="torn-flat-meta">
                <span><MapPin size={11} /> {flatSlides[0].location}</span>
                <span className="torn-flat-price">{flatSlides[0].price}</span>
              </div>
            </div>
          </div>

          <svg className="torn-edge-svg-h" viewBox="0 0 100 8" preserveAspectRatio="none">
            <path
              d="M0,0 L3,6 L7,2 L12,7 L18,1 L24,8 L30,3 L36,7 L42,1 L48,6 L55,2 L62,8 L70,3 L77,7 L84,1 L92,6 L98,2 L100,0 L100,8 L0,8 Z"
              fill="#f4f6f0"
            />
          </svg>
          <svg className="torn-edge-svg-v" viewBox="0 0 8 100" preserveAspectRatio="none">
            <path
              d="M0,0 L6,3 L2,7 L7,12 L1,18 L8,24 L3,30 L7,36 L1,42 L6,48 L2,55 L8,62 L3,70 L7,77 L1,84 L6,92 L2,98 L0,100 L8,100 L8,0 Z"
              fill="#f4f6f0"
            />
          </svg>
        </motion.div>

        {/* ================= SLIDE 2: TOP-RIGHT FLAT ================= */}
        <motion.div
          className="torn-sheet torn-top-right"
          style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
          initial={{ x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 }}
          animate={
            isTearing
              ? {
                  x: "120%",
                  y: "-120%",
                  rotateX: 25,
                  rotateY: 30,
                  rotateZ: 12,
                  scale: 0.88,
                  opacity: 0,
                }
              : { x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 }
          }
          transition={{
            duration: 0.82,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="torn-slide-media">
            <img
              src={flatSlides[1].image}
              alt={flatSlides[1].title}
              className="torn-slide-img"
              loading="eager"
            />
            <div className="torn-slide-scrim torn-scrim-tr" />
          </div>

          <div className="torn-sheet-inner">
            <div className="torn-flat-pill">
              <span className="torn-flat-number">02</span>
              <span>{flatSlides[1].tag}</span>
            </div>
            <div className="torn-flat-details">
              <h4 className="torn-flat-title">{flatSlides[1].title}</h4>
              <div className="torn-flat-meta">
                <span><MapPin size={11} /> {flatSlides[1].location}</span>
                <span className="torn-flat-price">{flatSlides[1].price}</span>
              </div>
            </div>
          </div>

          <svg className="torn-edge-svg-h" viewBox="0 0 100 8" preserveAspectRatio="none">
            <path
              d="M0,0 L4,7 L9,1 L15,8 L22,3 L29,7 L35,2 L43,8 L50,1 L58,6 L65,2 L72,8 L80,1 L88,7 L94,2 L100,0 L100,8 L0,8 Z"
              fill="#f4f6f0"
            />
          </svg>
          <svg className="torn-edge-svg-v-left" viewBox="0 0 8 100" preserveAspectRatio="none">
            <path
              d="M8,0 L2,3 L6,7 L1,12 L7,18 L0,24 L5,30 L1,36 L7,42 L2,48 L6,55 L0,62 L5,70 L1,77 L7,84 L2,92 L6,98 L8,100 L0,100 L0,0 Z"
              fill="#f4f6f0"
            />
          </svg>
        </motion.div>

        {/* ================= SLIDE 3: BOTTOM-LEFT FLAT ================= */}
        <motion.div
          className="torn-sheet torn-bottom-left"
          style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
          initial={{ x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 }}
          animate={
            isTearing
              ? {
                  x: "-120%",
                  y: "120%",
                  rotateX: -25,
                  rotateY: -30,
                  rotateZ: 10,
                  scale: 0.88,
                  opacity: 0,
                }
              : { x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 }
          }
          transition={{
            duration: 0.82,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="torn-slide-media">
            <img
              src={flatSlides[2].image}
              alt={flatSlides[2].title}
              className="torn-slide-img"
              loading="eager"
            />
            <div className="torn-slide-scrim torn-scrim-bl" />
          </div>

          <div className="torn-sheet-inner">
            <div className="torn-flat-pill">
              <span className="torn-flat-number">03</span>
              <span>{flatSlides[2].tag}</span>
            </div>
            <div className="torn-flat-details">
              <h4 className="torn-flat-title">{flatSlides[2].title}</h4>
              <div className="torn-flat-meta">
                <span><MapPin size={11} /> {flatSlides[2].location}</span>
                <span className="torn-flat-price">{flatSlides[2].price}</span>
              </div>
            </div>
          </div>

          <svg className="torn-edge-svg-h-top" viewBox="0 0 100 8" preserveAspectRatio="none">
            <path
              d="M0,8 L3,2 L8,7 L14,1 L20,6 L27,2 L34,8 L40,1 L47,7 L54,2 L61,8 L68,3 L75,7 L82,1 L89,6 L96,2 L100,8 L100,0 L0,0 Z"
              fill="#f4f6f0"
            />
          </svg>
          <svg className="torn-edge-svg-v" viewBox="0 0 8 100" preserveAspectRatio="none">
            <path
              d="M0,0 L6,4 L1,9 L7,16 L2,23 L8,31 L1,38 L7,45 L2,53 L7,61 L1,69 L8,78 L2,86 L7,93 L0,100 L8,100 L8,0 Z"
              fill="#f4f6f0"
            />
          </svg>
        </motion.div>

        {/* ================= SLIDE 4: BOTTOM-RIGHT FLAT ================= */}
        <motion.div
          className="torn-sheet torn-bottom-right"
          style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
          initial={{ x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 }}
          animate={
            isTearing
              ? {
                  x: "120%",
                  y: "120%",
                  rotateX: -25,
                  rotateY: 30,
                  rotateZ: -10,
                  scale: 0.88,
                  opacity: 0,
                }
              : { x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 }
          }
          transition={{
            duration: 0.82,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="torn-slide-media">
            <img
              src={flatSlides[3].image}
              alt={flatSlides[3].title}
              className="torn-slide-img"
              loading="eager"
            />
            <div className="torn-slide-scrim torn-scrim-br" />
          </div>

          <div className="torn-sheet-inner">
            <div className="torn-flat-pill">
              <span className="torn-flat-number">04</span>
              <span>{flatSlides[3].tag}</span>
            </div>
            <div className="torn-flat-details">
              <h4 className="torn-flat-title">{flatSlides[3].title}</h4>
              <div className="torn-flat-meta">
                <span><MapPin size={11} /> {flatSlides[3].location}</span>
                <span className="torn-flat-price">{flatSlides[3].price}</span>
              </div>
            </div>
          </div>

          <svg className="torn-edge-svg-h-top" viewBox="0 0 100 8" preserveAspectRatio="none">
            <path
              d="M0,8 L5,1 L11,7 L18,2 L26,8 L32,1 L40,7 L48,2 L55,8 L63,1 L71,7 L78,2 L86,8 L92,1 L100,8 L100,0 L0,0 Z"
              fill="#f4f6f0"
            />
          </svg>
          <svg className="torn-edge-svg-v-left" viewBox="0 0 8 100" preserveAspectRatio="none">
            <path
              d="M8,0 L1,4 L6,9 L0,16 L5,23 L0,31 L6,38 L1,45 L6,53 L1,61 L6,69 L0,78 L5,86 L1,93 L8,100 L0,100 L0,0 Z"
              fill="#f4f6f0"
            />
          </svg>
        </motion.div>

        {/* ================= CHARGING ENERGY SEAMS ================= */}
        <AnimatePresence>
          {isCharging && !isTearing && (
            <>
              <motion.div
                className="tear-energy-line-v"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: [0.6, 1, 0.9] }}
                exit={{ scaleX: 6, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <motion.div
                className="tear-energy-line-h"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0.6, 1, 0.9] }}
                exit={{ scaleY: 6, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <motion.div
                className="tear-energy-core"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.8, 1.4], rotate: 180 }}
                exit={{ scale: 6, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Zap size={28} className="tear-core-icon" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ================= SHOCKWAVE BURST & DEBRIS ================= */}
        {isTearing && (
          <>
            <motion.div
              className="tear-shockwave"
              initial={{ scale: 0.1, opacity: 1, borderWidth: 8 }}
              animate={{ scale: 2.8, opacity: 0, borderWidth: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            />

            {debrisParticles.map((d) => (
              <motion.div
                key={d.id}
                className="tear-debris-piece"
                style={{
                  width: d.size,
                  height: d.size * 0.7,
                }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  x: d.x * 1.3,
                  y: d.y * 1.3,
                  rotate: d.rot,
                  opacity: 0,
                  scale: 0.4,
                }}
                transition={{
                  duration: 0.7 + (d.id % 3) * 0.1,
                  delay: d.delay,
                  ease: [0.2, 0.8, 0.3, 1],
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
