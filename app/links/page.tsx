import ImageWithLoading from '@/components/image-with-loading'
import Link from 'next/link'
import { ExternalLink, ShoppingBag, Store } from 'lucide-react'

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F3] to-white">
      <main className="px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-[#E8D4CB]/60 shadow-md">
            <ImageWithLoading
              src="/egg-roll-feature.webp"
              alt="からすみエッグロール"
              width={256}
              height={256}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900">南海豊 からすみエッグロール</h1>
          <p className="mt-2 text-gray-600">公式購入リンク</p>

          <div className="mt-8 space-y-4">
            <Link
              href="https://www.amazon.co.jp/"
              target="_blank"
              className="flex items-center justify-between rounded-full bg-[#C85A54] text-white px-5 py-3 sm:px-6 sm:py-4 shadow hover:bg-[#B34A47] transition-colors"
            >
              <span className="flex items-center gap-3 text-base sm:text-lg font-medium">
                <ShoppingBag className="h-5 w-5" />
                Amazonで購入
              </span>
              <ExternalLink className="h-5 w-5 opacity-90" />
            </Link>

            <Link
              href="https://www.rakuten.co.jp/"
              target="_blank"
              className="flex items-center justify-between rounded-full border border-[#C85A54]/30 px-5 py-3 sm:px-6 sm:py-4 text-[#C85A54] hover:border-[#C85A54] hover:bg-[#C85A54]/5 transition-colors"
            >
              <span className="flex items-center gap-3 text-base sm:text-lg font-medium">
                <Store className="h-5 w-5" />
                楽天で購入
              </span>
              <ExternalLink className="h-5 w-5 opacity-70" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

