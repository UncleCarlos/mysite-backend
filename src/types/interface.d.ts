export interface IFeed {
  id: string
  title: string
  link: string
  pubDate: Date
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
}
