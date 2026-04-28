// Travel destination data
// Add your visited locations here with coordinates, memories and photos

export interface TravelLocation {
  id: string
  name: string
  nameZh: string
  coordinates: [number, number] // [longitude, latitude]
  date: string
  description: string
  photos: string[]
  blogSlug?: string // optional link to a detailed MDX blog post
}

const travelLocations: TravelLocation[] = [
  {
    id: 'shanghai',
    name: 'Shanghai',
    nameZh: '上海',
    coordinates: [121.4737, 31.2304],
    date: '2025 - Present',
    description: '我的博士生活开始的地方。这座城市永远不会让人感到无聊。',
    photos: [
      'https://images.unsplash.com/photo-1537531383496-f4749b26a79b?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?q=80&w=500&auto=format&fit=crop',
    ],
    blogSlug: 'shanghai-first-impressions',
  },
  {
    id: 'beijing',
    name: 'Beijing',
    nameZh: '北京',
    coordinates: [116.4074, 39.9042],
    date: '2024',
    description: '古老而又现代的首都，故宫、胡同、和那碗炸酱面。',
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=500&auto=format&fit=crop',
    ],
  },
  {
    id: 'hangzhou',
    name: 'Hangzhou',
    nameZh: '杭州',
    coordinates: [120.1551, 30.2741],
    date: '2024',
    description: '西湖边的诗意，龙井茶的清香。',
    photos: [
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=500&auto=format&fit=crop',
    ],
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    nameZh: '东京',
    coordinates: [139.6917, 35.6895],
    date: '2023',
    description: '秩序与混乱的完美平衡，涩谷的十字路口永远让人心跳加速。',
    photos: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=500&auto=format&fit=crop',
    ],
  },
]

export default travelLocations
