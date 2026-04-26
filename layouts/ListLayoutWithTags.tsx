'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { motion } from 'framer-motion'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  // Find current tag name in Chinese or capitalize if not found
  const getDisplayTitle = () => {
    if (pathname.includes('/tags/thoughts')) return '思考 (Thoughts)'
    if (pathname.includes('/tags/experiences')) return '生活经验 (Experiences)'
    if (pathname.includes('/tags/goods')) return '购物指北 (Goods)'
    if (pathname.includes('/tags/cooking')) return '厨艺 (Cooking)'
    if (pathname.includes('/tags/fitness')) return '运动健身 (Fitness)'
    return title
  }

  return (
    <div className="mx-auto max-w-6xl pt-12 pb-24">
      {/* Header section */}
      <div className="mb-16 border-b border-[#E6E3DB] pb-10 text-center">
        <h1 className="font-serif text-5xl font-medium tracking-tight text-[#2C2C2A] md:text-6xl">
          {getDisplayTitle()}
        </h1>
        <p className="mt-4 font-sans text-[#677b63]">探索关于生活的碎片与感悟</p>
      </div>

      {/* Tags Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        <Link
          href="/blog"
          className={`rounded-full px-4 py-1.5 font-sans text-sm font-medium transition-colors ${pathname === '/blog' ? 'bg-[#C17767] text-white' : 'bg-white text-[#4D463B] shadow-sm hover:bg-[#F2F0EB]'}`}
        >
          全部文章
        </Link>
        {sortedTags.map((t) => {
          const isActive = pathname.includes(`/tags/${slug(t)}`)
          return (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              className={`rounded-full px-4 py-1.5 font-sans text-sm font-medium transition-colors ${isActive ? 'bg-[#C17767] text-white' : 'bg-white text-[#4D463B] shadow-sm hover:bg-[#F2F0EB]'}`}
            >
              {t} <span className="ml-1 opacity-60">({tagCounts[t]})</span>
            </Link>
          )
        })}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((post, index) => {
          const { path, date, title, summary, tags, images } = post
          // Try to get cover image or use a default
          const coverImage =
            images && images.length > 0
              ? images[0]
              : 'https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800&auto=format&fit=crop'

          return (
            <motion.article
              key={path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={`/${path}`}
                className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100"
              >
                <img
                  src={coverImage}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#C17767]/0 mix-blend-multiply transition-colors group-hover:bg-[#C17767]/10" />
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center justify-between">
                  <time
                    dateTime={date}
                    className="font-sans text-xs font-medium tracking-wider text-[#677b63] uppercase"
                  >
                    {formatDate(date, siteMetadata.locale)}
                  </time>
                  <div className="flex gap-2">
                    {tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="font-sans text-xs text-[#C17767]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="mb-3 font-serif text-2xl leading-snug font-medium text-[#2C2C2A] transition-colors group-hover:text-[#C17767]">
                  <Link href={`/${path}`}>{title}</Link>
                </h2>

                <p className="line-clamp-3 font-sans text-sm leading-relaxed text-[#4D463B] opacity-80">
                  {summary}
                </p>

                <div className="mt-auto pt-6">
                  <Link
                    href={`/${path}`}
                    className="inline-flex items-center font-sans text-sm font-medium text-[#C17767] transition-colors hover:text-[#A66051]"
                  >
                    阅读全文
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>

      {displayPosts.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-[#2C2C2A]/50">这里还在酝酿中...</p>
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-16 flex justify-center border-t border-[#E6E3DB] pt-10">
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        </div>
      )}
    </div>
  )
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <nav className="flex items-center gap-4 font-sans text-sm font-medium">
      {!prevPage ? (
        <span className="text-gray-400">上一页</span>
      ) : (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          className="text-[#C17767] hover:underline"
        >
          上一页
        </Link>
      )}
      <span className="text-[#4D463B]">
        {currentPage} / {totalPages}
      </span>
      {!nextPage ? (
        <span className="text-gray-400">下一页</span>
      ) : (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          className="text-[#C17767] hover:underline"
        >
          下一页
        </Link>
      )}
    </nav>
  )
}
