"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// Images
import logoOcaou from "/public/image/logo-ocaou.svg";
import iconCart from "/public/image/icon-cart-2.svg";
import iconAccount from "/public/image/icon-account.svg";

// Packages
import gsap from "gsap";

export default function Menu() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const menuLinksRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (menuLinksRef.current) {
      const links = menuLinksRef.current.querySelectorAll(".underline-hover");

      links.forEach((link) => {
        link.style.position = "relative";
        link.style.paddingBottom = "2px";

        link.addEventListener("mouseenter", () => {
          gsap.set(link, {
            backgroundImage: "linear-gradient(to right, #d7ac05, #d7ac05)",
            backgroundPosition: "0% 100%",
            backgroundSize: "0% 2px",
            backgroundRepeat: "no-repeat",
          });
          gsap.to(link, { backgroundSize: "100% 2px", duration: 0.3 });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            backgroundSize: "0% 2px",
            duration: 0.3,
          });
        });
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    gsap.to(menuRef.current, {
      x: menuOpen ? 0 : "100%",
      duration: 0.1,
      ease: "expo.inOut",
    });
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;

    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset;

      const offsetPosition = sectionPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleMenuItemClick = (id) => {
    if (pathname === "/") {
      scrollToSection(id);
    } else {
      router.push("/#" + id);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <div className="hidden sm:h-5 sm:w-full sm:bg-lin"></div>
      <div
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isScrolled ? "bg-white border-b border-slate-200" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 sm:py-5 sm:px-24">
          <Link href="/">
            <Image
              src={logoOcaou}
              alt="logo O'CAOU"
              width={135}
              className="cursor-pointer"
            />
          </Link>

          <ul
            ref={menuLinksRef}
            className="hidden sm:flex sm:items-center sm:text-base sm:gap-10"
          >
            <li
              onClick={() => handleMenuItemClick("bags-content")}
              className="cursor-pointer underline-hover"
            >
              Le Sac
            </li>
            <li
              onClick={() => handleMenuItemClick("use-content")}
              className="cursor-pointer underline-hover"
            >
              L’Usage
            </li>
            <li
              onClick={() => handleMenuItemClick("spirit-content")}
              className="cursor-pointer underline-hover"
            >
              L’Esprit
            </li>
            <li className="cursor-pointer underline-hover">
              <a href="mailto:hello@ocaou.com">Contact</a>
            </li>

            {/* <div className="flex sm:gap-5">
              <li className="bg-gold text-white rounded-lg py-2 px-6 cursor-pointer transition-transform transform hover:scale-95">
                <a target="_blank" href="">
                  Acheter
                </a>
              </li>
              <li className="bg-sand text-white rounded-lg py-2 px-6 cursor-pointer transition-transform transform hover:scale-95">
                <a target="_blank" href="">
                  Revendeur
                </a>
              </li>
              <li className="w-11 h-11 flex justify-center items-center rounded-full border border-black p-2 cursor-pointer transition-transform transform hover:scale-95">
                <Image
                  src={iconAccount}
                  alt="Créer un compte"
                  width={16}
                  height={16}
                />
              </li>
              <li className="w-11 h-11 flex justify-center items-center rounded-full border border-black p-2 cursor-pointer transition-transform transform hover:scale-95">
                <Image
                  src={iconCart}
                  alt="Voir mon panier"
                  width={25}
                  height={25}
                />
              </li>
            </div> */}
          </ul>

          <div
            id="hamburger"
            onClick={toggleMenu}
            className="sm:hidden cursor-pointer relative z-50 flex items-center"
          >
            <div className="rounded-full border border-black p-1 cursor-pointer transition-transform transform hover:scale-95">
              <Image src={iconCart} alt="icon panier" width={25} height={25} />
            </div>
            <div className="flex justify-center items-center rounded-full border border-black p-2 ml-2 cursor-pointer transition-transform transform hover:scale-95">
              <Image
                src={iconAccount}
                alt="Créer un compte"
                width={16}
                height={16}
              />
            </div>
            <div className="ml-4">
              <span
                className={`block h-1 w-10 bg-black mb-1 transition-transform duration-200 ease-in-out ${
                  menuOpen ? "transform rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-1 w-10 bg-black mb-1 transition-opacity duration-200 ease-in-out ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-1 w-10 bg-black transition-transform duration-200 ease-in-out ${
                  menuOpen ? "transform -rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={menuRef}
        className={`fixed top-0 right-0 w-full h-full bg-sand transform translate-x-full transition-transform duration-500 ease-in-out z-40`}
      >
        <ul className="flex flex-col items-center px-6 h-screen justify-center space-y-7 text-white text-3xl uppercase font-bold">
          <li
            onClick={() => handleMenuItemClick("bags-content")}
            className="cursor-pointer underline-hover"
          >
            Le Sac
          </li>
          <li
            onClick={() => handleMenuItemClick("use-content")}
            className="cursor-pointer underline-hover"
          >
            L’Usage
          </li>
          <li
            onClick={() => handleMenuItemClick("spirit-content")}
            className="cursor-pointer underline-hover"
          >
            L’Esprit
          </li>
          <li className="cursor-pointer underline-hover">
            <a target="_blank" href="">
              Acheter
            </a>
          </li>
          <li className="cursor-pointer underline-hover">
            <a target="_blank" href="">
              Revendeur
            </a>
          </li>
          <li className="cursor-pointer underline-hover">
            <a href="mailto:hello@ocaou.com">Contact</a>
          </li>
        </ul>
      </div>
    </>
  );
}
