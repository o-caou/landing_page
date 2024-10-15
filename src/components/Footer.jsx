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
        link.style.paddingBottom = "5px";

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
      <div className="flex justify-between items-start">
        <Image src={logoOcaou} alt="logo O'CAOU" width={100} />

        <div className="flex gap-20 text-sm" ref={footerLinksRef}>
          <ul className="flex flex-col gap-y-2">
            <li className="uppercase font-bold">La marque</li>
            <li className="cursor-pointer underline-hover w-fit">Le sac</li>
            <li className="cursor-pointer underline-hover w-fit">L'usage</li>
            <li className="cursor-pointer underline-hover w-fit">L'esprit</li>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="uppercase font-bold">Acheter</li>
            <li className="cursor-pointer underline-hover w-fit">
              Particulier
            </li>
            <li className="cursor-pointer underline-hover w-fit">Revendeur</li>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="uppercase font-bold">Nos services</li>
            <li className="cursor-pointer underline-hover w-fit">FAQ</li>
            <li className="cursor-pointer underline-hover w-fit">
              Livraisons & retours
            </li>
            <li className="cursor-pointer underline-hover w-fit">
              Où nous trouver ?
            </li>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="uppercase font-bold">Nous contacter</li>
            <li className="cursor-pointer underline-hover w-fit">Par mail</li>
            <li className="cursor-pointer underline-hover w-fit">Instagram</li>
            <li className="cursor-pointer underline-hover w-fit">Facebook</li>
          </ul>
        </div>
      </div>

      <div className="w-full h-px bg-black my-8"></div>
      <div className="flex w-full justify-between text-black text-xs">
        <p>© 2024 O&apos;CAOU</p>
        <div className="flex gap-2">
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
