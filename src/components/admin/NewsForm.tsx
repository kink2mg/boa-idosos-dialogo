import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  videoUrl?: string;
  category: string;
}

interface NewsFormProps {
  onSubmit: (news: Omit<NewsItem, "id">) => void;
}

const NewsForm = ({ onSubmit }: NewsFormProps) => {
  const [news, setNews] = useState<Omit<NewsItem, "id">>({
    title: "",
    content: "",
    date: new Date().toISOString().split('T')[0],
    image: "",
    videoUrl: "",
    category: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(news);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título da Notícia</Label>
          <Input
            id="title"
            value={news.title}
            onChange={(e) => setNews(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Input
            id="category"
            value={news.category}
            onChange={(e) => setNews(prev => ({ ...prev, category: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          id="content"
          value={news.content}
          onChange={(e) => setNews(prev => ({ ...prev, content: e.target.value }))}
          rows={5}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            value={news.date}
            onChange={(e) => setNews(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL da Imagem</Label>
        <Input
          id="image"
          type="url"
          value={news.image}
          onChange={(e) => setNews(prev => ({ ...prev, image: e.target.value }))}
          placeholder="https://exemplo.com/imagem.jpg"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoUrl">URL do Vídeo (YouTube)</Label>
        <Input
          id="videoUrl"
          type="url"
          value={news.videoUrl}
          onChange={(e) => setNews(prev => ({ ...prev, videoUrl: e.target.value }))}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>

      <Button type="submit" className="w-full">
        Salvar Notícia
      </Button>
    </form>
  );
};

export default NewsForm;