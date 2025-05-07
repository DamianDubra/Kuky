import {FaWhatsapp} from "react-icons/fa";

export default function Whatsapp(){
    return (
        <a
        href="https://wa.me/1168508399"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:bg-green-600 text-white p-3 rounded-full transition"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>
    )
}