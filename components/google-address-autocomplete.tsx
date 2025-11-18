'use client'

import { useEffect, useMemo, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Marker } from '@vis.gl/react-google-maps'

export interface AddressComponents {
  street: string        // 丁目・番地
  apartment: string     // 建物名・部屋番号
  city: string          // 市区町村
  state: string         // 都道府県
  postalCode: string    // 郵便番号 (7 digits, no hyphen)
  country: string       // 国名 (日本)
}

interface GoogleAddressAutocompleteProps {
  onAddressChange?: (address: AddressComponents) => void   // ← make optional & safe
  initialAddress?: AddressComponents
  apiKey: string
  mapId?: string
}

/**
 * Internal address representation in Japanese order.
 */
interface JapanAddress {
  postalCode: string
  state: string
  city: string
  town: string
  street: string
  apartment: string
  country: string
}

const DEFAULT_CENTER = { lat: 35.681236, lng: 139.767125 } // Tokyo Station

export default function GoogleAddressAutocomplete({
  onAddressChange,
  initialAddress,
  apiKey,
  mapId,
}: GoogleAddressAutocompleteProps) {
  const [addr, setAddr] = useState<JapanAddress>(() => ({
    postalCode: initialAddress?.postalCode ?? '',
    state: initialAddress?.state ?? '',
    city: initialAddress?.city ?? '',
    town: '',
    street: initialAddress?.street ?? '',
    apartment: initialAddress?.apartment ?? '',
    country: initialAddress?.country ?? '日本',
  }))

  const [center, setCenter] = useState<{ lat: number; lng: number }>(DEFAULT_CENTER)
  const [isGeocoding, setIsGeocoding] = useState(false)

  // --------------------------------------------------
  // Convert internal JapanAddress → external AddressComponents
  // --------------------------------------------------
  const toExternalAddress = (next: JapanAddress): AddressComponents => {
    const { postalCode, state, city, street, apartment, country } = next
    const streetLine = street // could also prepend town if you want

    return {
      street: streetLine,
      apartment,
      city,
      state,
      postalCode,
      country,
    }
  }

  // --------------------------------------------------
  // Notify parent WHENEVER addr changes (after render)
  // --------------------------------------------------
  useEffect(() => {
    if (typeof onAddressChange === 'function') {
      onAddressChange(toExternalAddress(addr))
    }
    // Intentionally not depending on onAddressChange to avoid effect churn
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addr])

  // --------------------------------------------------
  // Local state update helper (no parent call here!)
  // --------------------------------------------------
  const updateAddress = (patch: Partial<JapanAddress>) => {
    setAddr(prev => ({ ...prev, ...patch }))
  }

  // --------------------------------------------------
  // JP POST ZipCloud: ZIP → Prefecture / City / Town
  // --------------------------------------------------
  const lookupZip = async (zip: string) => {
    // keep postalCode in state even if lookup fails
    updateAddress({ postalCode: zip })

    if (zip.length !== 7) return

    try {
      const res = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`
      )
      const data = await res.json()

      if (!data.results || data.results.length === 0) return

      const r = data.results[0]

      updateAddress({
        postalCode: zip,               // keep it
        state: r.address1 ?? '',       // 都道府県
        city: r.address2 ?? '',        // 市区町村
        town: r.address3 ?? '',        // 町域
      })
    } catch (e) {
      console.error('ZIP lookup failed:', e)
    }
  }

  // --------------------------------------------------
  // Build full address string for geocoding
  // --------------------------------------------------
  const fullAddressForGeocode = useMemo(() => {
    const parts = [
      addr.country || '日本',
      addr.state,
      addr.city,
      addr.town,
      addr.street,
      addr.postalCode ? `〒${addr.postalCode}` : '',
    ].filter(Boolean)

    return parts.join(' ')
  }, [addr])

  // --------------------------------------------------
  // Geocode using HTTP Geocoding API
  // --------------------------------------------------
  const geocodeAddress = async () => {
    if (!apiKey) return
    const q = fullAddressForGeocode.trim()
    if (!q) return

    try {
      setIsGeocoding(true)
      const encoded = encodeURIComponent(q)
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`
      )
      const data = await res.json()

      if (data.status === 'OK' && data.results && data.results.length > 0) {
        const loc = data.results[0].geometry.location
        setCenter({ lat: loc.lat, lng: loc.lng })
      } else {
        console.error('Geocode failed:', data.status, data.error_message)
      }
    } catch (e) {
      console.error('Geocode error:', e)
    } finally {
      setIsGeocoding(false)
    }
  }

  // Auto-geocode when enough info available
  useEffect(() => {
    if (
      addr.postalCode.length === 7 &&
      addr.state &&
      addr.city &&
      addr.street
    ) {
      void geocodeAddress()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addr.postalCode, addr.state, addr.city, addr.street])

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="space-y-4">
      {/* 1. 郵便番号 + 都道府県 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 郵便番号 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            郵便番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={7}
            value={addr.postalCode}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '')
              updateAddress({ postalCode: v })
              void lookupZip(v)
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#C85A54]"
            placeholder="例: 1060044"
          />
          <p className="mt-1 text-xs text-gray-500">
            郵便番号を入力すると 都道府県・市区町村・町域 が自動入力されます
          </p>
        </div>

        {/* 都道府県 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            都道府県 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={addr.state}
            onChange={(e) => updateAddress({ state: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#C85A54]"
            placeholder="例: 東京都"
          />
        </div>
      </div>

      {/* 2-3. 市区町村・町域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            市区町村 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={addr.city}
            onChange={(e) => updateAddress({ city: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#C85A54]"
            placeholder="例: 港区"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            町域
          </label>
          <input
            type="text"
            value={addr.town}
            onChange={(e) => updateAddress({ town: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#C85A54]"
            placeholder="例: 東麻布"
          />
        </div>
      </div>

      {/* 4-5. 丁目・番地・建物名 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            丁目・番地 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={addr.street}
            onChange={(e) => updateAddress({ street: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#C85A54]"
            placeholder="例: 1-8-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            建物名・部屋番号
          </label>
          <input
            type="text"
            value={addr.apartment}
            onChange={(e) => updateAddress({ apartment: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#C85A54]"
            placeholder="例: 東麻布ISビル4F"
          />
        </div>
      </div>

      {/* 6. 地図 */}
      <div className="mt-6 lg:mt-8 space-y-2 lg:space-y-3">
        <div className="flex items-center justify-between gap-2">
          <label className="block text-sm font-medium text-gray-700">
            地図
          </label>
          <button
            type="button"
            onClick={geocodeAddress}
            disabled={!apiKey || isGeocoding}
            className="text-xs px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeocoding ? '更新中...' : 'この住所で地図を更新'}
          </button>
        </div>

        <div className="w-full h-64 md:h-72 lg:h-96 rounded-lg border border-gray-200 overflow-hidden bg-gray-100">
          {apiKey ? (
            <APIProvider apiKey={apiKey} libraries={["marker"]}>
              <Map
                defaultZoom={15}
                defaultCenter={DEFAULT_CENTER}
                center={center}
                mapId={mapId || undefined}
                gestureHandling="greedy"
                disableDefaultUI={true}
                style={{ width: '100%', height: '100%' }}
              >
                {mapId ? (
                  <AdvancedMarker position={center} />
                ) : (
                  <Marker position={center} />
                )}
              </Map>
            </APIProvider>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xs text-gray-500">
                Google Maps APIキーが設定されていないため、地図を表示できません。
              </p>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 break-all">
          現在の住所: {fullAddressForGeocode || '未入力'}
        </p>
      </div>
    </div>
  )
}
