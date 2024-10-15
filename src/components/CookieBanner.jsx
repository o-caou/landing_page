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
    <div className="fixed bottom-0 left-0 w-full bg-black text-white flex flex-col justify-between items-center z-30 p-6 sm:p-4 sm:flex-row ">
      <div className="sm:flex sm:items-center">
        <p className="mb-2 text-center sm:mb-0 sm:text-left">
          Nous utilisons des cookies pour améliorer votre expérience sur notre
          boutique.
        </p>
        <Link href="/privacy-policy" className="sm:px-4 sm:py-2">
          <p className="underline text-white  text-center sm:text-left">
            En savoir plus
          </p>
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
