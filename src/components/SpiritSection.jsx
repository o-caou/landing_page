import Image from "next/image";

function SpiritSection() {
  return (
    <div className="spirit-content relative w-full flex flex-col px-6 sm:py-14 sm:px-0 sm:flex-row">
      <div className="absolute inset-0 flex flex-col sm:flex-row">
        <div className="h-1/3 sm:h-full sm:w-1/3 bg-gold"></div>
        <div className="h-2/3 sm:h-full sm:w-2/3 bg-lin"></div>
      </div>
      <div className="relative flex flex-col sm:flex-row w-full sm:mx-24 items-center">
        <div className="ml-0 relative flex flex-col justify-center p-4 w-full order-2 sm:ml-20 sm:w-3/6">
          <p className="text-4xl sm:text-8xl font-extrabold text-center sm:text-left">
            L&rsquo;esprit
          </p>
          <div className="mb-4 mt-6 sm:mb-10 sm:mt-8 text-center sm:text-left">
            <p>
              Maman de trois enfants, ranger, anticiper, c’est mon dada ! Lors
              d'un stage de rugby, une éducatrice a dit à mon fils en voyant son
              énorme valise : "Ta maman, c’est comme la mienne, elle est « au
              cas où… »".
            </p>
            <p className="mt-4">
              Oui, je suis O’CAOU, car on ne sait jamais ! Je le dis au moins
              dix fois par jour. Ma devise, c’est : « tout peut arriver », alors
              O’CAOU, je prévois.
            </p>

            <p className="mt-4">
              Avec mon petit sac à dos malin, vous aurez toujours tout sous la
              main. Conçu pour vous aider à ne rien oublier, tout est étiqueté,
              bien rangé, zippé, ligoté, c’est sécurisé ! <br />
              Un accessoire pour toute la famille, il se porte tout aussi bien
              par les parents que par les enfants.
            </p>
            <p className="mt-4">
              Pratique, utile, décoratif et très fonctionnel, le sac O’CAOU
              facilite le quotidien. C’est un vrai soutien pour les parents,
              O’CAOU fait gagner du temps, mais aide aussi les petits à devenir
              grands !
            </p>
          </div>
        </div>
        <div className="relative h-[300px] sm:h-[426px] w-full rounded-lg overflow-hidden order-1 mt-10 sm:mt-0 sm:w-3/6">
          <Image
            src="/image/lesprit.jpg"
            alt="Image de l'esprit"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default SpiritSection;
