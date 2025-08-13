export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  url: string;
  keyTakeaways?: string[];
}

export type ViewMode = 'grid' | 'list';
export type SortOrder = 'asc' | 'desc';



