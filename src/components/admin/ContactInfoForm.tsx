import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactInfo = {
  sales_number: string;
  support_number: string;
  sales_message: string;
  support_message: string;
};

type ContactInfoFormProps = {
  contactInfo: ContactInfo;
  onChange: (contactInfo: ContactInfo) => void;
};

const ContactInfoForm = ({ contactInfo, onChange }: ContactInfoFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="sales_number">Número de Vendas (WhatsApp)</Label>
        <Input
          id="sales_number"
          value={contactInfo.sales_number}
          onChange={(e) => onChange({ ...contactInfo, sales_number: e.target.value })}
          placeholder="5511999999999"
        />
      </div>

      <div>
        <Label htmlFor="support_number">Número de Suporte (WhatsApp)</Label>
        <Input
          id="support_number"
          value={contactInfo.support_number}
          onChange={(e) => onChange({ ...contactInfo, support_number: e.target.value })}
          placeholder="5511999999999"
        />
      </div>

      <div>
        <Label htmlFor="sales_message">Mensagem de Vendas</Label>
        <Textarea
          id="sales_message"
          value={contactInfo.sales_message}
          onChange={(e) => onChange({ ...contactInfo, sales_message: e.target.value })}
          placeholder="Olá! Gostaria de contratar o"
        />
      </div>

      <div>
        <Label htmlFor="support_message">Mensagem de Suporte</Label>
        <Textarea
          id="support_message"
          value={contactInfo.support_message}
          onChange={(e) => onChange({ ...contactInfo, support_message: e.target.value })}
          placeholder="Olá! Gostaria de suporte."
        />
      </div>
    </div>
  );
};

export default ContactInfoForm;