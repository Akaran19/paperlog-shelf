'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { User, UserPaper } from '@/types';
import { dataClient } from '@/lib/dataClient';
import { UserLibraryTabs } from '@/components/UserLibraryTabs';
import { User as UserIcon, Calendar, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function UserPage() {
  const params = useParams();
  const handle = params.handle as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [userPapers, setUserPapers] = useState<UserPaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [handle]);

  const loadUserData = async () => {
    try {
      const [userData, papersData] = await Promise.all([
        dataClient.getUserByHandle(handle),
        dataClient.listUserPapers('1') // Would use actual user ID in real app
      ]);

      if (!userData) {
        notFound();
        return;
      }

      setUser(userData);
      setUserPapers(papersData);
    } catch (error) {
      console.error('Error loading user:', error);
      notFound();
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="page-wrapper">
        <main className="page-container">
          <div className="animate-pulse space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-full"></div>
              <div className="space-y-2">
                <div className="h-8 bg-muted rounded w-48"></div>
                <div className="h-6 bg-muted rounded w-32"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-12 bg-muted rounded w-full"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="academic-card p-6 animate-pulse">
                    <div className="space-y-4">
                      <div className="h-6 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    notFound();
  }

  return (
    <div className="page-wrapper">
      <main className="page-container">
        {/* Navigation */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to search
          </Link>
        </div>

        <div className="space-y-8">
          {/* User Header */}
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="text-lg bg-primary/10">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {user.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                @{user.handle}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="secondary">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {userPapers.length} Papers Tracked
                </Badge>
                <Badge variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  Member since 2023
                </Badge>
              </div>
            </div>
          </div>

          {/* User Library */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Paper Library</h2>
            <UserLibraryTabs userId={user.id} />
          </div>
        </div>
      </main>
    </div>
  );
}