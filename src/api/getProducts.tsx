
import { useEffect, useState } from "react"

export function useGetProductos(){
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos?populate=*`

    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(()=>{
        (async () =>{
            try{
                const res = await fetch(`${process.env.STRAPI_API_URL}/productos?populate=imagen,categoria,estilo`);
                const json = await res.json()
                setResult(json.data)
                setLoading(false)
            }catch(error : any){
                setError(error)
                setLoading(false)
            }
        })()
    }, [url])

return { loading, result,}

}