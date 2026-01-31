'use client'

import { Button } from '@heroui/button'
import { Card, CardBody } from '@heroui/card'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/Footer'
import { useUpload } from '@/context/UploadContext'

export default function Home() {
  const router = useRouter()
  const { addFiles } = useUpload()
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)

      addFiles(droppedFiles)
      router.push('/upload')
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-12">
        <section className="flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-zinc-900 dark:text-zinc-50">
              Shoe Health <span className="text-primary">Analysis</span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              AI-powered wear detection for your running gear.
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <div onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
              <Card
                className={`border-none bg-transparent shadow-hero-light dark:shadow-hero transition-transform duration-200 ${
                  isDragging ? 'scale-[1.02] ring-2 ring-primary' : ''
                }`}
                radius="lg"
              >
                <CardBody className="p-0 relative overflow-hidden bg-card-light dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 opacity-100 z-0" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center size-24 md:size-32 rounded-3xl bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20">
                        <span className="material-symbols-outlined text-[48px] md:text-[64px]">
                          cloud_upload
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                      <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                          Upload Outsole Photos
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          Drag and drop your images here to start the analysis. We support
                          high-resolution JPG and PNG formats up to 10MB.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start">
                        <Button
                          className="shadow-lg shadow-primary/20 font-medium px-6"
                          color="primary"
                          size="lg"
                          startContent={
                            <span className="material-symbols-outlined text-[20px]">
                              add_photo_alternate
                            </span>
                          }
                          onPress={() => router.push('/upload')}
                        >
                          Select Files
                        </Button>
                        <Button
                          className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 font-medium px-6"
                          size="lg"
                          variant="flat"
                        >
                          Use Camera
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`absolute inset-4 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 pointer-events-none transition-colors ${isDragging ? 'border-primary bg-primary/5' : ''}`}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
        {/* <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Recent Shoes
            </h2>
            <a
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-primary/10"
              href="#"
            >
              View History{' '}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="group relative flex flex-col rounded-2xl bg-card-light dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 pb-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAf2lCiqv6H_dOP5Z61dQyJhapeXr8cZgZb1bzpBwy48dw1CTAN1fBR00RCt4ZtJ9K3BQ-QzB0YMy7k217ntRe2ahFGWr-1y0VFVbMhAj6j45qpIsRruYSv911OT_lUqY5VXbc4ntasWLHlTeKt-_krVM_LtrGWSbBYHOqjLSSX2UbLU0H-JKuMTZBGmzYqB_zHOlkVl-bXnD-iCPjiF__-Rhl26eR33dTlIeOIzBLIN1TExZaBsesoodlU3RbBZOXYGl3Sc5M3h5s')"
                    }}
                  ></div>
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold border border-green-500/20 backdrop-blur-md">
                      Good
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 flex-1">
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-50 truncate">
                    Nike Air Zoom Pegasus
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Analyzed 2h ago
                  </p>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Health</span>
                    <span className="font-medium text-green-500">85%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-zinc-500">Est. Mileage</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">
                      ~120 mi
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3 pt-0 mt-auto">
                <button className="w-full py-2 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
            <div className="group relative flex flex-col rounded-2xl bg-card-light dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 pb-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVCnyskRBwRTRjItU_CVm6V0ig3aRUYEbvlxdEG23C8GgvhP1t1Q4Tma2q25MaOGRAkaMBzOHnsNQzP45EvJLKzZh3eqtkguUBZWT5BRADXFBttN2SJ8EymlXdUblFP132pguMdDpSmQMpdieMI7Oy1PdC1qCKIPGKNqjOz0OxeAqbC1Xsav99q6T22m1e8C9jAHyJyu_wKSB4KRDP-2x20IzWPkxyTnb0epYYR4RhpKPhrz077JCB1kRJnogXP9Jy2YrKR9JcdIY')"
                    }}
                  ></div>
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold border border-yellow-500/20 backdrop-blur-md">
                      Moderate
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 flex-1">
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-50 truncate">
                    Saucony Endorphin
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Yesterday
                  </p>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Health</span>
                    <span className="font-medium text-yellow-500">45%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-yellow-500"
                      style={{ width: '45%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-zinc-500">Est. Mileage</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">
                      ~310 mi
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3 pt-0 mt-auto">
                <button className="w-full py-2 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
            <div className="group relative flex flex-col rounded-2xl bg-card-light dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 pb-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXAH3bmHhaUvcq8-qAU3bFFGwOQ8pkTLt2oUdlx00U4zAEy0_dOCSNET7EGq7FJQS6TG8PLk-AHbY7mrJZ0mILz27LqM0WShazAhLNj7avmElOcjqZQC4NRMdcaNnHfV3WLlK1DpEuNDUOPdhna9Ed_VQn9PTu_zgp7cD4Kf2cjBAy9SIDFYUkTHFVIx0h6FuRGtMdsXiVAjdWXCHC4xRf3pTayqXvG5qke18Yc-r-WnpT_T1W4RE3glGMaRKoOgHlLq7sII8aLfE')"
                    }}
                  ></div>
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold border border-red-500/20 backdrop-blur-md">
                      Worn Out
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 flex-1">
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-50 truncate">
                    Hoka Clifton 8
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    3 days ago
                  </p>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Health</span>
                    <span className="font-medium text-red-500">12%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{ width: '12%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-zinc-500">Est. Mileage</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">
                      ~480 mi
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3 pt-0 mt-auto">
                <button className="w-full py-2 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
            <div className="group relative flex flex-col justify-center items-center rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/5 transition-all duration-300 cursor-pointer h-full min-h-[300px]">
              <div className="flex items-center justify-center size-12 rounded-full bg-white dark:bg-zinc-800 shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-zinc-400 dark:text-zinc-500 group-hover:text-primary">
                  add
                </span>
              </div>
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-primary">
                Add New Shoe
              </span>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  )
}
