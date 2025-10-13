import { supabase } from '@/lib/supabase';
import ProfileCard from '@/components/ProfileCard';
import type { Profile } from '@/lib/supabase';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

async function getProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const profiles = await getProfiles();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the talented individuals behind amazing projects. Browse through their portfolios,
          skills, and connect with them.
        </p>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No profiles found.</p>
          <p className="text-sm text-muted-foreground">
            Please run the seed script to add sample profiles: <code className="bg-muted px-2 py-1 rounded">npm run seed</code>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
}
