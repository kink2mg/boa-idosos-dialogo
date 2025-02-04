import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactInfo = {
  logo_url: string;
  whatsapp: string;
  share_text: string;
  whatsapp_message: string;
};

type ContactInfoFormProps = {
  contactInfo: ContactInfo;
  onChange: (contactInfo: ContactInfo) => void;
};

const ContactInfoForm = ({ contactInfo, onChange }: ContactInfoFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="logo_url">URL do Logo</Label>
        <Input
          id="logo_url"
          value={contactInfo.logo_url}
          onChange={(e) => onChange({ ...contactInfo, logo_url: e.target.value })}
          placeholder="https://exemplo.com/logo.png"
        />
      </div>

      <div>
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          value={contactInfo.whatsapp}
          onChange={(e) => onChange({ ...contactInfo, whatsapp: e.target.value })}
          placeholder="5511999999999"
        />
      </div>

      <div>
        <Label htmlFor="share_text">Texto de Compartilhamento</Label>
        <Input
          id="share_text"
          value={contactInfo.share_text}
          onChange={(e) => onChange({ ...contactInfo, share_text: e.target.value })}
          placeholder="Clique aqui"
        />
      </div>

      <div>
        <Label htmlFor="whatsapp_message">Mensagem Padrão do WhatsApp</Label>
        <Textarea
          id="whatsapp_message"
          value={contactInfo.whatsapp_message}
          onChange={(e) => onChange({ ...contactInfo, whatsapp_message: e.target.value })}
          placeholder="Olá! Gostaria de saber mais sobre os planos."
        />
      </div>
    </div>
  );
};

export default ContactInfoForm;