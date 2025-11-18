'use client'

export default function ProductBenefits() {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDF6F3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <h3 className="text-[#C85A54] font-bold text-lg mb-2">商品の特徴</h3>
            <div className="w-24 h-1 bg-[#C85A54] mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Benefits Image */}
          <div className="flex justify-center order-2 md:order-1">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3e2zhTgqfnbiwgB27Yz1cfXTJDCeEb.png"
              alt="商品の特徴"
              className="w-full max-w-md rounded-2xl shadow-lg"
            />
          </div>

          {/* Features Description */}
          <div className="space-y-6 order-1 md:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                こだわりの素材で作られた逸品
              </h2>
              <p className="text-gray-700 leading-relaxed">
                台湾伝統の圧縮天日干し製法で作られたからすみと、上質な農薬不使用の米、抗生物質不使用の卵を使用。すべて自然派志向で、保存料・膨張剤も不使用です。
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#7FD8BE] text-xl font-bold">✓</span>
                <span className="text-gray-800">グルテンフリー（小麦粉不使用）</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7FD8BE] text-xl font-bold">✓</span>
                <span className="text-gray-800">合成着色料不使用</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7FD8BE] text-xl font-bold">✓</span>
                <span className="text-gray-800">100% 自然素材</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
