'use client'

import NextImage, { ImageProps } from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const basePath = process.env.BASE_PATH

const Image = ({ src, ...rest }: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const imageSrc = `${basePath || ''}${src}`

  return (
    <>
      <div 
        className="cursor-zoom-in relative overflow-hidden rounded-xl shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-0.5 my-8"
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F9F8F6]/95 p-4 sm:p-10 backdrop-blur-md cursor-zoom-out dark:bg-[#1C1C1A]/95"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative flex items-center justify-center max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fallback to standard img tag for full resolution zooming without Next.js Image constraints */}
              <img 
                src={typeof src === 'string' ? src : imageSrc} 
                alt={rest.alt || "Lightbox image"} 
                className="h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain rounded-md shadow-2xl ring-1 ring-black/5" 
              />
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Image
