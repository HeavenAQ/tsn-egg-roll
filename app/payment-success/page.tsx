import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { CheckCircle2, ArrowLeft } from 'lucide-react'

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const status = (sp?.redirect_status as string) || 'succeeded'
  const paymentIntent = (sp?.payment_intent as string) || ''

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F3] to-white flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="px-4 sm:px-6 lg:px-8 py-20 mt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#7FD8BE]/10 text-[#5AC8A8]">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              決済が完了しました
            </h1>
            <p className="mt-3 text-lg text-gray-700 font-medium">
              ご注文ありがとうございます。
            </p>
            <p className="mt-2 text-gray-600">
              確認メールをお送りしました。商品の発送準備が整い次第、改めてご連絡いたします。
            </p>

            {(status || paymentIntent) && (
              <div className="mt-6 inline-block rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                  <span className="font-semibold text-gray-700">ステータス:</span>
                  <span className="uppercase tracking-wide text-[#5AC8A8]">{status}</span>
                </div>
                {paymentIntent && (
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <span className="font-semibold text-gray-700">お支払いID:</span>
                    <span className="font-mono text-gray-800 break-all">{paymentIntent}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#C85A54] px-6 py-3 text-white hover:bg-[#B34A47] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                ホームに戻る
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-[#C85A54]/30 px-6 py-3 text-[#C85A54] hover:border-[#C85A54] hover:bg-[#C85A54]/5 transition-colors"
              >
                他の商品を見る
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
