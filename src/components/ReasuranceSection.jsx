import Image from "next/image";

function FeaturesSection() {
  return (
    <div className="w-full bg-lin my-16 px-6 py-10 gap-10 flex flex-col justify-between items-center sm:px-24 sm:flex-row sm:gap-0 sm:py-5 sm:my-24">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/image/reinsurance/name-tag.svg"
          alt="Etiquettes nominatives"
          width={50}
          height={50}
        />
        <p className="mt-3 text-center leading-5">
          Etiquettes
          <br />
          nominatives
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/image/reinsurance/customizable-bag.svg"
          alt="Sac personnalisable"
          width={50}
          height={50}
        />
        <p className="mt-3 text-center leading-5">
          Sac
          <br />
          personnalisable
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/image/reinsurance/honeycomb.svg"
          alt="Modèle nid d'abeille"
          width={50}
          height={50}
        />
        <p className="mt-3 text-center leading-5">
          Modèle
          <br />
          nid d’abeille
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/image/reinsurance/cotton-canvas.svg"
          alt="Modèle toile de coton"
          width={50}
          height={50}
        />
        <p className="mt-3 text-center leading-5">
          Modèle
          <br />
          toile de coton
        </p>
      </div>
    </div>
  );
}

export default FeaturesSection;
