import type { User, Team, Hackathon } from '@/types'

const MOCK_USER: User = {
  id: 'usr_1',
  name: 'Alex Rivera',
  email: 'alex@cobuild.io',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  role: 'Frontend Developer',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js']
}

const MOCK_TEAMS: Team[] = [
  {
    id: 'team_1',
    name: 'ByteBusters',
    description: 'Building an AI-driven team matching platform for college students.',
    creatorId: 'usr_1',
    members: [MOCK_USER],
    maxMembers: 4,
    openRoles: ['Backend Engineer', 'UI/UX Designer'],
    hackathonId: 'hack_1'
  }
]

const MOCK_HACKATHONS: Hackathon[] = [
  {
    id: 'hack_1',
    title: 'Global Build-a-Thon 2026',
    description: 'Solve real-world problems using generative AI models.',
    startDate: '2026-06-15',
    endDate: '2026-06-18',
    prizePool: '$50,000',
    teamsCount: 142
  }
]
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const api = {
  getCurrentUser: async (): Promise<User> => {
    await delay(500)
    return MOCK_USER
  },
  
  getTeams: async (): Promise<Team[]> => {
    await delay(600)
    return MOCK_TEAMS
  },
  
  getHackathons: async (): Promise<Hackathon[]> => {
    await delay(400)
    return MOCK_HACKATHONS
  }
}

export default api

