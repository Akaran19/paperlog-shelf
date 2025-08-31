// Peerly - Academic paper tracking types

export type Shelf = 'WANT' | 'READING' | 'READ';

export interface Paper {
  id: string;
  doi: string;
  title: string;
  abstract?: string;
  year?: number;
  journalId?: string;
  authorIds: string[];
}

export interface Author {
  id: string;
  name: string;
  externalId?: string;
}

export interface Journal {
  id: string;
  name: string;
  issn?: string;
  externalId?: string;
}

export interface User {
  id: string;
  handle: string;
  name: string;
  image?: string;
}

export interface UserPaper {
  id: string;
  userId: string;
  paperId: string;
  shelf: Shelf;
  rating?: number;
  review?: string;
  createdAt: string;
  updatedAt: string;
  upvotes?: number;
  helpful?: number;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'ADDED' | 'RATED' | 'REVIEWED' | 'MOVED_SHELF';
  targetId: string;
  createdAt: string;
}

// UI-specific types
export interface PaperAggregates {
  avgRating: number;
  count: number;
  latest: UserPaper[];
}

export interface SearchResult {
  papers: Paper[];
  total: number;
}