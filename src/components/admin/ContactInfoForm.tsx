import { ContactInfo } from "@/types/site-settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Label htmlFor="logo-url">URL do Logo</Label>
        <Input
          id="logo-url"
          type="url"
          value={contactInfo.logo_url}
          onChange={(e) => handleChange("logo_url", e.target.value)}
          placeholder="https://exemplo.com/logo.png"
        />
      </div>
      <div>
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          value={contactInfo.whatsapp}
          onChange={(e) => handleChange("whatsapp", e.target.value)}
          placeholder="5538998622897"
        />
      </div>
      <div>
        <Label htmlFor="share-text">Texto do Compartilhamento</Label>
        <Input
          id="share-text"
          value={contactInfo.share_text}
          onChange={(e) => handleChange("share_text", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="whatsapp-message">Mensagem do WhatsApp</Label>
        <Input
          id="whatsapp-message"
          value={contactInfo.whatsapp_message}
          onChange={(e) => handleChange("whatsapp_message", e.target.value)}
        />
      </div>
    </div>
  );
};

export default ContactInfoForm;