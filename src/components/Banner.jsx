"use client";

import { useState } from "react";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  const closeBanner = () => {
    setIsVisible(false);
    // if (onClose) {
    //   onClose();
    // }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-black text-white py-4 relative px-6 sm:px-24 flex justify-between items-center">
      <p className="text-sm text-left sm:text-center sm:flex-1 sm:text-base">
        <span className="mr-2">🎉</span>
        <span className="font-bold">
          C’est l’heure des soldes chez O’CAOU !
        </span>
        ✨ Profitez de{" "}
        <span className="text-gold font-bold">réductions exclusives</span> sur
        nos sacs à dos organiseur ! 🎒 <br />
        {/* Les stocks sont limités... alors vite, attrapez votre coup de cœur avant
        qu’il ne s’envole ! 🎈 */}
      </p>
      <button onClick={closeBanner} className="text-white text-2xl">
        &times;
      </button>
    </div>
  );
}
