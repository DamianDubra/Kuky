'use client';
import { useParams } from 'next/navigation';
import Header from '@<kuky>/app/components/header/page';
import Footer from '@<kuky>/app/components/footer/page';
import { productos } from '@<kuky>/app/data/productos';
import Link from 'next/link';
import Destacado from '@<kuky>/app/components/destacados/page';

export default function Compra() {
  const params = useParams();
  const id = Number(params.id);

  // Buscar el producto con el id dado
  const producto = productos.find(p => p.id === id);
  const precioTransferencia = producto ? producto.precio * 0.8 : 0;
  const cuotas = producto ? producto.precio /6 : 0;


  // Si el producto no se encuentra, muestra un mensaje o redirige
  if (!producto) {
    return (
      <>
        <Header />
        <div className="p-10">
          <h1 className="text-2xl">Producto no encontrado</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-26 ">
  <div className="flex flex-col items-center md:flex-row justify-center text-center gap-5">
    {/* Imagen */}
    <div className="w-full md:w-auto flex justify-center ">
      {producto.imagen && (
        <img src={producto.imagen} alt={producto.nombre} className="w-100 h-100 object-contain rounded-sm" />
      )}
    </div>

    {/* Información del producto */}
    <div className="bg-[#c3b19e] text-center w-[90%] md:w-100 rounded-sm mt-5 md:mt-0">
      <h1 className="text-white text-3xl pt-5 pb-5">{producto.nombre}</h1>

      <div className="mx-auto w-[80%]">
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      </div>

      <div className="flex flex-col justify-around items-center">
        <p className="text-white text-xl">${producto.precio}</p>

        <div className="flex flex-col justify-around items-center min-h-[300px]">
          <div className="w-[80%]">
            <p className="text-black text-sm bg-white">20% off en transferencia ${precioTransferencia}</p>
          </div>
          

          <div className="w-[80%]">
            <p className="bg-green-800 text-white">6 cuotas de: ${cuotas.toFixed(2)}</p>
          </div>
          
          <div className="pt-5">
        <div className="w-[80%] mx-auto">
          <h1 className="text-black text-xl bg-white ">CARACTERÍSTICAS</h1>
        </div>
        <h1 className="p-5">{producto.descripcion}</h1>
      </div>
          <div className="text-center mt-3">
            <h1>¡Consultanos por tu talle con el botón de debajo!</h1>
          </div>

          <Link href="https://wa.me/1168508399">
            <button className="mt-4 mb-4 bg-white hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full">
              Contacto
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>

  {/* Características */}
  
</div>

      <div className='text-3xl text-center mx-auto pt-10'>TAMBIEN TE PUEDE INTERESAR</div>
      
      <div className="flex justify-center w-full md:p-20 p-5">
        <div className="grid md:gap-20 gap-5 sm:grid-cols-1 grid-cols-2 md:grid-cols-3 md:w-[80%]">
              {productos.filter(dest => dest.categoria === producto.categoria && dest.id !== producto.id).slice(0, 6).map((dest) => (
                <Destacado key={dest.id} id={dest.id} nombre={dest.nombre} imagen={dest.imagen} precio={dest.precio}/>
              ))}
              </div>
              </div>
      <Footer />
    </>
  );
}