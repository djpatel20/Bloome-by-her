import { Helmet } from 'react-helmet-async'
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
      <Helmet>
        <title>Bloome By Her — Handmade Flowers, Made with Love</title>
        <meta
          name="description"
          content="Shop handmade pipe cleaner flowers, bouquets, keychains, hair clips and more from Bloome By Her."
        />
      </Helmet>
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
