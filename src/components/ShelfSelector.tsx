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
    <div className="flex gap-2">
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
              "gap-2 transition-all duration-200",
              isSelected && "ring-2 ring-primary/20"
            )}
          >
            <Icon className={cn("w-4 h-4", isSmall && "w-3 h-3")} />
            <span className={isSmall ? "text-xs" : "text-sm"}>
              {isSmall ? config.shortLabel : config.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}