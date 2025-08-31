import { Link } from 'react-router-dom';
import { Paper, Author, Journal } from '@/types';
import { paperUrl } from '@/lib/routing';
import { formatDOIUrl } from '@/lib/doi';
import { ExternalLink, Users, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PaperCardProps {
  paper: Paper;
  authors?: Author[];
  journal?: Journal;
  showAbstract?: boolean;
}

export function PaperCard({ paper, authors = [], journal, showAbstract = false }: PaperCardProps) {
  return (
    <div className="academic-card p-6 space-y-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <Link 
            to={paperUrl(paper)}
            className="flex-1 group"
          >
            <h3 className="text-lg md:text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
              {paper.title}
            </h3>
          </Link>
          <a
            href={formatDOIUrl(paper.doi)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label={`View paper at ${paper.doi}`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {authors.length > 0 && (
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>
                {authors.slice(0, 3).map(author => author.name).join(', ')}
                {authors.length > 3 && ` +${authors.length - 3} more`}
              </span>
            </div>
          )}
          
          {paper.year && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{paper.year}</span>
            </div>
          )}
        </div>

        {journal && (
          <div>
            <Badge variant="secondary" className="text-xs">
              {journal.name}
            </Badge>
          </div>
        )}

        {showAbstract && paper.abstract && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {paper.abstract}
          </p>
        )}
      </div>

      <div className="pt-2 border-t">
        <Link 
          to={paperUrl(paper)}
          className="text-sm font-medium text-primary hover:underline"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}