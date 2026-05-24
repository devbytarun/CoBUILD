export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role?: string
  skills: string[]
}

export interface Team {
  id: string
  name: string
  description: string
  creatorId: string
  members: User[]
  maxMembers: number
  openRoles: string[]
  hackathonId?: string
}

export interface Project {
  id: string
  title: string
  description: string
  teamId: string
  demoUrl?: string
  repoUrl?: string
  technologies: string[]
}

export interface Hackathon {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  prizePool?: string
  teamsCount: number
}
