'use client';

import { useState } from "react";
import { productos as productosIniciales } from "@<kuky>/app/data/productos";
import { Producto } from "@<kuky>/app/data/types";
import Menu from "../menu/page";

export default function OrdenarDestacadosPage() {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);

  const destacados = productos
    .filter(p => p.destacado)
    .sort((a, b) => a.orden - b.orden);

  const moverOrden = (id: number, direccion: 'up' | 'down') => {
    const index = destacados.findIndex(p => p.id === id);
    if ((direccion === "up" && index === 0) || (direccion === "down" && index === destacados.length - 1)) return;

    const otroIndex = direccion === "up" ? index - 1 : index + 1;

    const nuevosDestacados = [...destacados];
    // intercambiar los valores de orden
    const tempOrden = nuevosDestacados[index].orden;
    nuevosDestacados[index].orden = nuevosDestacados[otroIndex].orden;
    nuevosDestacados[otroIndex].orden = tempOrden;

    // reflejar el cambio en todos los productos
    const nuevosProductos = productos.map(p => {
      const actualizado = nuevosDestacados.find(d => d.id === p.id);
      return actualizado ? { ...p, orden: actualizado.orden } : p;
    });

    setProductos(nuevosProductos);
  };

  return (
    <div className="flex">
      <Menu />
      <div className="p-6 max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Ordenar destacados</h1>
        <h1 className="text-xl font-bold mb-4 bg-blue-200">Se muestran max 12</h1>

        {destacados.map((prod, i) => (
          <div key={prod.id} className="flex items-center justify-between mb-3 border p-3 rounded">
            <div className="flex items-center gap-4">
              <img src={prod.imagen} alt={prod.nombre} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-semibold">{prod.nombre}</p>
                <p className="text-sm text-gray-500">Orden: {prod.orden}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => moverOrden(prod.id, "up")}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                ⬆️
              </button>
              <button
                onClick={() => moverOrden(prod.id, "down")}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                ⬇️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}