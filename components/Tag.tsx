import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const formatTag = (text: string) => {
  const normalized = text.toLowerCase().replace(/ /g, '-')
  if (normalized === 'ai') return 'AI'
  if (normalized === 'mac-settings') return 'Mac-Settings'
  
  return text
    .split(/[- ]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-')
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium text-[#C17767] hover:text-[#A66051] transition-colors"
    >
      #{formatTag(text)}
    </Link>
  )
}

export default Tag
