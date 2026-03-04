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
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Releases',
      value: adminStats?.totalReleases || 0,
      icon: Music,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Casting Artists',
      value: adminStats?.castingArtists || 0,
      icon: BarChart3,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="space-y-10 pt-4 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage your music catalog and artist roster</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="relative overflow-hidden glass-card hover:border-primary/50 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -z-10" />
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-5xl font-black drop-shadow-md text-foreground">
                      {isLoading ? '...' : stat.value}
                    </p>
                  </div>
                  <div className={`p-4 rounded-2xl ${stat.bgColor}`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} strokeWidth={2.5} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="group relative glass-card hover:border-primary/50 transition-all duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 z-0" />
          <CardHeader className="pb-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <Users className="h-8 w-8 text-primary" strokeWidth={2.5} />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Artists Management</CardTitle>
                <CardDescription className="text-base text-muted-foreground mt-1">
                  Manage your artist roster and casting operations
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <Link href="/admin/artists">
              <Button
                className="w-full h-12 text-lg font-semibold bg-card/40 border border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                variant="outline"
              >
                View All Artists
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group relative glass-card hover:border-primary/50 transition-all duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 z-0" />
          <CardHeader className="pb-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <Music className="h-8 w-8 text-primary" strokeWidth={2.5} />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Releases Management</CardTitle>
                <CardDescription className="text-base text-muted-foreground mt-1">
                  Control your music catalog and streaming links
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <Link href="/admin/releases">
              <Button
                className="w-full h-12 text-lg font-semibold bg-card/40 border border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                variant="outline"
              >
                View All Releases
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass border-white/10 shadow-2xl">
        <CardHeader className="border-b border-white/5 pb-6">
          <CardTitle className="text-2xl font-bold">Quick Actions</CardTitle>
          <CardDescription className="text-lg">Create new content quickly</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/admin/artists/create">
              <Button
                variant="outline"
                className="h-20 flex items-center justify-center gap-4 w-full bg-card/30 border-white/10 hover:border-primary hover:bg-primary/10 transition-all duration-300 rounded-2xl group"
              >
                <Users className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-lg font-medium group-hover:text-primary transition-colors">
                  Create New Artist
                </span>
              </Button>
            </Link>
            <Link href="/admin/releases/create">
              <Button
                variant="outline"
                className="h-20 flex items-center justify-center gap-4 w-full bg-card/30 border-white/10 hover:border-primary hover:bg-primary/10 transition-all duration-300 rounded-2xl group"
              >
                <Music className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-lg font-medium group-hover:text-primary transition-colors">
                  Create New Release
                </span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
