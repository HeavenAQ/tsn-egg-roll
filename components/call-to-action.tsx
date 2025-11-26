'use client'

export default function CallToAction() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#C85A54] to-[#D97063] text-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
          台湾の高級珍味の味わいを
          <br />
          今すぐ体験しませんか？
        </h2>
        <p className="text-xl text-white/90 leading-relaxed">
          からすみエッグロールは、伝統と現代が融合した特別な一品です。
          <br />
          家族の健康へのこだわり、そして幸せを届けるという思いが詰まっています。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button 
            onClick={() => handleScroll('pricing')}
            className="bg-white text-[#C85A54] px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-bold text-lg"
          >
            今すぐ購入する
          </button>
          <button 
            onClick={() => handleScroll('benefits')}
            className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-colors font-bold text-lg"
          >
            詳しい情報を見る
          </button>
        </div>
        <p className="text-sm text-white/70 pt-4">2025年9月1日 販売開始予定</p>
      </div>
    </section>
  )
}
