'use client'

import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: 'パーソナル',
      price: '¥2,500',
      description: '個人購入向け',
      items: [
        'からすみエッグロール 100g',
        '簡易パッケージ',
        '送料別',
      ],
      popular: true,
      href: '/checkout', // changed from Stripe official page to custom checkout page
    },
    {
      name: 'エンタープライズ',
      price: 'カスタム',
      description: '法人・大量購入向け',
      items: [
        'カスタムパッケージ対応',
        '配送手配',
        '専任担当者サポート',
      ],
      popular: false,
      href: '/enterprise',
    },
  ]

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <h3 className="text-[#C85A54] font-bold text-lg mb-2">価格プラン</h3>
            <div className="w-24 h-1 bg-[#C85A54] mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl p-8 transition-all ${plan.popular
                ? 'bg-[#C85A54] text-white shadow-2xl'
                : 'bg-white border-2 border-gray-200 text-gray-900'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#7FD8BE] text-[#C85A54] px-4 py-1 rounded-full text-sm font-bold">
                  おすすめ
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <div className={`text-4xl font-bold mb-6 ${plan.popular ? 'text-white' : 'text-[#C85A54]'}`}>
                {plan.price}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`${plan.popular ? 'text-[#7FD8BE]' : 'text-[#7FD8BE]'}`}>✓</span>
                    <span className={plan.popular ? 'text-white' : 'text-gray-700'}>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-colors ${plan.popular
                    ? 'bg-white text-[#C85A54] hover:bg-gray-100'
                    : 'bg-[#C85A54] text-white hover:bg-[#B34A47]'
                    }`}
                >
                  {plan.popular ? '今すぐ購入' : 'お問い合わせ'}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
