'use client'

export default function TargetAudience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <h3 className="text-[#C85A54] font-bold text-lg mb-2">想定ターゲット層</h3>
            <div className="w-24 h-1 bg-[#C85A54] mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-lg text-gray-900 mb-3">30代～60代の食通・グルメ層</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• 和食や珍味に興味があり、素材の質にこだわる人</li>
                <li>• 海外食文化に関心があり、台湾の食品にも興味を持つ層</li>
                <li>• お酒好き（特に日本酒、焼酎、ワイン）でおつまみにこだわる</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg text-gray-900 mb-3">高級ギフト・手土産を探している層</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• 上司や取引先への「少し珍しくても失礼のない贈り物」を探している人</li>
                <li>• 食べ物にこだわりがある親族や友人向けに、話題性のある選品を探している層</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg text-gray-900 mb-3">健康志向・自然派志向の食品を好む層</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• 小麦粉不使用・米使用などを好むグルテンフリー傾向のある人</li>
                <li>• 香料や添加物を控えた、素材そのものの味を重視する層</li>
              </ul>
            </div>
          </div>

          {/* Right Venn Diagram */}
          <div className="flex justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iyPAfTYkAqp3FNW8lkAPqNmSL0Be23.png"
              alt="想定ターゲット層"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
