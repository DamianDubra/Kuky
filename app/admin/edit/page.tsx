'use client';

import { useState } from "react";
import Menu from "../menu/page";
import { productos } from "@<kuky>/app/data/productos";
import { Producto } from "@<kuky>/app/data/types"; 

export default function EditarProductosPage() {
  const [producto, setProductos] = useState<Producto[]>(productos);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<Producto | Partial<Producto>>({});

  

  const handleEditar = (producto) => {
    setEditandoId(producto.id);
    setForm(producto);
  };
  const [busqueda, setBusqueda] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGuardar = () => {
    setProductos(prev =>
      prev.map(p => (p.id === editandoId ? { ...form, precio: Number(form.precio) } : p))
    );
    setEditandoId(null);
    setForm({});
  };

  
  return (
    
    <div className="flex">
        <Menu/>
    <div className="flexp-6 max-w-3xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-4">Editar productos</h1>
      {!editandoId && (
  <>
    <input
      type="text"
      placeholder="Buscar por nombre..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      className="mb-4 p-2 border rounded w-full"
    />

    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {productos
        .filter(prod =>
          prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
        )
        .map(prod => (
          <li key={prod.id} className="border p-4 rounded">
            <div className="grid justify-between items-center">
              <div>
                <strong>{prod.nombre}</strong> - ${prod.precio}
                <div>Imagen: {prod.imagen && (
                  <img
                    src={prod.imagen}
                    className="w-full h-auto md:h-[300px] object-cover"
                  />
                )}</div>
                <div>Categoría: {prod.categoria}</div>
                <div>Estilo: {prod.estilo}</div>
              </div>
              <button
                onClick={() => handleEditar(prod)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleEditar(prod)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
    </ul>
  </>
)}

      {editandoId && (
        <div className="mt-10 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Editando producto ID: {editandoId}</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleGuardar(); }} className="flex flex-col gap-2">
            <input       className="mb-4 p-2 border rounded w-full" name="nombre" value={form.nombre || ""} onChange={handleChange} />
            {form.imagen && (
  <img src={form.imagen} alt="Vista previa" className="w-32 h-32 object-cover" />
)}
<input
  name="imagen"
  type="text"
  placeholder="URL de imagen o ruta local"
  value={form.imagen || ""}
  onChange={handleChange}
/>
            <input className="mb-4 p-2 border rounded w-full" name="precio" type="number" value={form.precio || ""} onChange={handleChange} />
            <input className="mb-4 p-2 border rounded w-full" name="categoria" value={form.categoria || ""} onChange={handleChange} />
            <input className="mb-4 p-2 border rounded w-full" name="descripcion" value={form.descripcion || ""} onChange={handleChange} />
            <input className="mb-4 p-2 border rounded w-full" name="estilo" value={form.estilo || ""} onChange={handleChange} />
            <label className="flex items-center gap-2">
  <input
    type="checkbox"
    name="destacado"
    checked={!!form.destacado}
    onChange={(e) =>
      setForm({ ...form, destacado: e.target.checked })
    }
  />
  Producto destacado
</label>
            <button type="submit" className="bg-green-600 text-white py-2">Guardar cambios</button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
}