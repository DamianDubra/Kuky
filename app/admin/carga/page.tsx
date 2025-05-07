'use client';

import Menu from "../menu/page";

import { useState } from "react";
export default function Carga(){
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
      nombre: '',
      precio: '',
      categoria: '',
      descripcion: '',
      estilo: '',
      destacado:'',
    });
    const [imagenFile, setImagenFile] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleFileChange = (e) => {
      setImagenFile(e.target.files[0]); // capturamos el archivo
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!imagenFile) {
        alert("Seleccioná una imagen");
        return;
      }
  
      // Para ahora, simplemente simulamos que subimos todo junto
      const nuevoProducto = {
        ...form,
        id: Date.now(),
        precio: Number(form.precio),
        imagen: URL.createObjectURL(imagenFile), // para vista previa (temporal)
      };
  
      setProductos([...productos, nuevoProducto]);
      setForm({
        nombre: '',
        precio: '',
        categoria: '',
        descripcion: '',
        estilo: '',
        destacado:'',
      });
      setImagenFile(null);
    };
    return(
        <div className="flex">
        <Menu/>
        <div className="p-6 mx-auto w-[80%]">
      <h1 className="text-xl font-bold mb-4">Cargar nuevo producto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input className="mb-4 p-2 border rounded w-full"  name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input className="mb-4 p-2 border rounded w-full"  type="file" accept="image/*" onChange={handleFileChange} />
        <input className="mb-4 p-2 border rounded w-full"  name="precio" placeholder="Precio" type="number" value={form.precio} onChange={handleChange} />
        <input className="mb-4 p-2 border rounded w-full"  name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} />
        <input className="mb-4 p-2 border rounded w-full"  name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        <input className="mb-4 p-2 border rounded w-full"  name="estilo" placeholder="Estilo" value={form.estilo} onChange={handleChange} />
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
        <button type="submit" className="bg-green-500 text-white py-2">Agregar producto</button>
      </form>

      <hr className="my-6" />

      <h2 className="text-lg font-semibold mb-2">Productos cargados:</h2>
      <ul className="space-y-2">
        {productos.map((prod) => (
          <li key={prod.id} className="border p-2 rounded">
            <strong>{prod.nombre}</strong> - ${prod.precio}
            <br />
            <img src={prod.imagen} alt={prod.nombre} className="w-20 h-20 object-cover mt-2" />
            <div>Categoría: {prod.categoria}</div>
            <div>Estilo: {prod.estilo}</div>
          </li>
        ))}
      </ul>
    </div>
        </div>
    )
}