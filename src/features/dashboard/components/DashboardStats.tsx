import type { FC } from 'react'
import type { Team, Hackathon } from '@/types'

interface DashboardStatsProps {
  teams: Team[]
  hackathons: Hackathon[]
}

export const DashboardStats: FC<DashboardStatsProps> = ({ teams, hackathons }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
        <h3 className="text-zinc-400 text-sm font-semibold mb-2">My Active Teams</h3>
        <p className="text-2xl font-bold text-white">{teams.length}</p>
        <div className="mt-4 text-xs text-brand-green">
          {teams[0]?.name || 'No teams active'}
        </div>
      </div>
      <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
        <h3 className="text-zinc-400 text-sm font-semibold mb-2">Upcoming Hackathons</h3>
        <p className="text-2xl font-bold text-white">{hackathons.length}</p>
        <div className="mt-4 text-xs text-brand-green">
          {hackathons[0]?.title || 'No upcoming events'}
        </div>
      </div>
    </div>
  )
}

export default DashboardStats
