'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { signIn, signUp, getUser, getCurrentUserRole } from '@/lib/auth';
import ProfileForm from '@/components/ProfileForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Shield } from 'lucide-react';
import type { Profile, UserRole } from '@/lib/supabase';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    let mounted = true;
    
    async function initialize() {
      const currentUser = await getUser();
      if (!mounted) return;
      
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        // Fetch both profiles and user role in parallel
        const [profilesResult, role] = await Promise.all([
          supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false }),
          getCurrentUserRole()
        ]);
        
        if (!mounted) return;
        
        if (profilesResult.data) {
          setProfiles(profilesResult.data);
        }
        if (profilesResult.error) {
          console.error('Error fetching profiles:', profilesResult.error);
        }
        setUserRole(role);
      }
    }
    
    initialize();
    
    return () => { mounted = false; };
  }, []);

  const fetchProfiles = useCallback(async () => {
    try {
      const { data, error} = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (err) {
      console.error('Error fetching profiles:', err);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await signIn(email, password);
      const currentUser = await getUser();
      setUser(currentUser);
      setSuccess('Successfully logged in!');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await signUp(email, password);
      setSuccess('Account created! Please check your email to verify your account, then login.');
      setAuthMode('login');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    }
  };

  const handleCreateOrUpdate = async (data: any) => {
    try {
      if (!user) {
        alert('You must be logged in');
        return;
      }

      if (editingProfile) {
        // Check if user owns this profile or is admin
        if (editingProfile.user_id !== user.id && userRole?.role !== 'admin') {
          alert('You can only edit your own profiles');
          return;
        }

        const { error } = await supabase
          .from('profiles')
          .update(data)
          .eq('id', editingProfile.id);

        if (error) throw error;
      } else {
        // Add user_id to new profile
        const { error } = await supabase
          .from('profiles')
          .insert([{ ...data, user_id: user.id }]);

        if (error) throw error;
      }

      setEditingProfile(null);
      setShowForm(false);
      fetchProfiles();
    } catch (error: any) {
      console.error('Error saving profile:', error);
      alert(error.message || 'Failed to save profile');
    }
  };

  const handleDelete = async (profile: Profile) => {
    // Check if user owns this profile or is admin
    if (profile.user_id !== user?.id && userRole?.role !== 'admin') {
      alert('You can only delete your own profiles');
      return;
    }

    if (!confirm('Are you sure you want to delete this profile?')) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profile.id);

      if (error) throw error;
      fetchProfiles();
    } catch (error: any) {
      console.error('Error deleting profile:', error);
      alert(error.message || 'Failed to delete profile');
    }
  };

  const canEditProfile = useCallback((profile: Profile) => {
    return profile.user_id === user?.id || userRole?.role === 'admin';
  }, [user?.id, userRole?.role]);

  const { userProfiles, displayProfiles } = useMemo(() => {
    const userProfiles = profiles.filter(p => p.user_id === user?.id);
    const displayProfiles = userRole?.role === 'admin' ? profiles : userProfiles;
    return { userProfiles, displayProfiles };
  }, [profiles, user?.id, userRole?.role]);

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
              <CardTitle>
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </CardTitle>
              <CardDescription>
                {authMode === 'login'
                  ? 'Sign in to manage your portfolio'
                  : 'Create an account to get started'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={authMode === 'login' ? handleLogin : handleSignup} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="p-3 rounded-md bg-green-50 text-green-700 text-sm">
                    {success}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                  />
                  {authMode === 'signup' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Must be at least 6 characters
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'signup' : 'login');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  {authMode === 'login'
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </button>
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
        <div>
          <h1 className="text-3xl font-bold">
            {userRole?.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
          </h1>
          {userRole?.role === 'admin' && (
            <div className="flex items-center gap-2 mt-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Admin Access</span>
            </div>
          )}
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Profile
        </Button>
      </div>

      {userRole?.role !== 'admin' && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            You have {userProfiles.length} profile{userProfiles.length !== 1 ? 's' : ''}.
            You can only edit and delete your own profiles.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {displayProfiles.map((profile) => {
          const isOwner = profile.user_id === user.id;
          const canEdit = canEditProfile(profile);

          return (
            <Card key={profile.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{profile.name}</h3>
                      {isOwner && (
                        <Badge variant="outline" className="text-xs">Your Profile</Badge>
                      )}
                      {!isOwner && userRole?.role === 'admin' && (
                        <Badge variant="secondary" className="text-xs">Other User</Badge>
                      )}
                    </div>
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
                  {canEdit && (
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
                        onClick={() => handleDelete(profile)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {displayProfiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No profiles yet. Click &quot;Add Profile&quot; to create one.
          </p>
        </div>
      )}
    </div>
  );
}
