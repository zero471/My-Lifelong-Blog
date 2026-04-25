'use client'

import { useState, useRef, useEffect } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import travelLocations, { TravelLocation } from '@/data/travelLocations'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export default function TravelMap() {
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [position, setPosition] = useState({ coordinates: [105, 30] as [number, number], zoom: 1 })
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [isMounted])

  const handleZoomIn = () => {
    if (position.zoom >= 4) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= 0.5) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }))
  }

  const handleMoveEnd = (pos: { coordinates: [number, number]; zoom: number }) => {
    setPosition(pos)
  }

  if (!isMounted) {
    return (
      <div className="relative w-full min-h-[400px] overflow-hidden rounded-2xl border border-gray-200 bg-[#F2F0EB] shadow-sm animate-pulse sm:min-h-[500px]" />
    )
  }

  return (
    <div className="relative w-full">
      {/* Map */}
      <div
        ref={mapContainerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-[#F2F0EB] shadow-sm"
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [105, 30],
            scale: 500,
          }}
          style={{ width: '100%', height: 'auto' }}
          viewBox="0 0 800 500"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            minZoom={0.5}
            maxZoom={4}
            translateExtent={[[-8300, -1000], [7300, 1500]]}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                [-2, -1, 0, 1, 2].map((offset) => (
                  <g key={`geo-group-${offset}`} transform={`translate(${offset * 500 * 2 * Math.PI}, 0)`}>
                    {geographies.map((geo) => {
                      const isChinaOrTaiwan = (name: string) => name === 'China' || name === 'Taiwan';
                      const geoName = geo.properties.name;
                      const isHighlighted =
                        hoveredCountry &&
                        ((isChinaOrTaiwan(hoveredCountry) && isChinaOrTaiwan(geoName)) ||
                          hoveredCountry === geoName);

                      return (
                        <Geography
                          key={`${offset}-${geo.rsmKey}`}
                          geography={geo}
                          onMouseEnter={() => setHoveredCountry(geoName)}
                          onMouseLeave={() => setHoveredCountry(null)}
                          fill={isHighlighted ? '#D5D0C5' : '#E6E3DB'}
                          stroke="#D5D0C5"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { fill: '#D5D0C5', outline: 'none' },
                            pressed: { outline: 'none' },
                          }}
                        />
                      )
                    })}
                  </g>
                ))
              }
            </Geographies>

            {[-2, -1, 0, 1, 2].map((offset) => (
              <g key={`marker-group-${offset}`} transform={`translate(${offset * 500 * 2 * Math.PI}, 0)`}>
                {travelLocations.map((location) => (
                  <Marker
                    key={`${offset}-${location.id}`}
                    coordinates={location.coordinates}
                    onClick={() => setSelectedLocation(location)}
                    onMouseEnter={() => setHoveredId(location.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Pulse ring */}
                    <circle
                      r={hoveredId === location.id ? 12 : 8}
                      fill="#C17767"
                      opacity={0.2}
                      style={{ transition: 'r 0.3s ease' }}
                    />
                    {/* Main dot */}
                    <circle
                      r={hoveredId === location.id ? 5 : 4}
                      fill="#C17767"
                      stroke="#F9F8F6"
                      strokeWidth={2}
                      style={{
                        cursor: 'pointer',
                        transition: 'r 0.3s ease',
                      }}
                    />
                    {/* Label */}
                    <text
                      textAnchor="middle"
                      y={-14}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: hoveredId === location.id ? '11px' : '9px',
                        fill: '#4D463B',
                        fontWeight: 500,
                        transition: 'font-size 0.3s ease',
                        pointerEvents: 'none',
                      }}
                    >
                      {location.nameZh}
                    </text>
                  </Marker>
                ))}
              </g>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Map overlay info */}
        <div className="absolute bottom-4 left-4 font-sans text-xs text-gray-500">
          点击足迹标记查看回忆
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 font-sans text-lg text-[#C17767] shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus:outline-none"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 font-sans text-lg text-[#C17767] shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus:outline-none"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
      </div>

      {/* Location Detail Sidebar */}
      <AnimatePresence>
        {selectedLocation && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedLocation(null)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-full w-full max-w-xl overflow-y-auto bg-[#F9F8F6] shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-gray-900"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="px-8 pt-16 pb-12">
                {/* Location header */}
                <div className="mb-8">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C17767]">
                    {selectedLocation.date}
                  </span>
                  <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight text-[#2C2C2A]">
                    {selectedLocation.nameZh}
                  </h2>
                  <p className="mt-1 font-sans text-sm text-gray-500">
                    {selectedLocation.name}
                  </p>
                </div>

                {/* Description */}
                <p className="mb-10 font-sans text-base leading-relaxed text-[#4D463B]">
                  {selectedLocation.description}
                </p>

                {/* Photos - Polaroid style */}
                <div className="space-y-6">
                  <h3 className="font-serif text-lg font-medium text-[#2C2C2A]">记忆碎片</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedLocation.photos.map((photo, index) => (
                      <motion.div
                        key={photo}
                        initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -2 : 2 }}
                        animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className="bg-white p-2 pb-6 shadow-md"
                      >
                        <div className="relative aspect-square w-full overflow-hidden">
                          <Image
                            src={photo}
                            alt={`${selectedLocation.nameZh} memory ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-[#C17767]/5 mix-blend-multiply" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Blog link */}
                {selectedLocation.blogSlug && (
                  <a
                    href={`/blog/${selectedLocation.blogSlug}`}
                    className="mt-10 inline-flex items-center gap-2 font-sans text-sm font-medium text-[#677b63] transition-colors hover:text-[#50614c]"
                  >
                    阅读完整游记
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
