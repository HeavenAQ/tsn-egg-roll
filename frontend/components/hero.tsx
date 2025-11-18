'use client'

import Image from "next/image"

export default function Hero() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              台湾の高級珍味で作った
            </h1>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#C85A54]">
              からすみエッグロール
            </h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            台湾産の高級からすみを使った、米と卵の香ばしい煎餅。伝統の味と現代のおいしさが融合した、贅沢な一品です。
          </p>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => handleScroll('pricing')}
              className="bg-[#C85A54] text-white px-8 py-3 rounded-full hover:bg-[#B34A47] transition-colors font-medium text-lg shadow-lg"
            >
              今すぐ購入
            </button>
          </div>
          <p className="text-sm text-gray-500 pt-2">2025年9月1日 販売開始</p>
        </div>

        {/* Right Image */}
        <div className="relative w-md mx-auto">
          <Image
            src="/eggroll-hero.webp"
            alt="からすみエッグロール"
            className="w-full rounded-2xl"
            width={500}
            height={500}
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#7FD8BE] to-[#5AC8A8] rounded-full opacity-30 blur-3xl"></div>
        </div>
      </div>
    </section>
  )
}
