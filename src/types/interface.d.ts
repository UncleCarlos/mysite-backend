export interface IFeed {
  id: string
  title: string
  link: string
  pubDate: string | Date | undefined
  description: string
  sourceId: string
  thumbnail: string
  author: string
  source: any

  date?: string
}

export interface ISource {
  id: string
  name: string
  subName?: string
  web: string
  rss: string
  icon?: string
}

export interface IAccount {
  id: string
  username: string
  isActive: boolean
}

export interface IQueryOptions {
  page?: number
  size?: number
  sort?: string
  order?: number
}

export interface ITableOptions {
  filterMatchModes: any | undefined
  filters: any | null
  first: number
  multiSortMeta: any
  page: number
  pageCount: number
  rows: number
  sortField: string | null
  sortOrder: number | null
}
