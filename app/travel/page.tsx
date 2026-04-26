import TravelMap from '@/components/TravelMap'
import travelLocations from '@/data/travelLocations'

export const metadata = {
  title: 'Travel',
  description: '我走过的地方，以及那些地方的记忆。',
}

export default function TravelPage() {
  const locationCount = travelLocations.length

  return (
    <div className="min-h-[80vh] py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-medium tracking-tight text-[#2C2C2A] sm:text-5xl">
          足迹
        </h1>
        <p className="mt-4 font-sans text-base text-gray-500">{locationCount} 个城市，无数段记忆</p>
        <div className="mx-auto mt-6 h-px w-16 bg-[#C17767]/40" />
      </div>

      {/* Map */}
      <TravelMap />

      {/* Location list */}
      <div className="mt-16">
        <h2 className="mb-8 font-serif text-2xl font-medium text-[#2C2C2A]">所有足迹</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {travelLocations.map((location) => (
            <div
              key={location.id}
              className="group rounded-xl border border-gray-200 bg-white/60 p-5 transition-all hover:border-[#C17767]/30 hover:shadow-md"
            >
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#C17767] uppercase">
                {location.date}
              </span>
              <h3 className="mt-2 font-serif text-xl font-medium text-[#2C2C2A]">
                {location.nameZh}
              </h3>
              <p className="mt-0.5 font-sans text-xs text-gray-500">{location.name}</p>
              <p className="mt-3 line-clamp-2 font-sans text-sm leading-relaxed text-gray-600">
                {location.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
