"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";
import logoOcaou from "/public/image/logo-ocaou.svg";

export default function Footer() {
  const footerLinksRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

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

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const headerHeight = 0;

    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset;

      const offsetPosition = sectionPosition - headerHeight - 80;

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
  };

  return (
    <div className="w-full px-6 py-10 bg-sand sm:px-24">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-start  ">
        <div className="flex flex-col justify-between items-center sm:items-start">
          <Image src={logoOcaou} alt="logo O'CAOU" width={100} />
          <div className="mt-10">
            {/* <p className="text-sm">Moyens de paiement :</p> */}

            <div className="flex flex-col items-center  mt-2 sm:flex-row">
              <Image
                src="/image/paiements-icons.svg"
                alt="visa"
                width={350}
                height={40}
                className="min-h-10"
              />
              <p className="hidden sm:ml-2 sm:text-xs sm:block">
                Payez en <strong>3x sans frais</strong> <br />
                avec Klarna.
              </p>
              <p className="mt-2 text-sm sm:hidden">
                Payez en <strong>3x sans frais</strong> avec Klarna.
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-10 text-center sm:text-sm sm:text-left sm:gap-20 sm:flex-row"
          ref={footerLinksRef}
        >
          <ul className="flex flex-col gap-y-2 mt-10 sm:mt-0">
            <li className="uppercase font-bold">La marque</li>
            <li
              onClick={() => handleMenuItemClick("bags-content")}
              className="cursor-pointer underline-hover sm:w-fit"
            >
              Le sac
            </li>
            <li
              onClick={() => handleMenuItemClick("use-content")}
              className="cursor-pointer underline-hover sm:w-fit"
            >
              L'usage
            </li>
            <li
              onClick={() => handleMenuItemClick("spirit-content")}
              className="cursor-pointer underline-hover sm:w-fit"
            >
              L'esprit
            </li>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="uppercase font-bold">Acheter</li>
            <a href="https://shop.ocaou.com/produit/public">
              <li className="cursor-pointer underline-hover sm:w-fit">
                Particulier
              </li>
            </a>
            <a href="https://shop.ocaou.com/revendeur">
              <li className="cursor-pointer underline-hover sm:w-fit">
                Revendeurs
              </li>
            </a>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="uppercase font-bold">Nos services</li>
            {/* <li className="cursor-pointer underline-hover sm:w-fit">FAQ</li> */}
            <a href="https://shop.ocaou.com/livraison-tarif">
              <li className="cursor-pointer underline-hover sm:w-fit">
                Livraisons & retours
              </li>
            </a>
            {/* <li className="cursor-pointer underline-hover sm:w-fit">
              Où nous trouver ?
            </li> */}
          </ul>
          <ul className="flex flex-col gap-y-2 ">
            <li className="uppercase font-bold">Nous contacter</li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              <a href="mailto:hello@ocaou.com" target="_blank">
                Par mail
              </a>
            </li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              <a href="https://www.instagram.com/ocaou_/" target="_blank">
                Instagram
              </a>
            </li>
            <li className="cursor-pointer underline-hover sm:w-fit">
              <a
                href="https://www.facebook.com/profile.php?id=61566739830296"
                target="_blank"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full h-px bg-black my-8"></div>
      <div className="flex flex-col text-center w-full justify-between text-black text-xs sm:flex-row sm:text-left">
        <p>© 2024 O&apos;CAOU</p>
        <div className="flex flex-col gap-5 mt-4 justify-center sm:gap-2 sm:mt-0 sm:flex-row">
          <a href="https://shop.ocaou.com/cgv">
            <p className="underline uppercase">cgv</p>
          </a>

          <p className="hidden sm:block">/</p>
          <a href="https://shop.ocaou.com/mentions-legales">
            <p className="underline uppercase">mentions légales</p>
          </a>
          <p className="hidden sm:block">/</p>
          <a href="https://shop.ocaou.com/politique-confidentialite">
            <p className="underline uppercase">politique de confidentialité</p>
          </a>
        </div>
      </div>
    </div>
  );
}
