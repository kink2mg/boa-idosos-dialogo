import { ContactInfo } from "@/types/site-settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactInfoFormProps {
  contactInfo: ContactInfo;
  onChange: (info: ContactInfo) => void;
}

const ContactInfoForm = ({ contactInfo, onChange }: ContactInfoFormProps) => {
  const handleChange = (key: keyof ContactInfo, value: string) => {
    onChange({ ...contactInfo, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="logo-text">Nome da Logo</Label>
        <Input
          id="logo-text"
          value={contactInfo.logo_text || "Net"}
          onChange={(e) => handleChange("logo_text", e.target.value)}
          placeholder="Nome da logo no cabeçalho"
        />
      </div>
      <div>
        <Label htmlFor="share-message">Mensagem de Compartilhamento</Label>
        <Input
          id="share-message"
          value={contactInfo.share_message || "Compartilhe nosso site"}
          onChange={(e) => handleChange("share_message", e.target.value)}
          placeholder="Mensagem do botão de compartilhar"
        />
      </div>
      <div>
        <Label htmlFor="sales-number">Número de Vendas (WhatsApp)</Label>
        <Input
          id="sales-number"
          value={contactInfo.sales_number}
          onChange={(e) => handleChange("sales_number", e.target.value)}
          placeholder="Ex: 5511999999999"
        />
      </div>
      <div>
        <Label htmlFor="support-number">Número de Suporte (WhatsApp)</Label>
        <Input
          id="support-number"
          value={contactInfo.support_number}
          onChange={(e) => handleChange("support_number", e.target.value)}
          placeholder="Ex: 5511999999999"
        />
      </div>
      <div>
        <Label htmlFor="sales-message">Mensagem Padrão de Vendas</Label>
        <Textarea
          id="sales-message"
          value={contactInfo.sales_message}
          onChange={(e) => handleChange("sales_message", e.target.value)}
          placeholder="Mensagem padrão para vendas"
        />
      </div>
      <div>
        <Label htmlFor="support-message">Mensagem Padrão de Suporte</Label>
        <Textarea
          id="support-message"
          value={contactInfo.support_message}
          onChange={(e) => handleChange("support_message", e.target.value)}
          placeholder="Mensagem padrão para suporte"
        />
      </div>
    </div>
  );
};

export default ContactInfoForm;