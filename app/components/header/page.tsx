'use client'
import { useState } from "react";
import Whatsapp from "../whatsapp/page";
import Instagram from "../instagram/page";
import Facebook from "../facebook/page";
import { Menu } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";

import { productos } from "@<kuky>/app/data/productos";
import { useEffect } from "react";

export default function Header(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);  // Asegúrate de que useRouter solo se use en el cliente
  }, []);
  
   // Maneja la entrada del usuario
   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filtra los productos por nombre
  const handleSearch = () => {
    if (isClient && searchTerm) {
      router.push(`/compra?search=${searchTerm}`);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();      
    handleSearch();           
  };

    return (
        <>
      <header className="w-full h-14 bg-[#c3b19e] text-white fixed top-0 left-0 z-50">
        <div className="flex items-center justify-between px-4 h-full">
            {/* Botón de menú en mobile */}
        <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={28} />
          </button>
          <Link href="/">
          <h1 className="text-xl font-['Times_New_Roman']">KUKY SHOWROOM</h1>
          </Link>
          <div className="hidden md:flex w-full max-w-md mx-auto">
          <form
  onSubmit={handleSubmit}
  className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm bg-white w-full"
>
  <input
    type="text"
    placeholder="Buscar..."
    value={searchTerm}
    onChange={handleSearchChange}
    className="w-full px-4 py-2 outline-none text-gray-800"
  />
  <button
    type="submit"
    className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
  >
    Buscar
  </button>
</form>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Whatsapp />
            <Instagram />
            <Facebook />
          </div>


          
        </div> <div className=" bg-[#d1c0ae]
 text-white hidden md:flex items-center gap-13 w-full h-8 justify-center">

<Link className="hover:text-black hover:underline" href="/">
  Inicio
</Link>
<Link href="/compra" className="hover:text-black hover:underline">
  Productos
</Link>
<Link href="/#direccion" className="hover:text-black hover:underline">
  Dirección
</Link>
<Link href="/#redes" className="hover:text-black hover:underline ">
  Redes
</Link>
      </div>
      </header>
     

      {/* Menú desplegable mobile */}
      {menuOpen && (
        <div className="md:hidden mt-14 bg-[#c3b19e] p-4 w-[60%] left-0 shadow-lg fixed z-40 h-[100%]">
          <form onSubmit={handleSubmit} className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm bg-white">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full px-4 py-2 outline-none text-gray-800"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
            >
              Buscar
            </button>
          </form>
          <div className="grid left-0 text-white pt-5">
          <Link className="hover:text-black hover:underline" href="/">
  Inicio
</Link>
<Link href="/compra" className="hover:text-black hover:underline pt-5">
  Productos
</Link>
<Link href="/#direccion" className="hover:text-black hover:underline pt-5">
  Dirección
</Link>
<Link href="/#redes" className="hover:text-black hover:underline pt-5">
  Redes
</Link>
          </div>

        </div>
      )}
    </>
    );
}