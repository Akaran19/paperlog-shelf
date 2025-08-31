'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { notFound, redirect } from 'next/navigation';
import { Paper, Author, Journal, PaperAggregates } from '@/types';
import { dataClient } from '@/lib/dataClient';
import { extractPaperId, shouldRedirectForSlug, paperUrl } from '@/lib/routing';
import { formatDOIUrl } from '@/lib/doi';
import { PaperActions } from '@/components/PaperActions';
import { AggregateStats } from '@/components/AggregateStats';
import { Calendar, Users, ExternalLink, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PaperPage() {
  const params = useParams();
  const router = useRouter();
  const paperIdAndSlug = params.paperIdAndSlug as string;
  
  const [paper, setPaper] = useState<Paper | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [journal, setJournal] = useState<Journal | null>(null);
  const [aggregates, setAggregates] = useState<PaperAggregates | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPaperData();
  }, [paperIdAndSlug]);

  const loadPaperData = async () => {
    try {
      const paperId = extractPaperId(paperIdAndSlug);
      const paperData = await dataClient.getPaperById(paperId);
      
      if (!paperData) {
        notFound();
        return;
      }

      // Check if slug matches and redirect if needed
      if (shouldRedirectForSlug(paperIdAndSlug, paperData.title)) {
        redirect(paperUrl(paperData));
        return;
      }

      // Load related data
      const [authorsData, journalData, aggregatesData] = await Promise.all([
        Promise.all(paperData.authorIds.map(id => dataClient.getAuthor(id))),
        paperData.journalId ? dataClient.getJournal(paperData.journalId) : null,
        dataClient.getAggregatesForPaper(paperId)
      ]);

      setPaper(paperData);
      setAuthors(authorsData.filter(Boolean) as Author[]);
      setJournal(journalData);
      setAggregates(aggregatesData);
    } catch (error) {
      console.error('Error loading paper:', error);
      notFound();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaperUpdate = async () => {
    if (paper) {
      // Refresh aggregates when user updates their paper
      const updatedAggregates = await dataClient.getAggregatesForPaper(paper.id);
      setAggregates(updatedAggregates);
    }
  };

  if (isLoading) {
    return (
      <div className="page-wrapper">
        <main className="page-container">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!paper) {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Metadata */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {paper.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {authors.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <div className="flex flex-wrap gap-1">
                      {authors.map((author, index) => (
                        <span key={author.id}>
                          <Link 
                            href={`/author/${author.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            {author.name}
                          </Link>
                          {index < authors.length - 1 && <span className="text-muted-foreground">, </span>}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {paper.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{paper.year}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {journal && (
                  <Link href={`/journal/${journal.id}`}>
                    <Badge variant="secondary" className="hover:bg-primary/10 transition-colors">
                      {journal.name}
                    </Badge>
                  </Link>
                )}
                
                <a
                  href={formatDOIUrl(paper.doi)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  {paper.doi}
                </a>
              </div>

              {aggregates && (
                <div className="py-4 border-y">
                  <AggregateStats aggregates={aggregates} />
                </div>
              )}
            </div>

            {/* Abstract */}
            {paper.abstract && (
              <div className="academic-card p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Abstract
                </h2>
                <p className="text-base-academic md:text-base-academic-md leading-relaxed text-muted-foreground">
                  {paper.abstract}
                </p>
              </div>
            )}

            {/* Additional sections could go here - citations, related papers, etc. */}
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <PaperActions 
              paperId={paper.id} 
              onUpdate={handlePaperUpdate}
            />
          </div>
        </div>
      </main>
    </div>
  );
}