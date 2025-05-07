import { FaHome, FaList, FaPalette } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"
import { FaUpload } from "react-icons/fa"
import { FaSort } from "react-icons/fa"

export default function Menu(){
    return (
        <div className="fixed w-[5%] h-screen bg-blue-500  justify-center items-center">
  <a href="/" className="w-full text-center aling-center justify-center text-4xl text-white py-6 grid">
  <div className="text-sm text-center">Home</div>
    <FaHome />
  </a>
  <a href="/admin/carga" className="w-full text-center text-4xl text-white py-6 grid aling-center justify-center ">
  <div className="text-sm">Cargar</div>
    <FaUpload />
  </a>
  <a href="/admin/edit" className="w-full text-center text-4xl text-white py-6 grid aling-center justify-center">
  <div className="text-sm">Editar</div>
    <FaEdit />
  </a>
  <a href="/admin/orden" className="w-full text-center text-4xl text-white py-6 grid aling-center justify-center">
  <div className="text-sm">Ordenar</div>
    <FaSort />
  </a>
  <a href="/admin/categ" className="w-full text-center text-4xl text-white py-6 grid aling-center justify-center">
  <div className="text-sm text-center">Categorias</div>
    <FaList />
  </a>
  <a href="/admin/estilo" className="w-full text-center text-4xl text-white py-6 grid aling-center justify-center">
  <div className="text-sm text-center">Estilos</div>
    <FaPalette />
  </a>
</div>
    )
}