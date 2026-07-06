import { asyncHandler } from '../utils/asyncHandler.js'
import { Category } from '../models/Category.model.js'
import { Product } from '../models/Product.model.js'

export const listCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.find().sort({ name: 1 })
  const counts = await Product.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }])
  const countByCategoryId = new Map(counts.map((entry) => [entry._id.toString(), entry.count]))

  const result = categories.map((category) => {
    const json = category.toJSON()
    json.productCount = countByCategoryId.get(category.id) ?? 0
    return json
  })

  res.json(result)
})
