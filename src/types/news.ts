export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category?: string;
  image_url?: string;
  video_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseNewsItem {
  id: string;
  title: string;
  content: string;
  category?: string;
  image_url?: string;
  video_url?: string;
  created_at?: string;
  updated_at?: string;
}

export const supabaseNewsToNews = (news: SupabaseNewsItem): NewsItem => ({
  ...news
});

export const newsToSupabaseNews = (
  news: NewsItem
): Omit<SupabaseNewsItem, 'id' | 'created_at' | 'updated_at'> => ({
  title: news.title,
  content: news.content,
  category: news.category,
  image_url: news.image_url,
  video_url: news.video_url
});