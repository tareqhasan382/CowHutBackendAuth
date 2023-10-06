import { SortOrder } from 'mongoose'

type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
  maxPrice?: number
  minPrice?: number
  location?: string
  searchTerm?: string
}

type IFilterOptions = {
  price?: {
    $gte?: number
    $lte?: number
  }
  location?: {
    $regex: string
    $options: string
  }
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>
}

type IOptionsResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
  filter: IFilterOptions
}

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = options.page || 1
  const limit = options.limit || 10
  const skip = (page - 1) * limit

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'

  const filter: IFilterOptions = {}
  // Apply filters

  if (options.minPrice) {
    filter.price = { $gte: options.minPrice as number }
  }
  if (options.maxPrice) {
    filter.price = { $lte: options.maxPrice as number }
  }

  if (options.location) {
    filter.location = { $regex: options.location, $options: 'i' }
  }
  // Apply searchTerm filter (on location, breed, and category fields)
  if (options.searchTerm) {
    filter.$or = [
      { location: { $regex: options.searchTerm, $options: 'i' } },
      { breed: { $regex: options.searchTerm, $options: 'i' } },
      { category: { $regex: options.searchTerm, $options: 'i' } },
    ]
  }

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    filter,
  }
}

export const paginationHelpers = {
  calculatePagination,
}
