'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import GoogleAuth from '@/components/google-auth'

export default function StripePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F3] to-white">
      <Header />
      <section className="py-20 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            パーソナルプラン
          </h1>
          <p className="text-lg text-gray-600 mb-12 text-center">
            からすみエッグロール 100g - ¥2,500
          </p>

          <div className="bg-white rounded-xl border-2 border-[#C85A54] p-8 md:p-12">
            {!isLoggedIn ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ご購入にはログインが必要です
                  </h2>
                  <p className="text-gray-600">
                    Googleアカウントでセキュアにログインできます
                  </p>
                </div>

                <GoogleAuth />
                <p className="text-xs text-gray-500 text-center">
                  ログインすることで、利用規約に同意したことになります
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-[#FDF6F3] to-[#F5E6E0] rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    商品内容
                  </h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-3">
                      <span className="text-[#7FD8BE] text-xl">✓</span>
                      からすみエッグロール 100g
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#7FD8BE] text-xl">✓</span>
                      簡易パッケージ
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#7FD8BE] text-xl">✓</span>
                      送料別
                    </li>
                  </ul>
                </div>

                <div className="border-t-2 border-gray-200 pt-6">
                  <p className="text-3xl font-bold text-[#C85A54] mb-6">
                    ¥2,500
                  </p>

                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                    <p className="text-gray-600 mb-4 font-medium">
                      🔐 Stripe チェックアウト
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      このスペースにStripe決済フォームが表示されます
                    </p>
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white px-6 py-3 rounded-lg font-bold cursor-not-allowed"
                    >
                      チェックアウト（バックエンド実装待ち）
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Stripe決済はバックエンド（Go）で実装してください
                  </p>
                </div>
              </div>
            )}
          </div>

          <a href="/">
            <button className="text-[#C85A54] font-bold hover:underline mt-8">
              ← ホームに戻る
            </button>
          </a>
        </div>
      </section>
      <Footer />
    </div>
  )
}
