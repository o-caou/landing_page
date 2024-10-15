"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [hasRejected, setHasRejected] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setHasConsented(true);
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "false");
    setHasRejected(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 flex flex-col md:flex-row justify-between items-center z-30">
      <div className="flex items-center">
        <p className="mb-2 md:mb-0">
          Nous utilisons des cookies pour améliorer votre expérience sur notre
          boutique.
        </p>
        <Link href="/privacy-policy" className="underline text-white px-4 py-2">
          En savoir plus
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="bg-sand text-white px-4 py-2 rounded "
        >
          Accepter
        </button>
        <button
          onClick={handleReject}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
