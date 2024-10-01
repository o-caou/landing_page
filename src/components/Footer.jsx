// Images
import Image from "next/image";
import logoOcaou from "/public/image/logo-ocaou.svg";

export default function Footer() {
  return (
    <div className="w-full px-6 py-10 bg-sand sm:px-24">
      <Image
        src={logoOcaou}
        alt="logo O'CAOU"
        width={200}
        className="m-auto mb-10"
      />
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col items-center text-center sm:flex-row sm:justify-between sm:gap-20">
          <div className="flex flex-col items-center">
            <p className="uppercase">...Vous voulez acheter</p>
            <p className="underline">Notre shop en ligne</p>
          </div>

          {/* <div className="mt-5 flex flex-col items-center sm:mt-0">
          <p className="uppercase">...Vous voulez nous accompagner</p>
          <p className="underline">Je veux devenir revendeur</p>
        </div> */}

          <div className="mt-7 flex flex-col items-center sm:mt-0">
            <p className="uppercase">...Vous voulez nous contacter</p>
            <p className="underline cursor-pointer">
              <a href="mailto:hello@ocaou.com">hello@ocaou.com</a>
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center sm:mt-0">
            <p className="uppercase">...Vous voulez nous suivre</p>
            <div className="flex gap-2">
              <a
                href="https://www.instagram.com/ocaou_"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform duration-200 hover:scale-105"
              >
                <Image
                  src={"/image/icon-instagram.svg"}
                  alt="Instagram account O'CAOU"
                  width={30}
                  height={30}
                />
              </a>
              {/* <Image
              src={"/image/icon-linkedin.svg"}
              alt="icon linkedin ocaou"
              width={30}
              height={30}
            /> */}
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-lin my-8"></div>
        <div className="flex w-full justify-between text-lin">
          <p>©2024 O&apos;CAOU</p>
          <p>
            <span className="underline">CGV</span> /
            <span className="underline">MENTIONS LÉGALES</span>
          </p>
        </div>
      </div>
    </div>
  );
}
