'use client'
import { useState, useEffect } from 'react'

const desktopImages = [
  '/1bl.jpg',
  '/2.1.jpg',
  '/2bl.jpg',
 
]

const mobileImages = [
  '/1 celu.png',
  '/2.1celu.jpg',
  '/2celu.png',
]

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const images = isMobile ? mobileImages : desktopImages

  const next = () => {
    setCurrent((current + 1) % images.length)
  }

  const prev = () => {
    setCurrent((current - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const interval = setInterval(next, 3000)
    return () => clearInterval(interval)
  }, [current])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative w-full aspect-[384/550] max-h-[90vh] md:aspect-[16/4] md:max-h-none overflow-hidden">
      <img
        src={images[current]}
        alt="Imagen del carrusel"
        className="w-full h-full object-cover transition duration-500"
      />
      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-opacity-50 p-2 rounded-full"
      >
      ❮
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-opacity-50 p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  )
}