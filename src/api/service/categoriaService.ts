const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export async function getCategorias() {
    const res = await fetch(`${API_URL}/api/categorias?populate=*`);
  const data = await res.json();
  return data.data;
}

export async function createCategoria(formData: FormData) {
  const res = await fetch(`${API_URL}/api/categorias?populate=*`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return res.json();
}

export async function updateCategoria(id: number, formData: FormData) {
  const res = await fetch(`${API_URL}/api/categorias?populate=*/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Error al actualizar categoría");
  return res.json();
}

export async function deleteCategoria(id: number) {
  const res = await fetch(`${API_URL}/api/categorias?populate=*/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar categoría");
  return res.json();
}