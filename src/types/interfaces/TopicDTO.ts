interface TopicDTO {
  id: string
  title: string
  description: string
  usernameCreator: string
  tags: string[]
  createdAt: string
  updatedAt: string
  comments: any[]
}

export type { TopicDTO }
