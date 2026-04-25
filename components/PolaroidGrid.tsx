'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    id: 'thoughts',
    title: '思考',
    subtitle: 'Thoughts',
    href: '/tags/thoughts',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop',
    rotation: -4,
    yOffset: 12,
  },
  {
    id: 'experiences',
    title: '生活经验',
    subtitle: 'Experiences',
    href: '/tags/experiences',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop',
    rotation: 3,
    yOffset: -8,
  },
  {
    id: 'goods',
    title: '购物指北',
    subtitle: 'Goods',
    href: '/tags/goods',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop',
    rotation: -2,
    yOffset: 20,
  },
  {
    id: 'travel',
    title: '旅行',
    subtitle: 'Travel',
    href: '/travel',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=600&auto=format&fit=crop',
    rotation: 5,
    yOffset: -15,
  },
  {
    id: 'cooking',
    title: '厨艺',
    subtitle: 'Cooking',
    href: '/tags/cooking',
    image: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?q=80&w=600&auto=format&fit=crop',
    rotation: -5,
    yOffset: 5,
  },
  {
    id: 'fitness',
    title: '运动健身',
    subtitle: 'Fitness',
    href: '/tags/fitness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop',
    rotation: 4,
    yOffset: 10,
  },
]

export default function PolaroidGrid() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 relative z-10">
      <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-3 lg:gap-x-12 lg:gap-y-24">
        {categories.map((category, index) => (
          <Link href={category.href} key={category.id} className="group relative block outline-none">
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: category.rotation }}
              animate={{
                opacity: 1,
                y: category.yOffset,
                rotate: category.rotation,
                boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.08)',
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                y: category.yOffset - 15,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
              }}
              className="relative z-10 flex flex-col bg-[#F9F8F6] p-3 pb-6 will-change-transform origin-bottom border border-gray-100 dark:bg-[#E6E3DB] dark:border-none sm:p-4 sm:pb-8"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-[#C17767]/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
              </div>
              <div className="mt-5 flex flex-col items-center text-center">
                <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-wide text-[#2C2C2A]">
                  {category.title}
                </h3>
                <span className="mt-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-[#827867]">
                  {category.subtitle}
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}