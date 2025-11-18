'use client'

import Image from "next/image"

export default function BrandIntroduction() {
  return (
    <section id="brand" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <h3 className="text-[#C85A54] font-bold text-lg mb-2">ブランドの紹介</h3>
            <div className="w-24 h-1 bg-[#C85A54] mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center w-80 h-auto mx-auto mb-8">
            <Image
              src="/nan-hai-rich-brand.webp"
              alt="南海豊 NANHAIRICH"
              width={500}
              height={500}
            />
          </div>

          {/* Brand Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              南海豊 NANHAIRICH
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <span className="font-bold text-[#C85A54]">南海豊 NANHAIRICH</span> は、高雄・前鎮漁港で30年の実績を持つ海鮮専門ブランドです。
              </p>
              <p>
                初代の「新鮮さと家族の健康へのこだわり」を受け継ぎ、二代目がその味と想いを台湾全土、そして海外へと広げています。
              </p>
              <p>
                「漁港直送・簡単調理・幸せを届ける」を理念に、お土産ブランドやスナックブランドなども展開。台湾の海鮮文化を世界へ発信しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
