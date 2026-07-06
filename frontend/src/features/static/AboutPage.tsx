import { Helmet } from 'react-helmet-async'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <Helmet>
        <title>About Us — Bloome By Her</title>
      </Helmet>
      <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">About Us</h1>
      <p className="text-sm text-muted-foreground">
        Bloome By Her creates handmade pipe cleaner flowers, bouquets, keychains, hair clips and
        more — each piece crafted with love for every special moment. What started as a small
        passion project has blossomed into a collection of one-of-a-kind, everlasting gifts.
      </p>
    </div>
  )
}
