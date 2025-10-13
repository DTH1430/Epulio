import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Globe, Facebook, Instagram, ExternalLink, ArrowLeft } from 'lucide-react';
import type { Profile } from '@/lib/supabase';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

async function getProfile(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getProfile(id);

  if (!profile) {
    notFound();
  }

  const socialLinks = [
    { icon: Github, url: profile.socials.github, label: 'GitHub' },
    { icon: Linkedin, url: profile.socials.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: profile.socials.twitter, label: 'Twitter' },
    { icon: Globe, url: profile.socials.website, label: 'Website' },
    { icon: Facebook, url: profile.socials.facebook, label: 'Facebook' },
    { icon: Instagram, url: profile.socials.instagram, label: 'Instagram' },
  ].filter(link => link.url);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to profiles
      </Link>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={profile.photo_url}
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">{profile.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{profile.bio}</p>

            {socialLinks.length > 0 && (
              <div className="flex gap-3 justify-center md:justify-start">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        {profile.projects && profile.projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
            <div className="grid gap-6">
              {profile.projects.map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0"
                        >
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardHeader>
                  {project.image && (
                    <CardContent>
                      <div className="relative w-full h-64 rounded-lg overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
