'use client';

import { BarChart3, Music, Plus, Settings, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useArtists } from '@/hooks/artists/useArtists';
import { useReleases } from '@/hooks/releases/useReleases';

export default function AdminPage() {
  const { data: artists } = useArtists();
  const { data: releases } = useReleases();

  const stats = [
    {
      title: 'Total Artists',
      value: artists?.length || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Releases',
      value: releases?.length || 0,
      icon: Music,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Casting Artists',
      value: artists?.filter((artist: { is_casting_artist: boolean }) => artist.is_casting_artist)?.length || 0,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-8 border-t pt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your music catalog and artist roster</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/artists/create">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Artist
            </Button>
          </Link>
          <Link href="/admin/releases/create">
            <Button size="sm" variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              New Release
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="group hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-xl">Artists Management</CardTitle>
                <CardDescription className="text-base">
                  Manage your artist roster and casting operations
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Link href="/admin/artists" className="flex-1">
                <Button className="w-full gap-2">
                  <Settings className="h-4 w-4" />
                  Manage Artists
                </Button>
              </Link>
              <Link href="/admin/artists/create">
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              • Create and edit artist profiles
              <br />
              • Manage casting assignments
              <br />• Update social media links
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Music className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-xl">Releases Management</CardTitle>
                <CardDescription className="text-base">Control your music catalog and streaming links</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Link href="/admin/releases" className="flex-1">
                <Button className="w-full gap-2">
                  <Settings className="h-4 w-4" />
                  Manage Releases
                </Button>
              </Link>
              <Link href="/admin/releases/create">
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              • Upload and manage releases
              <br />
              • Configure streaming platform links
              <br />• Assign artists to releases
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used admin tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/releases/create">
              <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                <Plus className="h-5 w-5" />
                <span className="text-xs">New Release</span>
              </Button>
            </Link>
            <Link href="/admin/artists/create">
              <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                <Users className="h-5 w-5" />
                <span className="text-xs">New Artist</span>
              </Button>
            </Link>
            <Link href="/admin/artists">
              <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">View Casting</span>
              </Button>
            </Link>
            <Link href="/admin/releases">
              <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                <Music className="h-5 w-5" />
                <span className="text-xs">Browse Catalog</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
