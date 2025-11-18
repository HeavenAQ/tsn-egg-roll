import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { MapPinOff, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F3] to-white flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="px-4 sm:px-6 lg:px-8 py-20 mt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#C85A54]/10 text-[#C85A54]">
              <MapPinOff className="h-8 w-8" />
            </div>

            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">404</h1>
            <p className="mt-4 text-xl text-gray-700 font-semibold">ページが見つかりません</p>
            <p className="mt-2 text-gray-600">
              お探しのページは移動または削除された可能性があります。
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#C85A54] px-6 py-3 text-white hover:bg-[#B34A47] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                ホームに戻る
              </Link>
              <Link
                href="/links"
                className="inline-flex items-center gap-2 rounded-full border border-[#C85A54]/30 px-6 py-3 text-[#C85A54] hover:border-[#C85A54] hover:bg-[#C85A54]/5 transition-colors"
              >
                購入リンクへ
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
