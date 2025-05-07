"use client"
import { useState } from "react";
import Menu from "../menu/page";
import { useCategorias } from "@<kuky>/src/api/hook/useCategorias"; // usa @ si tenés configurado el alias, si no: reemplazalo

export default function Categ() {
  const {
    categorias,
    loading,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
  } = useCategorias();

  const [form, setForm] = useState({
    nombre: '',
  });
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagenFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", form.nombre);
    if (imagenFile) {
      formData.append("imagen", imagenFile);
    }

    try {
      if (editandoId) {
        await editarCategoria(editandoId, formData);
        setEditandoId(null);
      } else {
        if (!imagenFile) {
          alert("Seleccioná una imagen");
          return;
        }
        await agregarCategoria(formData);
      }

      setForm({ nombre: '' });
      setImagenFile(null);
    } catch (error) {
      alert("Error al procesar la categoría");
    }
  };

  const handleEditar = (cat: any) => {
    setForm({ nombre: cat.attributes?.nombre || "" });
    setEditandoId(cat.id);
  };

  const handleEliminar = async (id: number) => {
    if (confirm("¿Eliminar esta categoría?")) {
      await eliminarCategoria(id);
    }
  };

  return (
    <div className="flex">
      <Menu />
      <div className="p-6 mx-auto w-[80%]">
        <h1 className="text-xl font-bold mb-4">
          {editandoId ? "Editar Categoría" : "Cargar nueva Categoría"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="mb-4 p-2 border rounded w-full"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          <input
            className="mb-4 p-2 border rounded w-full"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="submit" className="bg-green-500 text-white py-2 rounded">
            {editandoId ? "Actualizar Categoría" : "Agregar Categoría"}
          </button>
        </form>

        <hr className="my-6" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categorias?.map((cat: any) => (
            <div key={cat.id} className="border rounded p-4 shadow-md">
              <img
  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${cat.attributes.imagencat?.data?.attributes?.url}`}
  alt={cat.attributes.nombre}
  className="w-full h-32 object-cover mb-2 rounded"
/>
              <p><strong>ID:</strong> {cat.id}</p>
              <p><strong>Nombre:</strong> {cat.attributes?.nombre}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => handleEditar(cat)}
                >
                  Editar
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleEliminar(cat.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}