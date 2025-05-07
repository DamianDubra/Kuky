"use client"
import Carousel from "./components/carrusel/page"
import Header from "./components/header/page"
import Footer from "./components/footer/page"
import Whatsapp from "./components/whatsapp/page"
import Promo from "./components/promo/page"
import Categoria from "./components/categoria/page"
import Destacado from "./components/destacados/page"
import { useGetProductos } from "@<kuky>/src/api/getProducts"
import Link from "next/link"
import Redes from "./components/redes/page"


/*Prueba sin base de datos*/
const categorias = [
  { id: 1, nombre: "Remeras", imagen: "/remeraej.jpg" },
  { id: 2, nombre: "Jeans", imagen: "/pantej.jpg" },
  { id: 3, nombre: "Camperas", imagen: "/camperaej.jpg" },
]

const descuentos = [
  { id: 1, imagen:"/desc1.png" },
  { id: 2, imagen:"/desc2.png" },
  { id: 3, imagen:"/desc3.png" },
]

export default function Home() {

  const { loading, result: productos,} = useGetProductos();

  if (loading) return <p className="text-center py-10">Cargando productos...</p>;
  

  return (
    <main className=" min-h-screen">
      <div>
      <Header/>
      </div>
      <div className="pt-14 md:pt-22">
      <Carousel />
      </div>
      <div className="grid md:flex justify-center pt-10">
  <div className="grid md:flex p-5 gap-5 md:p-0 md:gap-10 md:w-[80%] justify-center">
    {descuentos.map((desc)=>
    <Promo key={desc.id} id={desc.id} imagen={desc.imagen}/>
    )}
    
    
  </div>
</div>
<div className="flex justify-center items-center w-full">
  <h1 className="text-3xl font-['Times_New_Roman']">CATEGORIAS</h1>
</div>
<div className="flex justify-center w-full md:p-20 p-5">
  <div className="grid md:gap-20 gap-5 sm:grid-cols-1 grid-cols-2 md:grid-cols-3 md:w-[80%]">
        {categorias.map((cat) => (
          <Categoria key={cat.id} nombre={cat.nombre} imagen={cat.imagen} />
        ))}
        </div>
        </div>

        <div className="flex justify-center items-center w-full">
  <h1 className="text-3xl font-['Times_New_Roman']">PRODUCTOS DESTACADOS</h1>
</div>

        <div className="flex justify-center w-full md:p-20 p-5">
        <div className="grid md:gap-20 gap-5 sm:grid-cols-1 grid-cols-2 md:grid-cols-3 md:w-[80%]">
          {productos
            .filter((p) => p.attributes.destacado) // solo los destacados
            .sort((a, b) => a.attributes.orden - b.attributes.orden) // orden
            .slice(0, 12)
            .map((dest) => {
              const { id, attributes } = dest;
              const nombre = attributes.nombre;
              const precio = attributes.precio;
              const imagen = attributes.imagen?.data?.attributes?.url
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${attributes.imagen.data.attributes.url}`
                : undefined;

              return (
                <Destacado
                  key={id}
                  id={id}
                  nombre={nombre}
                  precio={precio}
                  imagen={imagen}
                />
              );
            })}
        </div>
      </div>
        <div className="text-center justify-center items-center">
        <Link href="/compra">
      <button className="text-center bg-[#c3b19e] hover:bg-gray-200 text-white hover:text-black font-bold py-2 px-4 rounded-full">
        Ver productos
      </button>
    </Link>
    </div>

      <section id="direccion">
      <div className="flex justify-center items-center p-10">
  <div className="w-full max-w-4xl aspect-video">
    <iframe
      className="w-full h-full rounded-lg border-0"
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13148.058569208304!2d-58.518834999999996!3d-34.527857!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb195088592c9%3A0x5c6916638d4fd154!2sKuky.showroom!5e0!3m2!1ses!2sar!4v1745878620789!5m2!1ses!2sar"
      
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>
      </section>
<section id="redes" className="pb-10">
<Redes/>
</section>
<Footer/>
    </main>
  )
}
