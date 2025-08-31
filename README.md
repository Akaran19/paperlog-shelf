# Paperlog - Academic Paper Tracker

A Goodreads-style tracker for academic papers built with Next.js 14, TypeScript, TailwindCSS, and shadcn/ui.

## Features

- **DOI Resolution**: Paste DOI links or keywords to find papers
- **Paper Library**: Organize papers into Want/Reading/Read shelves
- **Rating & Reviews**: Rate papers 1-5 stars and write reviews
- **Author & Journal Pages**: Browse papers by author or publication
- **Responsive Design**: Beautiful academic-focused UI that works on all devices
- **Accessibility**: Full keyboard navigation and screen reader support

## Pages & Routing

- `/` - Home page with search and recent papers
- `/paper/[id]-[slug]` - Canonical paper page with full details
- `/paper/doi/[encoded]` - DOI resolver that redirects to canonical URLs
- `/author/[id]` - Author profile with their papers
- `/journal/[id]` - Journal page with recent publications
- `/u/[handle]` - User profile and library
- `/signin` - Authentication (UI stub)

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons
- **Client-side data layer** with mocked async functions

## Design System

The app uses a comprehensive design system with:

- **Academic color palette** (slate/indigo theme)
- **Semantic color tokens** defined in CSS variables
- **Typography scale** optimized for reading
- **Consistent spacing** and border radius
- **Dark mode support** throughout
- **Accessibility-first** focus states and contrast

## Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd paperlog
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## Data Structure

The app uses JSON files for dummy data:

- `src/data/papers.json` - Paper metadata with DOIs
- `src/data/authors.json` - Author information
- `src/data/journals.json` - Journal details
- `src/data/users.json` - User profiles
- `src/data/userPapers.json` - User paper relationships

## Key Components

- **SearchBar** - DOI and keyword search with validation
- **PaperCard** - Responsive paper display with metadata
- **RatingStars** - Interactive 5-star rating system
- **ShelfSelector** - Three-state shelf management
- **PaperActions** - Combined shelf/rating/review interface
- **UserLibraryTabs** - Tabbed library organization

## Routing Features

- **Canonical URLs** with slugs for SEO
- **DOI resolution** with proper redirects
- **Slug validation** and correction
- **404 handling** for missing papers

## Accessibility

- **WCAG 2.1 AA** compliance
- **Keyboard navigation** throughout
- **Screen reader** optimized
- **Focus indicators** on all interactive elements
- **Semantic HTML** structure

## Performance

- **Component-based** architecture
- **Optimized images** with Next.js Image
- **Code splitting** via dynamic imports
- **Responsive loading** states

## License

MIT License - see LICENSE file for details