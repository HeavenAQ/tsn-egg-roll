'use client'

import Image from 'next/image'

export default function ProductFeatures() {
  const features = [
    { icon: '✓', text: '台湾伝統の天日干し「からすみ」使用' },
    { icon: '✓', text: '無添加・グルテンフリー（小麦粉不使用）' },
    { icon: '✓', text: '農薬不使用の高品質米使用' },
    { icon: '✓', text: '抗生物質不使用の卵を使用' },
    { icon: '✓', text: '手作りならではの軽やかな食感と風味' },
    { icon: '✓', text: 'ギフトにも対応する高級感あるパッケージ' },
  ]

  return (
    <section id="product" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDF6F3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <h3 className="text-[#C85A54] font-bold text-lg mb-2">商品の特長</h3>
            <div className="w-24 h-1 bg-[#C85A54] mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-[#7FD8BE] text-2xl font-bold flex-shrink-0 w-8">
                  {feature.icon}
                </span>
                <p className="text-gray-800 font-medium pt-1">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Product Image */}
          <div className="flex justify-center">
            <Image
              src="/egg-roll-feature.webp"
              alt="商品の特長"
              className="w-full max-w-md rounded-2xl"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
