'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Profile } from '@/lib/supabase';
import { X, Plus } from 'lucide-react';

interface ProfileFormProps {
  profile?: Profile;
  onSubmit: (data: any) => Promise<void>;
  onCancel?: () => void;
}

export default function ProfileForm({ profile, onSubmit, onCancel }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    bio: profile?.bio || '',
    photo_url: profile?.photo_url || '',
    skills: profile?.skills || [],
    socials: profile?.socials || {},
    projects: profile?.projects || []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState({ title: '', description: '', url: '', image: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, { ...newProject }]
      }));
      setNewProject({ title: '', description: '', url: '', image: '' });
    }
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Photo URL</label>
            <Input
              value={formData.photo_url}
              onChange={(e) => setFormData(prev => ({ ...prev, photo_url: e.target.value }))}
              placeholder="https://example.com/photo.jpg"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <Button type="button" onClick={addSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
                <span className="text-sm">{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">GitHub</label>
            <Input
              value={formData.socials.github || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socials: { ...prev.socials, github: e.target.value }
              }))}
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">LinkedIn</label>
            <Input
              value={formData.socials.linkedin || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socials: { ...prev.socials, linkedin: e.target.value }
              }))}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Twitter</label>
            <Input
              value={formData.socials.twitter || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socials: { ...prev.socials, twitter: e.target.value }
              }))}
              placeholder="https://twitter.com/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Website</label>
            <Input
              value={formData.socials.website || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socials: { ...prev.socials, website: e.target.value }
              }))}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              value={newProject.title}
              onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Project title"
            />
            <Textarea
              value={newProject.description}
              onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Project description"
              rows={2}
            />
            <Input
              value={newProject.url}
              onChange={(e) => setNewProject(prev => ({ ...prev, url: e.target.value }))}
              placeholder="Project URL (optional)"
            />
            <Input
              value={newProject.image}
              onChange={(e) => setNewProject(prev => ({ ...prev, image: e.target.value }))}
              placeholder="Project image URL (optional)"
            />
            <Button type="button" onClick={addProject} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
          <div className="space-y-2">
            {formData.projects.map((project, index) => (
              <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
