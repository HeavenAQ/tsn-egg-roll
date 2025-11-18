import Header from '@/components/header'
import Hero from '@/components/hero'
import ProductFeatures from '@/components/product-features'
import BrandIntroduction from '@/components/brand-introduction'
import BrandShowcase from '@/components/brand-showcase'
import ProductBenefits from '@/components/product-benefits'
import Testimonials from '@/components/testimonials'
import Pricing from '@/components/pricing'
import CallToAction from '@/components/call-to-action'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F3] to-white">
      <Header />
      <Hero />
      <ProductBenefits />
      <BrandIntroduction />
      <BrandShowcase />
      <ProductFeatures />
      <Testimonials />
      <Pricing />
      <CallToAction />
      <Footer />
    </div>
  )
}
