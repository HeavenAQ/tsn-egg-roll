'use client'

import ImageWithLoading from "./image-with-loading"

export default function BrandShowcase() {
  return (
    <section id="brands" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center justify-center w-80 h-auto mx-auto">
            <ImageWithLoading
              src="/wu-jin-wang-brand.webp"
              alt="烏金旺 WU JIN WANG"
              width={500}
              height={500}
            />
          </div>

          {/* Brand Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              烏金旺
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <span className="font-bold text-[#C85A54]">烏金旺（WU JIN WANG）</span> は、家族や家屋の繁栄を願う想いが込められたブランドです。
              </p>
              <p>
                原字は「烏」「金」「旺」の組み合わせで、古代の竹簡のような独特な書体で表現されており、複製不可の特別な感を演出します。
              </p>
              <p>
                家庭や家屋の繁栄、家庭運・財運・昇進を願う縁起の良いブランドとして、新築祝いや家のお売買、昇進祝いなどの贈答品としても好まれています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
