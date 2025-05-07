import Image from "next/image";

type Promos ={
  id: number;
  imagen?:string;
}
export default function Promo({ id, imagen }: Promos) {
  return (
    <div className="md:w-[600px] md:h-[500px] flex items-center justify-center overflow-hidden rounded-lg">
      {imagen && (
        <img
          src={imagen}
          className="max-w-full max-h-full object-contain rounded-lg"
          alt=""
        />
      )}
    </div>
  );
}