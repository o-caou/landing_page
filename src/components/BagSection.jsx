import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import gsap from "gsap";

// Data
import { bags } from "../../data/bags";

// Images
import blackArrowGallery from "/public/image/black-arrow-gallery.svg";
import whiteArrowGallery from "/public/image/white-arrow-gallery.svg";

export default function BagSection() {
  const [currentBag, setCurrentBag] = useState(0);
  const bag = bags[currentBag];
  const [selectedImage, setSelectedImage] = useState(bag.gallery[0].normal);
  const [isOpen, setIsOpen] = useState({
    features: false,
    dimensions: false,
    composition: false,
    maintenance: false,
  });

  // Refs pour desktop
  const dimensionsRefDesktop = useRef(null);
  const compositionRefDesktop = useRef(null);
  const maintenanceRefDesktop = useRef(null);

  // Refs pour mobile
  const featuresRefMobile = useRef(null);
  const dimensionsRefMobile = useRef(null);
  const compositionRefMobile = useRef(null);
  const maintenanceRefMobile = useRef(null);
  const galleryImageRef = useRef(null);
  const rightBackgroundRef = useRef(null);
  const bagContainerRef = useRef(null);
  const animationsRef = useRef({});

  // Fonctions pour gérer l'ouverture et la fermeture des sections
  const toggleSection = (section) => {
    const animation = animationsRef.current[`desktop_${section}`];
    animation.reversed(!animation.reversed());

    setIsOpen((prevIsOpen) => {
      const newIsOpen = { ...prevIsOpen };
      newIsOpen[section] = !prevIsOpen[section];

      // Fermer les autres sections
      Object.keys(prevIsOpen).forEach((key) => {
        if (key !== section && prevIsOpen[key]) {
          const otherAnimation = animationsRef.current[`desktop_${key}`];
          otherAnimation.reverse();
          newIsOpen[key] = false;
        }
      });

      return newIsOpen;
    });
  };

  const toggleSectionMobile = (section) => {
    const animation = animationsRef.current[`mobile_${section}`];
    animation.reversed(!animation.reversed());

    setIsOpen((prevIsOpen) => {
      const newIsOpen = { ...prevIsOpen };
      newIsOpen[section] = !prevIsOpen[section];

      if (section !== "features") {
        newIsOpen.features = true;
      }

      return newIsOpen;
    });
  };

  // Navigation entre les sacs
  const prevBag = () => {
    setCurrentBag((prevIndex) =>
      prevIndex === 0 ? bags.length - 1 : prevIndex - 1
    );
  };

  const nextBag = () => {
    setCurrentBag((prevIndex) =>
      prevIndex === bags.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Gestion du clic sur un sac
  const handleBagClick = (index) => {
    if (currentBag !== index) {
      setCurrentBag(index);
    }
  };

  // Gestion du clic sur une image de la galerie
  const handleGalleryClick = (picture) => {
    setSelectedImage(picture.normal);
  };

  // Animation lors du changement de sac
  useEffect(() => {
    if (rightBackgroundRef.current) {
      gsap.fromTo(
        rightBackgroundRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4 }
      );
    }
  }, [currentBag]);

  // Animation lors du changement d'image sélectionnée
  useEffect(() => {
    if (galleryImageRef.current && selectedImage && window.innerWidth >= 640) {
      gsap.fromTo(
        galleryImageRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );
    }
  }, [selectedImage]);

  // Initialisation des animations des sections
  useEffect(() => {
    const refsDesktop = {
      dimensions: dimensionsRefDesktop.current,
      composition: compositionRefDesktop.current,
      maintenance: maintenanceRefDesktop.current,
    };

    const refsMobile = {
      features: featuresRefMobile.current,
      dimensions: dimensionsRefMobile.current,
      composition: compositionRefMobile.current,
      maintenance: maintenanceRefMobile.current,
    };

    // Initialiser les animations pour desktop
    Object.keys(refsDesktop).forEach((section) => {
      const content = refsDesktop[section];
      if (content) {
        gsap.set(content, { height: "auto", overflow: "hidden" });

        const animation = gsap
          .from(content, {
            height: 0,
            duration: 0.5,
            ease: "power1.inOut",
          })
          .reverse();

        animationsRef.current[`desktop_${section}`] = animation;
      }
    });

    // Initialiser les animations pour mobile
    Object.keys(refsMobile).forEach((section) => {
      const content = refsMobile[section];
      if (content) {
        gsap.set(content, { height: "auto", overflow: "hidden" });

        const animation = gsap
          .from(content, {
            height: 0,
            duration: 0.5,
            ease: "power1.inOut",
          })
          .reverse();

        animationsRef.current[`mobile_${section}`] = animation;
      }
    });
  }, []);

  // Mise à jour de l'image sélectionnée lors du changement de sac
  useEffect(() => {
    setSelectedImage(bag.gallery[0].normal);
  }, [currentBag]);

  return (
    <div className="pb-10 sm:pb-14 relative">
      <div className="text mx-8 mt-10 sm:hidden">
        <p className="text-6xl font-extrabold text-center">Le Sac</p>
        <p className="mt-2 uppercase text-center text-xs sm:text-base">
          Un sac à dos malin pour avoir tout sous la main, juste O’CAOU...
        </p>
      </div>

      <div className="relative sm:mx-24 z-10">
        <div className="flex items-center justify-center gap-4 pt-8 sm:justify-start sm:gap-6 sm:pt-24 sm:block-inline">
          {bags.map((bagItem, index) => (
            <div
              key={bagItem.id}
              onClick={() => handleBagClick(index)}
              className={`bags-content cursor-pointer ${
                currentBag === index ? "translate-y-[-12px]" : ""
              } ${
                currentBag !== index ? "opacity-50" : ""
              } transition-transform duration-200`}
            >
              <div className="relative cursor-pointer">
                <Image
                  src={bagItem.icon}
                  alt={bagItem.name}
                  width={80}
                  height={80}
                  className="w-14 sm:w-20 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="bag-container flex flex-col-reverse items-center sm:flex-row sm:items-start "
          ref={bagContainerRef}
        >
          <div className="px-6 w-full sm:px-0 sm:w-3/6 ">
            <div className="hidden my-5 sm:block">
              <div className="flex items-end">
                <p className="text-7xl font-extrabold">Le Sac</p>
                <p className="ml-5 text-4xl font-extrabold text-sand">
                  79 € <span className="text-sm align-super">TTC</span>
                </p>
              </div>

              <p className="mt-4 uppercase text-base">
                Un sac à dos malin pour avoir tout sous la main, juste O’CAOU...
              </p>
            </div>
            {/* Desktop Accordion */}
            <div className="hidden w-full sm:flex">
              <div className="left-desktop flex flex-col mr-10">
                {bag.features.map((feature, index) => (
                  <div
                    className="flex items-center gap-4 mt-4"
                    key={index + feature.name}
                  >
                    <Image
                      src={feature.icon}
                      alt={feature.name}
                      width={40}
                      height={40}
                    />
                    <p className="text-sm">{feature.name}</p>
                  </div>
                ))}
              </div>

              <div className="right-desktop ">
                <div className="flex items-center gap-4 mt-4">
                  <p className="uppercase font-extrabold text-sm">
                    couleur(s) :
                  </p>
                  <div className="flex items-center gap-4 justify-start">
                    {bag.colors.map((color, index) => (
                      <div
                        key={index}
                        className="h-9 w-9 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div
                  className="my-5 cursor-pointer"
                  onClick={() => toggleSection("dimensions")}
                >
                  <div className="flex justify-between w-full items-center">
                    <p className="uppercase font-extrabold text-sm mr-10">
                      dimensions (en cm)
                    </p>
                    <p>{isOpen.dimensions ? "-" : "+"}</p>
                  </div>
                  <div ref={dimensionsRefDesktop} className="overflow-hidden">
                    <div className="relative mt-2 text-sm w-full">
                      <p>
                        Dimensions fermées:
                        <br /> {bag.dimensions.close}
                      </p>
                      <p>
                        Dimensions ouvertes:
                        <br /> {bag.dimensions.open}
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-black w-full my-4"></div>
                </div>

                <div
                  className="my-5 cursor-pointer"
                  onClick={() => toggleSection("composition")}
                >
                  <div className="flex justify-between items-center">
                    <p className="uppercase font-extrabold text-sm">
                      composition textile
                    </p>
                    <p>{isOpen.composition ? "-" : "+"}</p>
                  </div>
                  <div ref={compositionRefDesktop} className="overflow-hidden">
                    <div className="mt-3 text-sm">
                      <p>Extérieur: {bag.textileComposition.exterieur}</p>
                      <p>Intérieur: {bag.textileComposition.interieur}</p>
                      <p>Filet: {bag.textileComposition.filet}</p>
                    </div>
                  </div>
                  <div className="h-px bg-black w-full my-2"></div>
                </div>

                <div
                  className="my-5 cursor-pointer"
                  onClick={() => toggleSection("maintenance")}
                >
                  <div className="flex justify-between items-center">
                    <p className="uppercase font-extrabold text-sm">
                      entretien
                    </p>
                    <p>{isOpen.maintenance ? "-" : "+"}</p>
                  </div>
                  <div ref={maintenanceRefDesktop} className="overflow-hidden">
                    <div className="mt-3 text-sm">
                      <p>{bag.careInstructions.laver}</p>
                      <p>{bag.careInstructions.tremper}</p>
                      <p>{bag.careInstructions.essorer}</p>
                      <p>{bag.careInstructions.remodeler}</p>
                      <p>{bag.careInstructions.plat}</p>
                      <p>{bag.careInstructions.sechage}</p>
                      <p>{bag.careInstructions.repasser}</p>
                      <p>{bag.careInstructions.blanchiment}</p>
                      <Image
                        src={bag.careInstructions.icons}
                        alt={"icons care instructions"}
                        width={140}
                        height={44}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="h-px bg-black w-full my-2"></div>
                </div>
              </div>
            </div>

            {/* Mobile Accordion */}
            <div
              className="flex justify-between items-center cursor-pointer w-full mt-8 sm:hidden"
              onClick={() => toggleSectionMobile("features")}
            >
              <p className="uppercase font-bold ">Détails du produit</p>
              <p>{isOpen.features ? "-" : "+"}</p>
            </div>
            <div ref={featuresRefMobile} className="overflow-hidden">
              <div className="details-product-mobile">
                {bag.features.map((feature, index) => (
                  <div
                    className="flex items-center gap-4 mb-5 mt-4"
                    key={index + feature.name}
                  >
                    <Image
                      src={feature.icon}
                      alt={feature.name}
                      width={44}
                      height={44}
                    />
                    <p className="text-sm sm:text-base">{feature.name}</p>
                  </div>
                ))}
                <div className="right">
                  <div className="flex items-center gap-4 my-5">
                    <p className="uppercase font-bold">couleurs :</p>
                    <div className="flex items-center gap-4">
                      {bag.colors.map((color, index) => (
                        <div
                          key={index}
                          className="h-9 w-9 rounded-full"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="mb-5 cursor-pointer"
                    onClick={() => toggleSectionMobile("dimensions")}
                  >
                    <div className="flex justify-between">
                      <p className="uppercase font-bold">dimensions (en cm)</p>
                      <p>{isOpen.dimensions ? "-" : "+"}</p>
                    </div>
                    <div ref={dimensionsRefMobile} className="overflow-hidden">
                      <div className="relative my-3 text-sm w-full">
                        <p>
                          Dimensions fermées:
                          <br /> {bag.dimensions.close}
                        </p>
                        <p>
                          Dimensions ouvertes:
                          <br /> {bag.dimensions.open}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mb-5 cursor-pointer"
                    onClick={() => toggleSectionMobile("composition")}
                  >
                    <div className="flex justify-between">
                      <p className="uppercase font-bold">composition textile</p>
                      <p>{isOpen.composition ? "-" : "+"}</p>
                    </div>
                    <div ref={compositionRefMobile} className="overflow-hidden">
                      <div className="my-3 text-sm">
                        <p>Extérieur: {bag.textileComposition.exterieur}</p>
                        <p>Intérieur: {bag.textileComposition.interieur}</p>
                        <p>Filet: {bag.textileComposition.filet}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mb-5 cursor-pointer"
                    onClick={() => toggleSectionMobile("maintenance")}
                  >
                    <div className="flex justify-between">
                      <p className="uppercase font-bold">entretien</p>
                      <p>{isOpen.maintenance ? "-" : "+"}</p>
                    </div>
                    <div ref={maintenanceRefMobile} className="overflow-hidden">
                      <div className="my-3 text-sm">
                        <p>{bag.careInstructions.laver}</p>
                        <p>{bag.careInstructions.tremper}</p>
                        <p>{bag.careInstructions.essorer}</p>
                        <p>{bag.careInstructions.remodeler}</p>
                        <p>{bag.careInstructions.plat}</p>
                        <p>{bag.careInstructions.sechage}</p>
                        <p>{bag.careInstructions.repasser}</p>
                        <p>{bag.careInstructions.blanchiment}</p>
                        <Image
                          src={bag.careInstructions.icons}
                          alt={"icons care instructions"}
                          width={140}
                          height={44}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 relative sm:translate-x-20 sm:px-20 sm:w-3/6 sm:mt-0">
            <Zoom
              zoomImg={{
                src: bag.zoomImageUrl,
                alt: "zoomed bag image",
              }}
            >
              <div className="relative" ref={galleryImageRef}>
                <img
                  src={selectedImage}
                  alt="selected bag image"
                  className="sm:rounded-lg cursor-pointer"
                />
                <div className="absolute top-0 left-0 h-7 w-7 sm:h-10 sm:w-10 z-10 bg-gold sm:rounded-tl-lg flex justify-center items-center cursor-pointer">
                  <Image
                    src="/image/icon-zoom.svg"
                    alt="icon zoom"
                    width={24}
                    height={24}
                    className=" h-5 w-5 sm:h-7 sm:w-7"
                  />
                </div>
              </div>
            </Zoom>

            <div className="absolute top-1/2 left-0 inline-block px-6 sm:hidden">
              <Image
                src={blackArrowGallery}
                alt="white arrow left"
                width={20}
                className="w-9 h-9 cursor-pointer rounded-full p-3 bg-gold rotate-180"
                onClick={() => {
                  const currentIndex = bag.gallery.findIndex(
                    (image) => image.normal === selectedImage
                  );
                  const prevIndex =
                    (currentIndex - 1 + bag.gallery.length) %
                    bag.gallery.length;
                  handleGalleryClick(bag.gallery[prevIndex]);
                }}
              />
            </div>
            <div className="absolute top-1/2 right-0 inline-block px-6 sm:hidden">
              <Image
                src={blackArrowGallery}
                alt="white arrow right"
                width={20}
                className="w-9 h-9 cursor-pointer rounded-full p-3  bg-gold"
                onClick={() => {
                  const currentIndex = bag.gallery.findIndex(
                    (image) => image.normal === selectedImage
                  );
                  const nextIndex = (currentIndex + 1) % bag.gallery.length;
                  handleGalleryClick(bag.gallery[nextIndex]);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ml-8 flex justify-between items-end sm:ml-24 sm:mt-10">
        <div className="w-2/3 hidden sm:flex sm:flex-wrap sm:gap-4 ">
          {bag.gallery.map((picture, index) => (
            <div
              key={index}
              className={`h-16 w-16 rounded-lg bg-lin cursor-pointer flex justify-center items-center transform transition-transform duration-200 ${
                selectedImage === picture.normal ? "scale-105" : ""
              } hover:scale-105`}
              onClick={() => handleGalleryClick(picture)}
              style={{
                backgroundColor:
                  selectedImage === picture.normal ? bag.hex : "",
              }}
            >
              <Image
                src={picture.normal}
                alt={`gallery image ${index}`}
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
                className="w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className=" w-1/3 hidden  h-16 bg-gold text-lin rounded-l-lg pl-8 pr-44 text-lg z-20 sm:inline-flex sm:items-center sm:w-72 sm:pl-6">
          <Image
            src={whiteArrowGallery}
            alt="white arrow"
            width={16}
            className="rotate-180 cursor-pointer sm:mr-3"
            onClick={prevBag}
          />
          <Image
            src={whiteArrowGallery}
            alt="white arrow"
            width={16}
            className="mr-10 cursor-pointer sm:mr-5"
            onClick={nextBag}
          />
          <p className="">{`${currentBag + 1}/${bags.length}`}</p>
        </div>
      </div>

      <div
        ref={rightBackgroundRef}
        className="hidden w-1/4 absolute right-0 top-0 h-full z-0 sm:block bg-no-repeat bg-cover"
        style={{
          backgroundColor: bag.hex,
        }}
      ></div>
    </div>
  );
}
