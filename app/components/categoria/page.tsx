import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@<kuky>/components/ui/card"

import Link from "next/link"


type CategoriaProps = {
  nombre: string
  imagen?: string
}

export default function Categoria({ nombre, imagen }: CategoriaProps) {
  return (
    
    <Link href={`/compra?categoria=${encodeURIComponent(nombre)}`}>
      
    <div className="flex flex-col w-full overflow-hidden bg-[#c3b19e] shadow-md hover:shadow-lg cursor-pointer transition rounded-lg">
      
      {imagen && (
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-[300px] object-cover"
        />
      )}
      <h2 className="text-lg font-semibold text-white text-center py-2">
        {nombre}
      </h2>
    </div>
  </Link>
  )
}