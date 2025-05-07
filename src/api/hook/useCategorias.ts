import { useEffect, useState } from "react";
import { getCategorias,createCategoria,
    updateCategoria,
    deleteCategoria, } from "../service/categoriaService";

export function useCategorias() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  

  useEffect(() => {
    fetchCategorias();
  }, []);

  async function fetchCategorias() {
    setLoading(true);
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (err: any) {
      setError(err.message || "Error al obtener categorías");
    } finally {
      setLoading(false);
    }
  }

  async function agregarCategoria(formData: FormData) {
    await createCategoria(formData);
    await fetchCategorias();
  }

  async function editarCategoria(id: number, formData: FormData) {
    await updateCategoria(id, formData);
    await fetchCategorias();
  }

  async function eliminarCategoria(id: number) {
    await deleteCategoria(id);
    await fetchCategorias();
  }

  return {
    categorias,
    loading,
    error,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
  };
}