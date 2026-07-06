import { asyncHandler } from '../../utils/asyncHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { Category } from '../../models/Category.model.js'
import { slugify } from '../../utils/slugify.js'

export const adminCreateCategory = asyncHandler(async (req, res) => {
  const slugBase = slugify(req.body.name)
  const existingCount = await Category.countDocuments({ slug: new RegExp(`^${slugBase}`) })
  const slug = existingCount ? `${slugBase}-${existingCount + 1}` : slugBase

  const category = await Category.create({ ...req.body, slug })
  res.status(201).json(category)
})

export const adminUpdateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!category) {
    throw ApiError.notFound('Category not found')
  }
  res.json(category)
})

export const adminDeleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id)
  if (!category) {
    throw ApiError.notFound('Category not found')
  }
  res.status(204).send()
})
