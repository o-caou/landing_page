"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { bags } from "../../data/bags";
import { storages } from "../../data/storages";
import { gallery } from "../../data/gallery";

// Packages
import "react-medium-image-zoom/dist/styles.css";
import Lenis from "lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Images
import Image from "next/image";
import whiteArrow from "/public/image/white-arrow.svg";

// Components
import BagSection from "@/components/BagSection";
import StorageSection from "@/components/StorageSection";
import GallerySection from "@/components/GallerySection";
import Reassurance from "@/components/ReasuranceSection";
import SpiritSection from "@/components/SpiritSection";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const [bagType, setBagType] = useState(bags);
  const [currentBag, setCurrentBag] = useState(0);
  const bag = bagType[currentBag];

  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const arrowRef = useRef(null);
  const textRef = useRef(null);
  const headerRef = useRef(null);

  const pathname = usePathname();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;

    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset;

      const isMobile = window.innerWidth < 640;

      const offsetPosition =
        sectionPosition - headerHeight - (isMobile ? 190 : 80);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Animations
  useEffect(() => {
    const buttonElement = buttonRef.current;
    const arrowElement = arrowRef.current;
    const textElement = textRef.current;

    if (buttonElement && arrowElement && textElement) {
      buttonElement.addEventListener("mouseenter", () => {
        gsap.to(textElement, { x: 10, duration: 0.3, ease: "power3.out" });
        gsap.to(arrowElement, { x: 10, duration: 0.3, ease: "power3.out" });
      });

      buttonElement.addEventListener("mouseleave", () => {
        gsap.to(textElement, { x: 0, duration: 0.3, ease: "power3.out" });
        gsap.to(arrowElement, { x: 0, duration: 0.3, ease: "power3.out" });
      });
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setTimeout(() => {
          scrollToSection(hash);
        }, 100);
      }
    };

    // Gérer le défilement initial si un hash est présent
    if (window.location.hash) {
      handleHashChange();
    }

    // Écouter les changements de hash
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  return (
    <>
      <div ref={contentRef} className="border border-lin">
        <div className="bg-lin bg-cover bg-center sm:h-screen w-full bg-[url('/image/home_background_mobile.jpg')] sm:bg-[url('/image/home_background-2.jpg')]">
          <div className="flex items-center px-6 h-full text-sm sm:px-24">
            <div className="flex mt-10 flex-col items-center sm:mt-0 sm:w-6/12 sm:items-start">
              <p className="mt-96 font-extrabold text-4xl sm:text-6xl text-center sm:text-left sm:mt-0">
                Un sac intelligent
                <br />
                <span className="text-sand"> qui pense à tout.</span>
              </p>
              <p className="text-center text-base mt-6 mb-8 sm:mb-10 sm:mt-8 sm:text-left sm:w-5/6">
                Un organiseur où tout est catégorisé. Un sac à dos pour langer,
                pour l’école, ou juste se balader. Un sac pour devenir grand et
                indépendant. Un sac à dos évolutif, pensé pour durer.
              </p>
              <div
                className="inline-flex bg-gold text-lin rounded-lg py-2 px-6 text-lg cursor-pointer"
                ref={buttonRef}
                onClick={() => scrollToSection("bags-content")}
              >
                <p className="mr-4" ref={textRef}>
                  Voir le sac
                </p>
                <Image
                  src={whiteArrow}
                  alt="white arrow"
                  width={16}
                  ref={arrowRef}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:flex ">
          <div className="hidden sm:block sm:w-1/6">
            <div className="bg-intro h-1/2"></div>
            <div className="bg-white h-1/2"></div>
          </div>

          <div className="pt-16 sm:pt-0 bg-intro m-auto w-full sm:w-4/6">
            <video
              width="100%"
              height="100%"
              controls
              preload="auto"
              className="rounded-lg bg-black aspect-video"
              poster="image/intro-video-background-2.jpg"
            >
              <source src="/video/ocaou-bag-16.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="hidden sm:block sm:w-1/6">
            <div className="bg-intro h-1/2 "></div>
            <div className="h-1/2 " style={{ backgroundColor: bag.hex }}></div>
          </div>
        </div>

        <div id="bags-content">
          <BagSection bags={bags} />
        </div>

        <div
          className="hidden h-px mx-24 sm:block sm:mb-14"
          style={{ backgroundColor: bag.hex }}
        ></div>

        <StorageSection storages={storages} />

        <Reassurance />
        <div id="use-content">
          <GallerySection gallery={gallery} />
        </div>
        <div id="spirit-content">
          <SpiritSection />
        </div>
      </div>
    </>
  );
}
