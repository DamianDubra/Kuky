import Link from "next/link";
import { productos } from "@<kuky>/app/data/productos";

type ProductoProps = {
    id: number;
    nombre: string;
    imagen?: string;
    precio:number;
    descripcion:string;
    categoria:string;
    estilo:string;
  }

export default function Destacado({id, nombre, imagen, precio}:ProductoProps){
  const precioTransferencia = precio * 0.8;
    return (
      
<Link href={`/compra/${id}`}>
    <div className="flex flex-col w-full overflow-hidden bg-[#c3b19e] shadow-md hover:shadow-lg cursor-pointer transition rounded-lg">
      {imagen && (
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-auto md:h-[300px] object-cover"
        />
      )}
      <h1 className="text-xl font-semibold text-white text-center py-2">
        {nombre}
      </h1>
      <div className="mx-auto justify-center items-center w-[80%]">
  <hr className="mx-auto h-px bg-gray-200 border-0 dark:bg-gray-700" />
</div>
      <h1 className="text-white text-center font-bold text-3xl">${precio}</h1>
      <div className="mx-auto justify-center items-center w-[80%]">
      <h3 className="mx-auto text-center bg-white text-black text-sm">Transferencia ${precioTransferencia.toFixed(2)}</h3>
      </div>
      <div className="text-center p-3">
      <button className=" bg-white hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full" > Comprar</button>
      </div>
    </div>
  </Link>
    );

}