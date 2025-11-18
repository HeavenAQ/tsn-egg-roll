'use client'

import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">南海豊 NANHAIRICH</h3>
            <p className="text-sm leading-relaxed">
              台湾の海鮮文化を世界へ発信する企業です。
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-[#7FD8BE] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#7FD8BE] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#7FD8BE] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold">クイックリンク</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#7FD8BE] transition-colors">
                  ホーム
                </a>
              </li>
              <li>
                <a href="#brand" className="hover:text-[#7FD8BE] transition-colors">
                  ブランド紹介
                </a>
              </li>
              <li>
                <a href="#product" className="hover:text-[#7FD8BE] transition-colors">
                  商品情報
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#7FD8BE] transition-colors">
                  価格プラン
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h4 className="text-white font-bold">情報</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#7FD8BE] transition-colors">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7FD8BE] transition-colors">
                  利用規約
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7FD8BE] transition-colors">
                  配送について
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7FD8BE] transition-colors">
                  返品・交換
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold">お問い合わせ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={16} className="flex-shrink-0 mt-0.5 text-[#7FD8BE]" />
                <span>072-284-9617</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="flex-shrink-0 mt-0.5 text-[#7FD8BE]" />
                <span>090-6829-2359</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="flex-shrink-0 mt-0.5 text-[#7FD8BE]" />
                <span>cassandra@twtsn.co.jp</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2025 南海豊 NANHAIRICH. All rights reserved.</p>
          <p className="text-gray-500">株式会社tsn 蔡欣珊</p>
        </div>
      </div>
    </footer>
  )
}
