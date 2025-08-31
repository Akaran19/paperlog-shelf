import { Shelf } from '@/types';
import { Button } from '@/components/ui/button';
import { BookOpen, Eye, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShelfSelectorProps {
  currentShelf?: Shelf;
  onShelfChange: (shelf: Shelf) => void;
  size?: 'sm' | 'md';
}

const shelfConfig = {
  WANT: {
    label: 'Want to Read',
    shortLabel: 'Want',
    icon: Eye,
    className: 'shelf-badge want'
  },
  READING: {
    label: 'Currently Reading', 
    shortLabel: 'Reading',
    icon: BookOpen,
    className: 'shelf-badge reading'
  },
  READ: {
    label: 'Read',
    shortLabel: 'Read', 
    icon: CheckCircle2,
    className: 'shelf-badge read'
  }
} as const;

export function ShelfSelector({ currentShelf, onShelfChange, size = 'md' }: ShelfSelectorProps) {
  const isSmall = size === 'sm';

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      {(Object.keys(shelfConfig) as Shelf[]).map((shelf) => {
        const config = shelfConfig[shelf];
        const Icon = config.icon;
        const isSelected = currentShelf === shelf;
        
        return (
          <Button
            key={shelf}
            variant={isSelected ? "default" : "outline"}
            size={isSmall ? "sm" : "default"}
            onClick={() => onShelfChange(shelf)}
            className={cn(
              "flex-1 gap-2 transition-all duration-200 min-w-0",
              isSelected && "ring-2 ring-primary/20 shadow-sm",
              isSmall ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm"
            )}
          >
            <Icon className={cn("flex-shrink-0", isSmall ? "w-3 h-3" : "w-4 h-4")} />
            <span className="truncate">
              {isSmall ? config.shortLabel : config.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}