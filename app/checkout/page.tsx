'use client'

import { useCallback, useEffect, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import GoogleAuth from '@/components/google-auth'
import GoogleAddressAutocomplete from '@/components/google-address-autocomplete'
import { toast } from '@/lib/toast'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

interface AddressComponents {
  street: string
  apartment: string
  city: string
  state: string
  postalCode: string
  country: string
}

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [address, setAddress] = useState<AddressComponents>({
    street: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })
  const [paymentInfo, setPaymentInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  // Google Maps API key from environment variable
  // Can be configured to fetch from GCP Secret Manager in the future
  // Note: Client-side env vars in Next.js must be prefixed with NEXT_PUBLIC_
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '')
  const [clientSecret, setClientSecret] = useState<string>("")

  const PRICE_PER_UNIT = 1500
  const total = PRICE_PER_UNIT * quantity

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value > 0) setQuantity(value)
  }

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = useCallback((newAddress: AddressComponents) => {
    setAddress(prev => {
      if (
        prev.street === newAddress.street &&
        prev.apartment === newAddress.apartment &&
        prev.city === newAddress.city &&
        prev.state === newAddress.state &&
        prev.postalCode === newAddress.postalCode &&
        prev.country === newAddress.country
      ) {
        return prev
      }
      return newAddress
    })
  }, [])

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('Checkout submitted:', {
      quantity,
      total,
      address,
      paymentInfo,
      timestamp: new Date().toISOString()
    })
    // Backend will handle Stripe integration
    toast.success('お問い合わせありがとうございます。確認メールをお送りします。')
  }

  // Create a PaymentIntent on backend when amount/quantity changes
  useEffect(() => {
    if (!isLoggedIn) return
    const items = [...Array(quantity).keys()].map((e) => ({ id: String(e), amount: PRICE_PER_UNIT }))
    fetch(`${BACKEND}/api/v1/payment/stripe/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.client_secret) setClientSecret(data.client_secret)
      })
      .catch(() => {/* noop for now */ })
  }, [isLoggedIn, quantity])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F3] to-white">
      <Header />
      <section className="py-20 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            からすみエッグロール ご注文
          </h1>
          <p className="text-lg text-gray-600 mb-12 text-center">
            単価：¥{PRICE_PER_UNIT.toLocaleString()}
          </p>

          {!isLoggedIn ? (
            <div className="bg-white rounded-xl border-2 border-[#C85A54] p-8 md:p-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ご注文にはログインが必要です
                  </h2>
                  <p className="text-gray-600">
                    Googleアカウントでセキュアにログインできます
                  </p>
                </div>

                <GoogleAuth onSuccess={() => setIsLoggedIn(true)} />


                <p className="text-xs text-gray-500 text-center">
                  ログインすることで、利用規約に同意したことになります
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Checkout Form */}
              <div className="md:col-span-2 space-y-6">
                {/* Quantity Selection */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6 lg:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    数量を選択
                  </h2>
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-medium">数量：</label>
                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-20 text-center py-2 border-l-2 border-r-2 border-gray-300 font-bold"
                        min="1"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        ＋
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6 lg:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    配送先情報
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={paymentInfo.fullName}
                        onChange={handlePaymentInfoChange}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#C85A54]"
                        placeholder="山田太郎"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          電話番号 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={paymentInfo.phone}
                          onChange={handlePaymentInfoChange}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#C85A54]"
                          placeholder="090-1234-5678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          メールアドレス <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={paymentInfo.email}
                          onChange={handlePaymentInfoChange}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#C85A54]"
                          placeholder="yamada@example.com"
                        />
                      </div>
                    </div>

                    <div className="border-t-2 border-gray-200 pt-4 mt-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        配送先住所
                      </h3>
                      <GoogleAddressAutocomplete
                        onAddressChange={handleAddressChange}
                        initialAddress={address}
                        apiKey={GOOGLE_MAPS_API_KEY}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}

                {clientSecret && (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'flat',
                        variables: {
                          colorPrimary: '#C85A54',
                          colorBackground: '#ffffff',
                          colorText: '#111827',
                          colorDanger: '#ef4444',
                          borderRadius: '12px',
                          spacingUnit: '6px',
                          fontSizeBase: '16px',
                        },
                        rules: {
                          '.Input': {
                            border: '2px solid #e5e7eb',
                            padding: '12px',
                            boxShadow: 'none',
                          },
                          '.Input:focus': {
                            borderColor: '#C85A54',
                            boxShadow: '0 0 0 1px #C85A54',
                          },
                          '.Tab': {
                            border: '2px solid #e5e7eb',
                          },
                          '.Tab--selected': {
                            borderColor: '#C85A54',
                          },
                          '.Label': {
                            color: '#374151',
                            fontWeight: '600',
                          },
                        },
                      },
                    }}
                  >
                    <PaymentInformation />
                  </Elements>
                )}
              </div>

              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="sticky top-32 bg-white rounded-xl border-2 border-[#C85A54] p-6 lg:p-8 h-fit">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    注文確認
                  </h2>

                  <div className="space-y-4 mb-6 pb-6 border-b-2 border-gray-200">
                    <div className="flex justify-between text-gray-700">
                      <span>からすみエッグロール 100g</span>
                      <span>¥{PRICE_PER_UNIT.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>数量</span>
                      <span className="font-bold">{quantity}個</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-2xl font-bold text-[#C85A54]">
                      <span>合計</span>
                      <span>¥{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#C85A54] text-white py-4 rounded-lg font-bold hover:bg-[#B34A47] transition-colors"
                  >
                    注文を確定する
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    セキュアな決済処理が行われます
                  </p>
                </div>
              </div>
            </div>
          )}

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

const PaymentInformation = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/payment-success` },
    })

    if (result.error) {
      console.error(result.error.message)
      toast.error(result.error.message || 'エラーが発生しました')
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 lg:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">お支払い情報</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['google_pay', 'apple_pay', 'card'],
            wallets: {
              applePay: 'auto',
              googlePay: 'auto',
              link: 'never',
            },
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className="w-full bg-[#C85A54] text-white py-3 rounded-lg font-bold hover:bg-[#B34A47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '処理中…' : '支払う'}
        </button>
      </form>
      <p className="text-xs text-gray-500 text-center mt-3">カード情報は安全に暗号化されます</p>
    </div>
  )
}
