'use client';

import { BarChart3, Music, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStats } from '@/hooks/admin/useAdminStats';

export default function AdminPage() {
  const { data: adminStats, isLoading } = useAdminStats();

  const stats = [
    {
      title: 'Total Artists',
      value: adminStats?.totalArtists || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Releases',
      value: adminStats?.totalReleases || 0,
      icon: Music,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Casting Artists',
      value: adminStats?.castingArtists || 0,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-8 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your music catalog and artist roster</p>
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
                    <p className="text-3xl font-bold">{isLoading ? '...' : stat.value}</p>
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
          <CardContent>
            <Link href="/admin/artists">
              <Button className="w-full">View All Artists</Button>
            </Link>
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
          <CardContent>
            <Link href="/admin/releases">
              <Button className="w-full">View All Releases</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Create new content quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/artists/create">
              <Button variant="outline" className="h-16 flex items-center justify-center gap-3 w-full">
                <Users className="h-5 w-5" />
                <span>Create New Artist</span>
              </Button>
            </Link>
            <Link href="/admin/releases/create">
              <Button variant="outline" className="h-16 flex items-center justify-center gap-3 w-full">
                <Music className="h-5 w-5" />
                <span>Create New Release</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
