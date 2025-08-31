// Paperlog - Mocked data client for academic paper tracking

import { Paper, Author, Journal, User, UserPaper, Shelf, PaperAggregates } from '@/types';
import { normalizeDOI } from './doi';

// Import JSON data
import authorsData from '@/data/authors.json';
import journalsData from '@/data/journals.json';
import papersData from '@/data/papers.json';
import usersData from '@/data/users.json';
import userPapersData from '@/data/userPapers.json';

// Simulate network delay
const delay = (ms: number = 100) => new Promise(resolve => setTimeout(resolve, ms));

// Current user simulation (in real app, would come from auth)
const CURRENT_USER_ID = '1';

export const dataClient = {
  async getPaperById(id: string): Promise<Paper | null> {
    await delay();
    const paper = (papersData as Paper[]).find(p => p.id === id);
    return paper || null;
  },

  async getPaperByDOI(doi: string): Promise<Paper | null> {
    await delay();
    const normalizedDOI = normalizeDOI(doi);
    const paper = (papersData as Paper[]).find(p => 
      normalizeDOI(p.doi) === normalizedDOI
    );
    return paper || null;
  },

  async lookupPaperByDOI(doi: string): Promise<Paper | null> {
    // In real implementation, this would call external APIs like CrossRef
    return this.getPaperByDOI(doi);
  },

  async keywordSearchPapers(query: string): Promise<Paper[]> {
    await delay();
    if (!query.trim()) return papersData as Paper[];
    
    const lowercaseQuery = query.toLowerCase();
    return (papersData as Paper[]).filter(paper => 
      paper.title.toLowerCase().includes(lowercaseQuery) ||
      paper.abstract?.toLowerCase().includes(lowercaseQuery) ||
      paper.doi.toLowerCase().includes(lowercaseQuery)
    );
  },

  async listPapersByAuthor(authorId: string): Promise<Paper[]> {
    await delay();
    return (papersData as Paper[]).filter(paper => 
      paper.authorIds.includes(authorId)
    );
  },

  async listPapersByJournal(journalId: string): Promise<Paper[]> {
    await delay();
    return (papersData as Paper[]).filter(paper => 
      paper.journalId === journalId
    );
  },

  async getAuthor(id: string): Promise<Author | null> {
    await delay();
    const author = (authorsData as Author[]).find(a => a.id === id);
    return author || null;
  },

  async getJournal(id: string): Promise<Journal | null> {
    await delay();
    const journal = (journalsData as Journal[]).find(j => j.id === id);
    return journal || null;
  },

  async getUserByHandle(handle: string): Promise<User | null> {
    await delay();
    const user = (usersData as User[]).find(u => u.handle === handle);
    return user || null;
  },

  async listUserPapers(userId: string, shelf?: Shelf): Promise<UserPaper[]> {
    await delay();
    let userPapers = (userPapersData as UserPaper[]).filter(up => 
      up.userId === userId
    );
    
    if (shelf) {
      userPapers = userPapers.filter(up => up.shelf === shelf);
    }
    
    return userPapers.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  async upsertUserPaper(input: Partial<UserPaper> & { userId: string; paperId: string }): Promise<UserPaper> {
    await delay();
    
    // Find existing user paper
    const existingIndex = (userPapersData as UserPaper[]).findIndex(up => 
      up.userId === input.userId && up.paperId === input.paperId
    );
    
    const now = new Date().toISOString();
    
    if (existingIndex >= 0) {
      // Update existing
      const existing = (userPapersData as UserPaper[])[existingIndex];
      const updated = {
        ...existing,
        ...input,
        updatedAt: now
      };
      (userPapersData as UserPaper[])[existingIndex] = updated;
      return updated;
    } else {
      // Create new
      const newUserPaper: UserPaper = {
        id: String(Date.now()), // Simple ID generation
        userId: input.userId,
        paperId: input.paperId,
        shelf: input.shelf || 'WANT',
        rating: input.rating || null,
        review: input.review || null,
        createdAt: now,
        updatedAt: now
      };
      (userPapersData as UserPaper[]).push(newUserPaper);
      return newUserPaper;
    }
  },

  async getAggregatesForPaper(paperId: string): Promise<PaperAggregates> {
    await delay();
    
    const paperUserPapers = (userPapersData as UserPaper[]).filter(up => 
      up.paperId === paperId && up.rating !== null
    );
    
    const avgRating = paperUserPapers.length > 0 
      ? paperUserPapers.reduce((sum, up) => sum + (up.rating || 0), 0) / paperUserPapers.length
      : 0;
    
    const allPaperUserPapers = (userPapersData as UserPaper[]).filter(up => 
      up.paperId === paperId
    );
    
    const latest = allPaperUserPapers
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3);
    
    return {
      avgRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
      count: allPaperUserPapers.length,
      latest
    };
  },

  // Helper to get current user for UI components
  getCurrentUser(): User {
    return (usersData as User[]).find(u => u.id === CURRENT_USER_ID) || usersData[0] as User;
  },

  async getCurrentUserPaper(paperId: string): Promise<UserPaper | null> {
    await delay();
    const userPaper = (userPapersData as UserPaper[]).find(up => 
      up.userId === CURRENT_USER_ID && up.paperId === paperId
    );
    return userPaper || null;
  }
};