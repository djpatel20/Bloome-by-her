import bcrypt from 'bcryptjs'
import { connectDB } from '../config/db.js'
import { env } from '../config/env.js'
import { slugify } from '../utils/slugify.js'
import { User } from '../models/User.model.js'
import { Category } from '../models/Category.model.js'
import { Product } from '../models/Product.model.js'
import { Review } from '../models/Review.model.js'
import { Order } from '../models/Order.model.js'
import { Banner } from '../models/Banner.model.js'
import { Coupon } from '../models/Coupon.model.js'
import { GalleryImage } from '../models/GalleryImage.model.js'
import mongoose from 'mongoose'

function image(seed, width = 600, height = 600) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

const CATEGORY_DEFS = [
  { name: 'Flowers' },
  { name: 'Bouquets' },
  { name: 'Hair Clips' },
  { name: 'Keychains' },
  { name: 'Flower Pots' },
  { name: 'Gifts' },
]

const PRODUCT_NAMES = [
  ['Daisy Flower Bouquet', 'Bouquets'],
  ['Tulip Flower Pot', 'Flower Pots'],
  ['Sunflower Keychain', 'Keychains'],
  ['Lavender Hair Clip', 'Hair Clips'],
  ['Rose Bouquet Deluxe', 'Bouquets'],
  ['Pink Peony Bunch', 'Flowers'],
  ['Marigold Hair Clip', 'Hair Clips'],
  ['Cactus Flower Pot', 'Flower Pots'],
  ['Butterfly Keychain', 'Keychains'],
  ['Mixed Flower Gift Box', 'Gifts'],
  ['Lily Bouquet', 'Bouquets'],
  ['Orchid Flower Pot', 'Flower Pots'],
  ['Daisy Hair Clip Set', 'Hair Clips'],
  ['Heart Keychain', 'Keychains'],
  ['Tulip Bunch', 'Flowers'],
  ['Anniversary Gift Bundle', 'Gifts'],
  ['Carnation Bouquet', 'Bouquets'],
  ['Succulent Flower Pot', 'Flower Pots'],
  ['Bow Hair Clip', 'Hair Clips'],
  ['Birthday Gift Box', 'Gifts'],
]

async function seed() {
  await connectDB()
  console.log('Clearing existing data...')
  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({}),
    Review.deleteMany({}),
    Order.deleteMany({}),
    Banner.deleteMany({}),
    Coupon.deleteMany({}),
    GalleryImage.deleteMany({}),
  ])

  console.log('Seeding users...')
  const [adminPasswordHash, customerPasswordHash] = await Promise.all([
    bcrypt.hash(env.adminPassword, 10),
    bcrypt.hash('Customer@123', 10),
  ])

  const admin = await User.create({
    name: env.adminName,
    email: env.adminEmail,
    passwordHash: adminPasswordHash,
    role: 'admin',
  })

  const customer = await User.create({
    name: 'Ananya Sharma',
    email: 'customer@bloomebyher.com',
    passwordHash: customerPasswordHash,
    role: 'customer',
    phone: '9876543210',
  })

  console.log('Seeding categories...')
  const categories = await Category.insertMany(
    CATEGORY_DEFS.map((def) => ({
      name: def.name,
      slug: slugify(def.name),
      imageUrl: image(`category-${slugify(def.name)}`, 200, 200),
    })),
  )
  const categoryByName = new Map(categories.map((category) => [category.name, category]))

  console.log('Seeding products...')
  const products = await Product.insertMany(
    PRODUCT_NAMES.map(([name, categoryName], index) => {
      const category = categoryByName.get(categoryName)
      const isBestSeller = index % 4 === 0
      return {
        name,
        slug: slugify(name),
        description: `${name} — handmade with pipe cleaners and love. Perfect for gifting or treating yourself. Each piece is unique and made to order.`,
        price: 150 + ((index * 37) % 900),
        compareAtPrice: index % 3 === 0 ? 150 + ((index * 37) % 900) + 200 : undefined,
        images: [
          { url: image(`product-${index}-a`), alt: name },
          { url: image(`product-${index}-b`), alt: name },
        ],
        category: category._id,
        stock: 5 + (index % 20),
        isBestSeller,
        isFeatured: index % 5 === 0,
        tags: [categoryName.toLowerCase()],
        salesCount: isBestSeller ? 50 + index : index,
      }
    }),
  )

  console.log('Seeding reviews...')
  const reviewerNames = ['Ananya Sharma', 'Priya Mehta', 'Riya Patel', 'Simran Kaur', 'Kavya Reddy']
  const reviewTemplates = [
    'The bouquet is so beautiful and well-made. Perfect for gifting!',
    'Absolutely loved the quality and packaging. Super cute!',
    "The keychain is the cutest! Excellent work and fast delivery.",
    'Handmade with so much love, you can feel the care in every petal.',
    'Ordered as a gift and it exceeded expectations. Will buy again!',
  ]

  const reviewDocs = []
  for (const product of products.slice(0, 12)) {
    const reviewCount = 2 + (products.indexOf(product) % 3)
    for (let i = 0; i < reviewCount; i++) {
      reviewDocs.push({
        product: product._id,
        customer: customer._id,
        customerName: reviewerNames[i % reviewerNames.length],
        rating: 4 + (i % 2),
        title: 'Lovely purchase',
        comment: reviewTemplates[i % reviewTemplates.length],
        isApproved: true,
      })
    }
  }
  await Review.insertMany(reviewDocs)

  console.log('Recalculating product ratings...')
  for (const product of products) {
    const stats = await Review.aggregate([
      { $match: { product: product._id, isApproved: true } },
      { $group: { _id: '$product', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
    ])
    const { avgRating = 0, count = 0 } = stats[0] ?? {}
    await Product.findByIdAndUpdate(product._id, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: count,
    })
  }

  console.log('Seeding orders...')
  const sampleProducts = products.slice(0, 3)
  const orderStatuses = ['delivered', 'shipped', 'processing', 'pending']
  const orders = []
  for (let i = 0; i < 6; i++) {
    const product = sampleProducts[i % sampleProducts.length]
    const quantity = 1 + (i % 3)
    const subtotal = product.price * quantity
    const shipping = 40
    orders.push({
      orderNumber: `ORD-${String(i + 1).padStart(6, '0')}`,
      customer: customer._id,
      customerName: customer.name,
      items: [
        {
          productId: product._id,
          productName: product.name,
          productImage: product.images[0]?.url ?? '',
          price: product.price,
          quantity,
        },
      ],
      subtotal,
      shipping,
      total: subtotal + shipping,
      status: orderStatuses[i % orderStatuses.length],
      paymentMethod: 'cod',
      shippingAddress: {
        fullName: customer.name,
        line1: '221B Baker Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: customer.phone,
        isDefault: true,
      },
    })
  }
  await Order.insertMany(orders)

  console.log('Seeding banners, coupons, and gallery...')
  await Banner.insertMany([
    { title: 'Shop the Bloome Collection', imageUrl: image('banner-1', 1200, 400), sortOrder: 1 },
    { title: 'New Bouquets Just Dropped', imageUrl: image('banner-2', 1200, 400), sortOrder: 2 },
  ])

  await Coupon.insertMany([
    { code: 'BLOOME10', discountPercent: 10, isActive: true },
    { code: 'WELCOME15', discountPercent: 15, isActive: true },
  ])

  await GalleryImage.insertMany(
    Array.from({ length: 8 }).map((_, index) => ({
      imageUrl: image(`gallery-${index}`, 400, 400),
      postUrl: 'https://instagram.com',
      sortOrder: index,
    })),
  )

  console.log('\nSeed complete!')
  console.log(`Admin login:    ${env.adminEmail} / ${env.adminPassword}`)
  console.log('Customer login: customer@bloomebyher.com / Customer@123')

  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
