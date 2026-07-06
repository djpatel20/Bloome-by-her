import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../models/User.model.js'
import { parsePagination, buildPaginatedResult } from '../utils/pagination.js'

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true })
  res.json(user)
})

export const listAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  res.json(user.toJSON().addresses)
})

export const saveAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  const { id, ...addressData } = req.body

  if (addressData.isDefault) {
    user.addresses.forEach((address) => {
      address.isDefault = false
    })
  }

  if (id) {
    const existing = user.addresses.id(id)
    if (existing) {
      existing.set(addressData)
    }
  } else {
    user.addresses.push(addressData)
  }

  await user.save()
  const saved = id ? user.addresses.id(id) : user.addresses.at(-1)
  res.status(201).json(saved.toJSON())
})

export const adminListCustomers = asyncHandler(async (req, res) => {
  const { page, pageSize, skip } = parsePagination(req.query)
  const filter = { role: 'customer' }
  const [items, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize),
    User.countDocuments(filter),
  ])
  res.json(buildPaginatedResult(items, total, page, pageSize))
})
