import PolaroidGrid from '@/components/PolaroidGrid'
import MouseEffect from '@/components/MouseEffect'

export default function Page() {
  return (
    <>
      <MouseEffect />
      <div className="flex min-h-[85vh] flex-col items-center justify-center pt-20">
        <div className="relative z-20 max-w-2xl px-6 text-center">
          <h1 className="mb-6 font-serif text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
            Hi! Welcome to my life.
          </h1>
          <div className="flex flex-col space-y-3 font-sans text-lg font-light tracking-wide text-gray-500 italic sm:text-xl dark:text-gray-400">
            <p>Documenting life, thoughts, and memories.</p>
            <p>A first-year PhD student based in Shanghai.</p>
          </div>
        </div>

        <div className="relative mt-16 w-full">
          <PolaroidGrid />
        </div>
      </div>
    </>
  )
}
