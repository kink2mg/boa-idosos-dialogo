import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  videoUrl?: string;
  category: string;
  sendNotification: boolean;
}

interface NewsFormProps {
  onSubmit: (news: Omit<NewsItem, "id">) => void;
  initialData?: NewsItem;
}

const NewsForm = ({ onSubmit, initialData }: NewsFormProps) => {
  const { toast } = useToast();
  const [news, setNews] = useState<Omit<NewsItem, "id">>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    date: initialData?.date || new Date().toISOString().split('T')[0],
    image: initialData?.image || "",
    videoUrl: initialData?.videoUrl || "",
    category: initialData?.category || "",
    sendNotification: initialData?.sendNotification || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit(news);
      toast({
        title: "Sucesso",
        description: "Notícia salva com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar a notícia.",
        variant: "destructive",
      });
    }
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

      <div className="flex items-center space-x-2">
        <Switch
          id="sendNotification"
          checked={news.sendNotification}
          onCheckedChange={(checked) => setNews(prev => ({ ...prev, sendNotification: checked }))}
        />
        <Label htmlFor="sendNotification">Enviar notificação</Label>
      </div>

      <Button type="submit" className="w-full">
        {initialData ? "Atualizar Notícia" : "Salvar Notícia"}
      </Button>
    </form>
  );
};

export default NewsForm;