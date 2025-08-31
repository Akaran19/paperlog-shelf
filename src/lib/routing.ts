// Peerly routing utilities

export const slugify = (s: string): string => 
  s.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const paperUrl = (paper: { id: string; title: string }): string => 
  `/paper/${paper.id}-${slugify(paper.title)}`;

export const authorUrl = (authorId: string): string => `/author/${authorId}`;
export const journalUrl = (journalId: string): string => `/journal/${journalId}`;
export const userUrl = (handle: string): string => `/u/${handle}`;

// Extract paper ID from slug
export const extractPaperId = (paperIdAndSlug: string): string => {
  const parts = paperIdAndSlug.split('-');
  return parts[0];
};

// Check if current slug matches expected slug
export const shouldRedirectForSlug = (currentSlug: string, expectedTitle: string): boolean => {
  const expectedSlug = slugify(expectedTitle);
  const currentTitlePart = currentSlug.split('-').slice(1).join('-');
  return currentTitlePart !== expectedSlug;
};