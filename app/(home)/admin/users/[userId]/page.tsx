'use client';

import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeleteUser, useUser } from '@/hooks/admin/useUsers';
import { useToast } from '@/hooks/use-toast';

interface Props {
  params: {
    userId: string;
  };
}

export default function UserDetailPage({ params }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: user, isLoading } = useUser(params.userId);
  const deleteUserMutation = useDeleteUser();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync(params.userId);

      toast({
        title: 'Success',
        description: 'User deleted successfully!',
      });

      router.push('/admin/users');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'STAFF':
        return 'destructive';
      case 'ADMIN':
        return 'default';
      case 'ARTIST':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/admin/users')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Not Found</h1>
            <p className="text-muted-foreground">The requested user could not be found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4 border-b pb-6">
        <Button variant="outline" size="icon" onClick={() => router.push('/admin/users')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content: User Profile Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="relative h-32 bg-muted/40">
              <div className="absolute bottom-0 left-6 translate-y-1/2">
                <Avatar className="h-28 w-28 border-4 border-background">
                  <AvatarImage src={user.image || ''} alt={user.name || 'User'} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold text-4xl">
                    {user.name
                      ? user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)
                      : 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="pt-16">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{user.name || 'No name'}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: System Info & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>User role and status details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Role</span>
                <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Email Status</span>
                <Badge variant={user.emailVerified ? 'default' : 'secondary'}>
                  {user.emailVerified ? 'Verified' : 'Unverified'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">User ID</span>
                <span className="text-xs text-muted-foreground font-mono">{user.id}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Manage this user account.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button onClick={() => router.push(`/admin/users/edit/${user.id}`)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit User
              </Button>
              <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{user.name || user.email}</strong>? This action cannot be undone
              and will permanently remove the user and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={deleteUserMutation.isPending}>
              {deleteUserMutation.isPending ? 'Deleting...' : 'Delete User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
