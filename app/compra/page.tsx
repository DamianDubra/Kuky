'use client';
import Link from "next/link";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import { productos } from "../data/productos";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function ProductosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get('search')?.toLowerCase() || '';
  const categoriasParams = searchParams.getAll('categoria').map(c => c.toLowerCase());
  const estilosParams = searchParams.getAll('estilo').map(e => e.toLowerCase());

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>(categoriasParams);
  const [estilosSeleccionados, setEstilosSeleccionados] = useState<string[]>(estilosParams);

  const categoriasUnicas = Array.from(new Set(productos.map(p => p.categoria.toLowerCase())));
  const estilosUnicos = Array.from(new Set(productos.map(p => p.estilo?.toLowerCase()).filter(Boolean)));

  const handleCheckboxChange = (valor: string, tipo: "categoria" | "estilo") => {
    let nuevaLista = tipo === "categoria" ? [...categoriasSeleccionadas] : [...estilosSeleccionados];

    if (nuevaLista.includes(valor)) {
      nuevaLista = nuevaLista.filter((v) => v !== valor);
    } else {
      nuevaLista.push(valor);
    }

    if (tipo === "categoria") setCategoriasSeleccionadas(nuevaLista);
    else setEstilosSeleccionados(nuevaLista);

    const query = new URLSearchParams();
    if (search) query.set("search", search);

    const finalCategorias = tipo === "categoria" ? nuevaLista : categoriasSeleccionadas;
    const finalEstilos = tipo === "estilo" ? nuevaLista : estilosSeleccionados;

    finalCategorias.forEach(cat => query.append("categoria", cat));
    finalEstilos.forEach(est => query.append("estilo", est));

    router.push(`/compra?${query.toString()}`);
  };

  const productosFiltrados = productos.filter(producto => {
    const coincideNombre = producto.nombre.toLowerCase().includes(search);
    const coincideCategoria =
      categoriasSeleccionadas.length === 0 ||
      categoriasSeleccionadas.includes(producto.categoria.toLowerCase());
    const coincideEstilo =
      estilosSeleccionados.length === 0 ||
      estilosSeleccionados.includes(producto.estilo?.toLowerCase() || "");
    return coincideNombre && coincideCategoria && coincideEstilo;
  });

  return (
    <>
      <Header />
      
      <div className="pt-24 pb-5 md:px-10 px-5 flex flex-col min-h-screen ">

        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          
          <div className="md:w-1/4 bg-[#d1c0ae] h-full pb-3 rounded-lg">

            <h2 className="text-lg font-semibold mb-2 text-center pt-3">Filtrar por categoría</h2>
            {categoriasUnicas.map(categoria => (
              <div key={categoria} className="mb-2 px-5">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={categoriasSeleccionadas.includes(categoria)}
                    onChange={() => handleCheckboxChange(categoria, "categoria")}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 capitalize ">{categoria}</span>
                </label>
                <hr></hr>
              </div>
            ))}

            <h2 className="text-lg font-semibold mt-6 mb-2 text-center pt-3">Filtrar por estilo</h2>
            {estilosUnicos.map(estilo => (
              <div key={estilo} className="mb-2 px-5">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={estilosSeleccionados.includes(estilo)}
                    onChange={() => handleCheckboxChange(estilo, "estilo")}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 capitalize">{estilo}</span>
                </label>
                <hr></hr>
              </div>
            ))}
          </div>

          {/* Productos a la derecha */}
          <div className="md:w-3/4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg">
            {productosFiltrados.map((producto) => {
              const precioTransferencia = producto.precio * 0.8;

              return (
                <Link key={producto.id} href={`/compra/${producto.id}`}>
                  <div className="flex flex-col w-full overflow-hidden bg-[#c3b19e] shadow-md hover:shadow-lg cursor-pointer transition rounded-lg">
                    {producto.imagen && (
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full md:h-[300px] h-auto object-cover"
                      />
                    )}
                    <h1 className="text-xl font-semibold text-white text-center py-2">
                      {producto.nombre}
                    </h1>
                    <div className="mx-auto justify-center items-center w-[80%]">
                      <hr className="mx-auto h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>
                    <h1 className="text-white text-center font-bold text-3xl ">
                      ${producto.precio}
                    </h1>
                    <div className="mx-auto justify-center items-center w-[80%]">
                      <h3 className="mx-auto text-center bg-white text-black text-sm">
                        Transferencia ${precioTransferencia.toFixed(2)}
                      </h3>
                    </div>
                    <div className="text-center p-3">
                      <button className="bg-white hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full">
                        Comprar
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}