export interface IFeed {
  date: string
  id: string
  title: string
  link: string
  pubDate: Date
  description: string
  sourceId: string
  thumbnail: string
  author: string
  source: any
}

export interface ISource {
  id: string
  name: string
  web: string
  rss: string
  icon?: string
}

export interface IAccount {
  id: string
  username: string
  isActive: boolean
}
