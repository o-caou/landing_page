"use client";

// Images
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import logoOcaou from "/public/image/logo-ocaou.svg";

export default function Footer() {
  const footerLinksRef = useRef(null);

  useEffect(() => {
    if (footerLinksRef.current) {
      const footerLinks =
        footerLinksRef.current.querySelectorAll(".underline-hover");

      footerLinks.forEach((link) => {
        link.style.position = "relative";
        link.style.paddingBottom = "2px";

        link.addEventListener("mouseenter", () => {
          gsap.set(link, {
            backgroundImage: "linear-gradient(to right, #111111, #111111)",
            backgroundPosition: "0% 100%",
            backgroundSize: "0% 1px",
            backgroundRepeat: "no-repeat",
          });
          gsap.to(link, { backgroundSize: "100% 1px", duration: 0.3 });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            backgroundSize: "0% 1px",
            duration: 0.3,
          });
        });
      });
    }
  }, []);

  return (
    <div className="w-full px-6 py-10 bg-sand sm:px-24">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-start">
        <Image src={logoOcaou} alt="logo O'CAOU" width={100} />

        <div
          className="flex flex-col gap-10 text-sm text-center sm:text-left sm:gap-20 sm:flex-row"
          ref={footerLinksRef}
        >
          <ul className="flex flex-col gap-y-2 mt-10">
            <li className="uppercase font-bold">La marque</li>
            <li className="cursor-pointer underline-hover sm:w-fit">Le sac</li>
            <li className="cursor-pointer underline-hover sm:w-fit">L'usage</li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              L'esprit
            </li>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="uppercase font-bold">Acheter</li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              Particulier
            </li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              Revendeur
            </li>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="uppercase font-bold">Nos services</li>
            <li className="cursor-pointer underline-hover sm:w-fit">FAQ</li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              Livraisons & retours
            </li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              Où nous trouver ?
            </li>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="uppercase font-bold">Nous contacter</li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              Par mail
            </li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              Instagram
            </li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              Facebook
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full h-px bg-black my-8"></div>
      <div className="flex flex-col text-center w-full justify-between text-black text-xs sm:flex-row sm:text-left">
        <p>© 2024 O&apos;CAOU</p>
        <div className="flex gap-2 justify-center">
          <p className="underline uppercase">cgv</p>
          <p>/</p>
          <p className="underline uppercase">mentions légales</p>
          <p>/</p>
          <p className="underline uppercase">cookies</p>
        </div>
      </div>
    </div>
  );
}
