import Hero from '@/components/Hero'
import FeaturedEvents from '@/components/FeaturedEvents'
import FeaturedProducts from '@/components/FeaturedProducts'
import AboutSection from '@/components/AboutSection'
import BookingsCTA from '@/components/BookingsCTA'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <Hero />
      <AboutSection />
      <FeaturedEvents />
      <FeaturedProducts />
      <BookingsCTA />
      <Footer />
    </main>
  )
}
