export type IpaginationsType = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filter?: number
  minPrice?: number
  maxPrice?: number
  location?: string
  searchTerm?: string
}
