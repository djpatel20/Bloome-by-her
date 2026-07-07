import { Seo } from '@/components/common/Seo'
import { Hero } from './components/Hero'
import { BannerCarousel } from './components/BannerCarousel'
import { CategoriesSection } from './components/CategoriesSection'
import { BestSellersSection } from './components/BestSellersSection'
import { WhyChooseUs } from './components/WhyChooseUs'
import { TestimonialsSection } from './components/TestimonialsSection'
import { InstagramGallery } from './components/InstagramGallery'

export default function HomePage() {
  return (
    <>
      <Seo title="Bloome By Her — Handmade Flowers, Made with Love" titleIsComplete path="/" />
      <Hero />
      <BannerCarousel />
      <CategoriesSection />
      <BestSellersSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <InstagramGallery />
    </>
  )
}
