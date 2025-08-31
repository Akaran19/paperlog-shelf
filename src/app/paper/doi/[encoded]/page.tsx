'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { decodeDOIFromUrl } from '@/lib/doi';
import { paperUrl } from '@/lib/routing';
import { dataClient } from '@/lib/dataClient';
import { Loader2 } from 'lucide-react';

export default function DOIResolverPage() {
  const params = useParams();
  const router = useRouter();
  const encodedDOI = params.encoded as string;

  useEffect(() => {
    resolveDOI();
  }, [encodedDOI]);

  const resolveDOI = async () => {
    try {
      const doi = decodeDOIFromUrl(encodedDOI);
      
      // First try to find paper in local data
      let paper = await dataClient.getPaperByDOI(doi);
      
      // If not found, try external lookup (would hit CrossRef, etc. in real app)
      if (!paper) {
        paper = await dataClient.lookupPaperByDOI(doi);
      }
      
      if (paper) {
        // Redirect to canonical paper URL
        router.replace(paperUrl(paper));
      } else {
        // Paper not found, redirect to home with error
        router.replace(`/?error=paper-not-found&doi=${encodeURIComponent(doi)}`);
      }
    } catch (error) {
      console.error('Error resolving DOI:', error);
      router.replace('/?error=invalid-doi');
    }
  };

  return (
    <div className="page-wrapper">
      <main className="page-container">
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">Resolving Paper</h1>
            <p className="text-muted-foreground">
              Looking up paper from DOI...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}