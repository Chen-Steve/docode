import { TopicsGrid } from '@/components/TopicsGrid'
import { ProfileButton } from '@/components/ProfileButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 p-40 relative">
      <ProfileButton />
      <TopicsGrid />
    </div>
  )
}
