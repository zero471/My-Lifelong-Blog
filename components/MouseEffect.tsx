'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function MouseEffect() {
  const [isClient, setIsClient] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setIsClient(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      const target = e.target as HTMLElement
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                          target.tagName.toLowerCase() === 'a' || 
                          target.tagName.toLowerCase() === 'button' ||
                          target.closest('a') || 
                          target.closest('button')
                          
      setIsHovering(!!isClickable)
    }
    
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseX, mouseY])

  if (!isClient) return null

  return (
    <>
      {/* Premium Ambient Spotlight - Intensified */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100 blur-[70px]"
        style={{
          x: smoothX,
          y: smoothY,
          background: 'radial-gradient(circle, rgba(193, 119, 103, 0.45) 0%, rgba(193, 119, 103, 0.1) 35%, transparent 65%)'
        }}
      />

      {/* Main Cursor (Clear Lens Frame) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C17767]/50 shadow-[inset_0_0_10px_rgba(193,119,103,0.1),_0_2px_10px_rgba(0,0,0,0.05)] dark:border-[#C17767]/70"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: isClicking ? 20 : isHovering ? 64 : 36,
          height: isClicking ? 20 : isHovering ? 64 : 36,
          backgroundColor: isHovering ? 'rgba(193, 119, 103, 0.05)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovering ? 'rgba(193, 119, 103, 0.9)' : 'rgba(193, 119, 103, 0.5)',
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
      
      {/* Tiny precision dot - Brightened with a soft glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E07A5F] shadow-[0_0_8px_rgba(224,122,95,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          opacity: (isHovering || isClicking) ? 0 : 1,
          scale: (isHovering || isClicking) ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
