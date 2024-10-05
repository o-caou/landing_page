import { useState, useEffect } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import gsap from "gsap";

// Data
import { storages } from "../../data/storages";

// Images
import blackArrowGallery from "/public/image/black-arrow-gallery.svg";

export default function StorageSection() {
  // État pour la sélection des boutons
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0);

  // État pour le contenu actuellement affiché
  const [currentStorageIndex, setCurrentStorageIndex] = useState(0);
  const [currentStorageImageIndex, setCurrentStorageImageIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fonction pour naviguer entre les images du stockage
  const nextStorageImage = () => {
    setCurrentStorageImageIndex(
      (prevIndex) =>
        (prevIndex + 1) % storages[currentStorageIndex].images.length
    );
  };

  const prevStorageImage = () => {
    setCurrentStorageImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + storages[currentStorageIndex].images.length) %
        storages[currentStorageIndex].images.length
    );
  };

  // Gestion du clic sur un stockage
  const handleStorageClick = (index) => {
    if (selectedStorageIndex === index) return;
    setSelectedStorageIndex(index);
    setIsDropdownOpen(false);
  };

  // Effet pour animer le changement de contenu lorsque selectedStorageIndex change
  useEffect(() => {
    if (selectedStorageIndex !== currentStorageIndex) {
      // Animation de disparition
      gsap.to(".img1, .img2, .img3, .storage-text", {
        opacity: 0,
        y: "100%",
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => {
          // Mise à jour de l'état du contenu affiché
          setCurrentStorageIndex(selectedStorageIndex);
          setCurrentStorageImageIndex(0);

          // Animation d'apparition
          gsap.fromTo(
            ".img1, .img2, .img3, .storage-text",
            { opacity: 0, y: "-100%" },
            { opacity: 1, y: "0%", duration: 0.3, ease: "power1.out" }
          );
        },
      });
    }
  }, [selectedStorageIndex, currentStorageIndex]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Récupérer le stockage actuel basé sur currentStorageIndex
  const currentStorage = storages[currentStorageIndex];

  return (
    <div className="sm:mx-24 sm:flex sm:gap-4">
      {/* Section Principale */}
      <div className="bg-lin sm:rounded-lg sm:w-7/12 p-6 sm:p-10">
        <p className="mt-4 uppercase font-extrabold text-center sm:text-left sm:mt-0">
          Ranger, anticiper, c’est notre dada.
        </p>
        <p className="text-sm mt-4 text-center sm:text-left">
          Tout peut arriver, alors « au cas où… » on prévoit ! Laissez-vous
          guider, tout est étiqueté. Un sac ludique, pédagogique, mais surtout
          hyper pratique.
        </p>

        {/* Boutons de sélection et Image principale pour les écrans larges */}
        <div className="hidden sm:flex sm:items-center sm:gap-10 sm:mt-10">
          <div className="flex-col inline-flex">
            {storages.map((storage, index) => (
              <div
                key={storage.id}
                onClick={() => handleStorageClick(index)}
                className={`flex justify-center items-center h-14 p-4 my-2 rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 ${
                  selectedStorageIndex === index ? "bg-sand" : "bg-disabled"
                }`}
              >
                <Image
                  src={storage.btn}
                  alt={storage.name}
                  width={186}
                  height={58}
                  className={`h-14 ${
                    selectedStorageIndex === index
                      ? "opacity-100"
                      : "opacity-50"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="relative bg-white h-80 w-full rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 h-7 w-7 sm:h-10 sm:w-10 z-10 bg-gold rounded-tl-lg flex justify-center items-center cursor-pointer">
              <Image
                src="/image/icon-zoom.svg"
                alt="Icone de zoom"
                width={24}
                height={24}
                className="h-5 w-5 sm:h-7 sm:w-7"
              />
            </div>
            <Zoom zoomImg={{ src: currentStorage.images[0], alt: "Image 1" }}>
              <Image
                src={currentStorage.images[0]}
                alt="Image du stockage"
                fill
                style={{ objectFit: "cover" }}
                className="img1 rounded-t-lg sm:rounded-lg"
              />
            </Zoom>
          </div>
        </div>

        {/* Dropdown et Image principale pour les écrans mobiles */}
        <div className="relative sm:hidden mt-4">
          <div
            onClick={toggleDropdown}
            className="z-30 h-11 px-4 py-2 rounded-lg flex items-center justify-center border border-sand relative mb-6 bg-sand"
          >
            <Image
              src={storages[selectedStorageIndex].btn}
              alt={storages[selectedStorageIndex].name}
              width={186}
              height={58}
              className="h-8"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className={`h-5 w-5 text-black transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>

          {isDropdownOpen && (
            <div className="absolute flex items-center justify-center w-full bg-lin rounded-b-lg shadow-lg z-20 border border-sand -mt-11 pt-5">
              <div className="flex-col inline-flex w-full m-2 rounded-lg">
                {storages.map((storage, index) => (
                  <div
                    key={storage.id}
                    onClick={() => handleStorageClick(index)}
                    className={`w-full px-6 py-2 cursor-pointer flex items-center justify-center ${
                      selectedStorageIndex === index ? "bg-sand" : ""
                    }`}
                  >
                    <Image
                      src={storage.btn}
                      alt={storage.name}
                      width={186}
                      height={58}
                      className="h-8"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative bg-sand h-80 w-full rounded-t-lg sm:rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 h-7 w-7 z-10 bg-gold rounded-tl-lg flex justify-center items-center cursor-pointer">
              <Image
                src="/image/icon-zoom.svg"
                alt="Icone de zoom"
                width={24}
                height={24}
                className="h-5 w-5"
              />
            </div>
            <Zoom
              zoomImg={{
                src: currentStorage.images[currentStorageImageIndex],
                alt: `Image ${currentStorageImageIndex + 1}`,
              }}
            >
              <Image
                src={currentStorage.images[currentStorageImageIndex]}
                alt="Image du stockage"
                fill
                style={{ objectFit: "cover" }}
                className="img1 rounded-t-lg sm:rounded-lg"
              />
            </Zoom>
          </div>

          <div className="absolute left-3 top-1/2 mt-10 transform -translate-y-1/2 z-0">
            <button
              onClick={prevStorageImage}
              className="bg-gold p-3 rounded-full"
            >
              <Image
                src={blackArrowGallery}
                alt="Précédent"
                width={20}
                height={20}
                className="rotate-180 w-3 h-3"
              />
            </button>
          </div>

          <div className="absolute right-3 top-1/2 mt-10 transform -translate-y-1/2 z-0">
            <button
              onClick={nextStorageImage}
              className="bg-gold p-3 rounded-full shadow-lg"
            >
              <Image
                src={blackArrowGallery}
                alt="Suivant"
                width={20}
                height={20}
                className="w-3 h-3"
              />
            </button>
          </div>
        </div>

        {/* Texte pour les écrans mobiles */}
        <div className="text rounded-b-lg h-1/5 p-4 bg-sand flex items-center justify-center sm:hidden">
          <p className="text-xl uppercase font-bold text-center">
            {currentStorage.txt}
          </p>
        </div>
      </div>

      {/* Section des Images Secondaires et Texte pour les écrans larges */}
      <div className="sm:w-5/12 sm:flex sm:flex-col sm:gap-4">
        {/* Texte pour les écrans larges */}
        <div className="hidden text rounded-lg h-1/5 p-4 bg-sand sm:flex sm:items-center sm:justify-center overflow-hidden">
          <p className="storage-text text-xl uppercase font-bold text-center">
            {currentStorage.txt}
          </p>
        </div>

        {/* Première Image Secondaire */}
        <div className="relative bg-lin rounded-lg h-2/5 overflow-hidden">
          <div className="absolute top-0 left-0 h-7 w-7 z-10 bg-gold rounded-tl-lg flex justify-center items-center cursor-pointer">
            <Image
              src="/image/icon-zoom.svg"
              alt="Icone de zoom"
              width={24}
              height={24}
              className="h-5 w-5"
            />
          </div>
          <Zoom zoomImg={{ src: currentStorage.images[1], alt: "Image 2" }}>
            <Image
              src={currentStorage.images[1]}
              alt="Image 2"
              fill
              style={{ objectFit: "cover" }}
              className="img2 rounded-lg"
            />
          </Zoom>
        </div>

        {/* Deuxième Image Secondaire */}
        <div className="relative bg-lin rounded-lg h-2/5 overflow-hidden">
          <div className="absolute top-0 left-0 h-7 w-7 z-10 bg-gold rounded-tl-lg flex justify-center items-center cursor-pointer">
            <Image
              src="/image/icon-zoom.svg"
              alt="Icone de zoom"
              width={24}
              height={24}
              className="h-5 w-5"
            />
          </div>
          <Zoom zoomImg={{ src: currentStorage.images[2], alt: "Image 3" }}>
            <Image
              src={currentStorage.images[2]}
              alt="Image 3"
              fill
              style={{ objectFit: "cover" }}
              className="img3 rounded-lg"
            />
          </Zoom>
        </div>
      </div>
    </div>
  );
}
