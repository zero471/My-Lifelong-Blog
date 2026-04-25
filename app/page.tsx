import PolaroidGrid from '@/components/PolaroidGrid'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] pt-20">
      <div className="text-center max-w-2xl px-6 relative z-20">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-gray-900 dark:text-gray-100 mb-6">
          A first-year PhD student based in Shanghai.
        </h1>
        <p className="font-sans text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-light tracking-wide italic">
          Documenting life, thoughts, and memories.
        </p>
      </div>
      
      <div className="mt-16 w-full relative">
        <PolaroidGrid />
      </div>
    </div>
  )
}
