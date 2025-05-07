'use client'
import { useState } from "react"
import Whatsapp from "../whatsapp/page";
import Instagram from "../instagram/page";
import Facebook from "../facebook/page";
import Link from "next/link";

export default function Footer(){
    return (
        <footer className="w-full h-25 bg-[#c3b19e] flex-1 text-white top-0 left-0 z-50">
          <div className="flex justify-around items-center px-4 h-full grid md:flex">
            <div className="flex items-center gap-3 justify-center ">
              <Whatsapp />
              <Instagram />
              <Facebook />
            </div>
      
            <div className="flex gap-5 items-center">
              <Link className="hover:text-black hover:underline" href="/">
                Inicio
              </Link>
              <Link href="/compra"className="hover:text-black hover:underline">Productos</Link>
              <a href="#direccion" className="hover:text-black hover:underline">Dirección</a>
              <a href="#redes" className="hover:text-black hover:underline">Redes</a>
            </div>
          </div>
        </footer>
      );
}