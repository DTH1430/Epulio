'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { signIn, getUser } from '@/lib/auth';
import ProfileForm from '@/components/ProfileForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import type { Profile } from '@/lib/supabase';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfiles();
    }
  }, [user]);

  const checkUser = async () => {
    const currentUser = await getUser();
    setUser(currentUser);
    setLoading(false);
  };

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching profiles:', error);
    } else {
      setProfiles(data || []);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      const currentUser = await getUser();
      setUser(currentUser);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    }
  };

  const handleCreateOrUpdate = async (data: any) => {
    try {
      if (editingProfile) {
        const { error } = await supabase
          .from('profiles')
          .update(data)
          .eq('id', editingProfile.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('profiles').insert([data]);

        if (error) throw error;
      }

      setEditingProfile(null);
      setShowForm(false);
      fetchProfiles();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;

    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);

      if (error) throw error;

      fetchProfiles();
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
              <div className="mt-4 p-4 bg-muted rounded-md text-sm">
                <p className="font-medium mb-2">Note:</p>
                <p className="text-muted-foreground">
                  You need to create an admin user in your Supabase dashboard first.
                  Go to Authentication → Users → Add User
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {editingProfile ? 'Edit Profile' : 'Create New Profile'}
          </h1>
          <ProfileForm
            profile={editingProfile || undefined}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => {
              setEditingProfile(null);
              setShowForm(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Profile
        </Button>
      </div>

      <div className="space-y-4">
        {profiles.map((profile) => (
          <Card key={profile.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
                  <p className="text-muted-foreground mb-4">{profile.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.slice(0, 6).map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.length > 6 && (
                      <Badge variant="outline">+{profile.skills.length - 6}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingProfile(profile);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(profile.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {profiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No profiles yet. Click &quot;Add Profile&quot; to create one.</p>
        </div>
      )}
    </div>
  );
}
