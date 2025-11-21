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
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiryType: formData.inquiryType,
          message: formData.message,
        }),
      })

      if (!res.ok) throw new Error('Failed to send')

      setSubmitted(true)
      setFormData({
        companyName: '',
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
      })
    } catch (err) {
      console.error(err)
      setError('送信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F3] to-white flex flex-col">
      <Header />
      <section className="py-20 px-4 sm:px-6 lg:px-8 pt-32 flex-1">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            エンタープライズプラン
          </h1>
          <p className="text-lg text-gray-600 mb-12 text-center">
            法人・大量購入のご相談はこちら
          </p>

          <div className="bg-white rounded-xl border-2 border-[#C85A54] p-8 md:p-12">
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
                    disabled={sending}
                    className={`w-full py-3 rounded-lg font-bold text-lg transition-colors ${sending ? 'bg-gray-400 text-white' : 'bg-[#C85A54] text-white hover:bg-[#B34A47]'}`}
                  >
                    {sending ? '送信中…' : '送信する'}
                  </button>

                  {error && (
                    <div className="text-red-600 text-sm">{error}</div>
                  )}

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <p className="text-blue-900 text-sm font-medium">
                      💡送信いただいたデータは info@twtsn.co.jp に送られます
                    </p>
                  </div>
                </form>
              )}
            </>
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
