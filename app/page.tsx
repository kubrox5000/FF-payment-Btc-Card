import Link from 'next/link'
import { SiteNav } from '@/components/site/SiteNav'
import { SiteFooter } from '@/components/site/SiteFooter'
import FloatingSupport from '@/components/site/LazySupport'
import { getSettings } from '@/lib/settings'
import { localizedPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return localizedPageMetadata('title_home')
}

const specs = [
  'Dual Motor 1500W',
  'Long Range Battery',
  'Up to 100 KM Range',
  'Up to 70 KM/H Speed',
  'Foldable Design',
  'Off-Road Tires',
  'Hydraulic Brakes',
  'LED Display',
]

const features = [
  'Powerful Motor',
  'Long Battery Life',
  'Off-Road Performance',
  'Premium Quality',
  'Safety',
]

const gallery = [
  {
    title: 'Urban Precision',
    desc: 'Engineered for city rides with smooth control and instant torque.',
    img: 'https://images.unsplash.com/photo-1656944214354-b5f0e54796a6?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Night Ride Confidence',
    desc: 'Advanced LED lighting and premium braking for secure rides after dark.',
    img: 'https://images.unsplash.com/photo-1616004667892-d348f7349d39?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Weekend Freedom',
    desc: 'Foldable performance with off-road grip for every terrain.',
    img: 'https://images.unsplash.com/photo-1519583272095-6433daf26b6e?auto=format&fit=crop&w=1600&q=80',
  },
]

export default async function HomePage() {
  const settings = await getSettings()

  return (
    <>
      <SiteNav />

      <main className="relative overflow-hidden">
        <section className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:pt-24">
          <div className="hero-fade hero-fade-2">
            <p className="mb-4 inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              FF-Diamond
            </p>
            <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl">
              FF-Diamond X1
              <br />
              <span className="text-gradient">Power Meets Freedom</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Meet the premium electric scooter built for speed, range, and
              total riding confidence.
            </p>
            <div className="mt-8">
              <Link
                href="/top-up"
                className="btn-shimmer glow-gold inline-flex items-center rounded-xl px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
              >
                Buy Now
              </Link>
            </div>
          </div>

          <div className="hero-fade hero-fade-4 relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl animate-pulse-glow" />
            <img
              src="https://images.unsplash.com/photo-1566487097168-e91a4f38bee2?auto=format&fit=crop&w=1400&q=80"
              alt="FF-Diamond X1 Electric Scooter"
              className="relative h-[420px] w-full rounded-3xl border border-primary/30 object-cover shadow-2xl shadow-primary/20"
            />
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
          <h2 className="mb-8 text-3xl font-extrabold text-white">Product Details</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {specs.map((item) => (
              <div key={item} className="glass rounded-2xl p-5">
                <p className="text-sm font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
          <h2 className="mb-8 text-3xl font-extrabold text-white">Why FF-Diamond X1</h2>
          <div className="grid gap-4 md:grid-cols-5">
            {features.map((item) => (
              <div key={item} className="rounded-2xl border border-primary/25 bg-card/70 p-5 text-center">
                <p className="text-sm font-bold text-primary">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6">
          <h2 className="mb-8 text-3xl font-extrabold text-white">Product Gallery</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {gallery.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-border bg-card/60">
                <img src={item.img} alt={item.title} className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
      <FloatingSupport telegram={settings.telegram} discord={settings.discord} />
    </>
  )
}