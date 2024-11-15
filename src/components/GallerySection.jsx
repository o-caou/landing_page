import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";

function GallerySection({ gallery }) {
  const getColSpanClass = (index) => {
    if (index >= gallery.images.length - 3) {
      return "col-span-3";
    } else if (index >= 6 && index <= 13) {
      return "col-span-3";
    } else if (index >= 17 && index <= 18) {
      return "col-span-6";
    } else {
      return "col-span-4";
    }
  };

  return (
    <div className="use-content mx-6 mb-16 sm:mx-24 sm:mb-24">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-6xl font-extrabold sm:text-8xl">L’usage</p>
        <p className="mt-5 uppercase">
          Un sac indispensable pour chaque moment de la journée.
        </p>
      </div>

      <div className="grid gap-2 grid-cols-12 sm:gap-4">
        {gallery.images
          .concat("/image/usage/video_parc.mp4")
          .map((item, index) => {
            const colSpanClass = getColSpanClass(index);
            const isVideo = item.endsWith(".mp4");

            return (
              <div
                key={index}
                className={`relative bg-lin h-32 sm:h-80 rounded-lg ${colSpanClass} transition-transform duration-300 hover:scale-95`}
              >
                {isVideo ? (
                  <video
                    src={item}
                    controls
                    className="w-full h-full rounded-lg"
                  ></video>
                ) : (
                  <Zoom zoomImg={{ src: item, alt: `Zoom image ${index + 1}` }}>
                    <Image
                      src={item}
                      alt={`img${index + 1}`}
                      fill
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                    />
                  </Zoom>
                )}
                {index < gallery.textOverlay.length && !isVideo && (
                  <div className="absolute m-2 bottom-0 bg-sand text-black py-1 px-2 rounded text-xs sm:m-0 sm:bottom-2 sm:left-2 sm:uppercase sm:text-base">
                    {gallery.textOverlay[index]}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default GallerySection;
