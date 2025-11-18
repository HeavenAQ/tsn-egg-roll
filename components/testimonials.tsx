'use client'

export default function Testimonials() {
  const testimonials = [
    {
      name: '田中太郎 様',
      role: '会社員 (50代)',
      text: 'からすみの風味が素晴らしく、何度もリピートしています。高級感があるのにどこか親しみやすい味わいが好きです。',
      rating: 5,
    },
    {
      name: '鈴木美咲 様',
      role: 'グルメライター (40代)',
      text: '台湾からすみの豊かな風味と、米の優しい香ばしさの調和が完璧です。ギフトとしても何度も利用させていただいています。',
      rating: 5,
    },
    {
      name: '佐藤健太 様',
      role: '食品業界 (60代)',
      text: '素材の質にこだわりを感じられます。無添加、グルテンフリーという点も、現代の消費者ニーズに合致していますね。',
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDF6F3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <h3 className="text-[#C85A54] font-bold text-lg mb-2">お客様の声</h3>
            <div className="w-24 h-1 bg-[#C85A54] mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-[#C85A54]">★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{testimonial.text}</p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
