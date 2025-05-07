import { FaInstagram } from "react-icons/fa";

export default function Instagram(){
    return (
      <a
        href="https://www.instagram.com/kuky.showroom/"
        target="_blank"
        rel="noopener noreferrer"
        className=" hover:bg-pink-600 text-white p-3 rounded-full transition"
      >
        <FaInstagram className="w-7 h-7" />
      </a>
    );
    }
