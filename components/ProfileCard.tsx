import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Twitter, Globe, Facebook, Instagram } from 'lucide-react';
import { Profile } from '@/lib/supabase';

export default function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link href={`/profile/${profile.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={profile.photo_url}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl mb-1">{profile.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {profile.bio}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {profile.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
              {profile.skills.length > 4 && (
                <Badge variant="outline">+{profile.skills.length - 4}</Badge>
              )}
            </div>
            <div className="flex gap-3">
              {profile.socials.github && (
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-5 w-5" />
                </div>
              )}
              {profile.socials.linkedin && (
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-5 w-5" />
                </div>
              )}
              {profile.socials.twitter && (
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-5 w-5" />
                </div>
              )}
              {profile.socials.website && (
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
              )}
              {profile.socials.facebook && (
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="h-5 w-5" />
                </div>
              )}
              {profile.socials.instagram && (
                <div className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
