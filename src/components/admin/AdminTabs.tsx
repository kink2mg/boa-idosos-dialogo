import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: ReactNode;
}

export const AdminTabs = ({ activeTab, onTabChange, children }: AdminTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList>
        <TabsTrigger value="plans">Planos</TabsTrigger>
        <TabsTrigger value="accessories">Acessórios</TabsTrigger>
        <TabsTrigger value="news">Notícias</TabsTrigger>
      </TabsList>

      <TabsContent value="plans">{children}</TabsContent>
      <TabsContent value="accessories">{children}</TabsContent>
      <TabsContent value="news">{children}</TabsContent>
    </Tabs>
  );
};