/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @next/next/no-img-element */
'use client'

import NextImage, { ImageProps, StaticImageData } from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Only prepend basePath to local relative paths, not external http/https URLs
const withBase = (src: string) => (src.startsWith('http') ? src : `${basePath}${src}`)

const Image = ({ src, ...rest }: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false)
  // Ensure basePath is only applied to string paths, not StaticImageData objects
  const imageSrc = typeof src === 'string' ? withBase(src) : src
  // For the standard HTML img tag, we need the raw string path
  const imgTagSrc = typeof src === 'string' ? withBase(src) : (src as StaticImageData).src

  return (
    <>
      <div
        className="relative my-8 cursor-zoom-in overflow-hidden rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <NextImage src={imageSrc} {...rest} className="m-0" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-[#F9F8F6]/95 p-4 backdrop-blur-md sm:p-10 dark:bg-[#1C1C1A]/95"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fallback to standard img tag for full resolution zooming without Next.js Image constraints */}
              <img
                src={imgTagSrc}
                alt={rest.alt || 'Lightbox image'}
                className="h-auto max-h-[90vh] w-auto max-w-[90vw] rounded-md object-contain shadow-2xl ring-1 ring-black/5"
              />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Image
