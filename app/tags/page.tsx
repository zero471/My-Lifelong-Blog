import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const CORE_DOMAINS = ['thoughts', 'experiences', 'goods', 'travel', 'cooking', 'fitness']
  const coreTags = sortedTags.filter((t) => CORE_DOMAINS.includes(t.toLowerCase()))
  const subTags = sortedTags.filter((t) => !CORE_DOMAINS.includes(t.toLowerCase()))

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-[#E6E3DB] md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-[#2C2C2A] sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-col gap-6 pt-6 pb-8">
          {tagKeys.length === 0 && 'No tags found.'}

          <div className="flex flex-wrap">
            {coreTags.map((t) => (
              <div key={t} className="mt-2 mr-5 mb-2">
                <Tag text={t} />
                <Link
                  href={`/tags/${slug(t)}`}
                  className="-ml-2 text-sm font-semibold text-[#4D463B]/60 uppercase dark:text-gray-300"
                  aria-label={`View posts tagged ${t}`}
                >
                  {` (${tagCounts[t]})`}
                </Link>
              </div>
            ))}
          </div>

          {subTags.length > 0 && (
            <>
              <div className="my-2 h-px w-full bg-[#E6E3DB] dark:bg-gray-700" />
              <div className="flex flex-wrap">
                {subTags.map((t) => (
                  <div key={t} className="mt-2 mr-5 mb-2">
                    <Tag text={t} />
                    <Link
                      href={`/tags/${slug(t)}`}
                      className="-ml-2 text-sm font-semibold text-[#4D463B]/60 uppercase dark:text-gray-300"
                      aria-label={`View posts tagged ${t}`}
                    >
                      {` (${tagCounts[t]})`}
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
