'use client';
import { useEffect } from "react";

export default function Redes() {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "//www.instagram.com/embed.js");
    script.setAttribute("async", "true");
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="text-center text-3xl mb-8">
        VISITA NUESTRO INSTAGRAM
      </div>
      <div className="flex gap-20 justify-center items-center flex-wrap">
        <div>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/p/DIcoYKZPXFX/?igsh=ZzdkeDM5aTM0Nmo5"
            data-instgrm-version="14"
          ></blockquote>
        </div>
        <div>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/p/DI4s5MDPr0n/?igsh=MWllNHh1ZXdiN2k2aw=="
            data-instgrm-version="14"
          ></blockquote>
        </div>
        <div>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/p/DH_7WiWtioa/?igsh=a2IydXN4empzcTFv"
            data-instgrm-version="14"
          ></blockquote>
        </div>
      </div>
 </>
  );
}