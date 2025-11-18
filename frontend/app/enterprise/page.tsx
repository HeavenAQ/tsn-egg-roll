'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import GoogleAuth from '@/components/google-auth'

export default function EnterprisePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Enterprise form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        companyName: '',
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F3] to-white">
      <Header />
      <section className="py-20 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            エンタープライズプラン
          </h1>
          <p className="text-lg text-gray-600 mb-12 text-center">
            法人・大量購入のご相談はこちら
          </p>

          <div className="bg-white rounded-xl border-2 border-[#C85A54] p-8 md:p-12">
            {!isLoggedIn ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ログインしてお問い合わせ
                  </h2>
                  <p className="text-gray-600">
                    Googleアカウントでログインすると、情報が自動入力されます
                  </p>
                </div>

                <GoogleAuth />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">または</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                >
                  メールアドレスでログイン
                </button>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 text-sm font-medium">
                    💡 Googleでログインするとプロフィール情報が自動入力され、より速くお問い合わせできます
                  </p>
                </div>
              </div>
            ) : (
              <>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">✓</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      送信完了しました
                    </h2>
                    <p className="text-gray-600 mb-2">
                      info@twtsn.co.jp にご連絡を送信いたしました。
                    </p>
                    <p className="text-gray-500 text-sm">
                      担当者より3営業日以内にご連絡させていただきます。
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        企業名 <span className="text-[#C85A54]">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#C85A54] focus:outline-none"
                        placeholder="株式会社〇〇"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          お名前 <span className="text-[#C85A54]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#C85A54] focus:outline-none"
                          placeholder="山田太郎"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          メールアドレス <span className="text-[#C85A54]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#C85A54] focus:outline-none"
                          placeholder="example@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        電話番号 <span className="text-[#C85A54]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#C85A54] focus:outline-none"
                        placeholder="09-XXXX-XXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        お問い合わせ内容 <span className="text-[#C85A54]">*</span>
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#C85A54] focus:outline-none"
                      >
                        <option value="">選択してください</option>
                        <option value="bulk-order">大量購入</option>
                        <option value="custom-package">カスタムパッケージ</option>
                        <option value="partnership">提携・パートナーシップ</option>
                        <option value="other">その他</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        ご質問・ご要望 <span className="text-[#C85A54]">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#C85A54] focus:outline-none resize-none"
                        placeholder="ご質問やご要望をお聞かせください..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#C85A54] text-white py-3 rounded-lg font-bold hover:bg-[#B34A47] transition-colors text-lg"
                    >
                      送信する
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      送信いただいたデータは info@twtsn.co.jp に送られます
                    </p>
                  </form>
                )}
              </>
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
