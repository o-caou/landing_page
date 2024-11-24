"use client";

import { useState } from "react";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  const closeBanner = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-black text-white py-4 relative px-6 sm:px-24 flex justify-between items-center">
      <p className="text-sm text-left sm:text-center sm:flex-1 sm:text-base">
        <span className="mr-2">🎉</span>
        <span className="font-bold">
          Black Friday : <span className="text-gold">-20%</span>
        </span>{" "}
        sur toute la boutique du 29 novembre au 1er décembre avec le code promo
        <span className="font-bold text-gold"> OCAOU20</span>
        <span className="ml-2">🎉</span>
      </p>
      <button onClick={closeBanner} className="text-white text-2xl">
        &times;
      </button>
    </div>
  );
}
