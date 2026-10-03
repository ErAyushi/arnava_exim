import { useState } from "react";
import axios from "axios";
import { Loader2, Send } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API } from "@/data/site";

const PRODUCT_OPTIONS = [
  "Psyllium Husk",
  "Psyllium Husk Powder",
  "Psyllium Husk 95%",
  "Psyllium Husk 99%",
  "Psyllium Husk Powder 99%",
  "Other Psyllium Product",
  "Other Product",
];
const PURITY_OPTIONS = ["95%", "98%", "99%", "Custom / Other"];
const INCOTERM_OPTIONS = ["EXW", "FOB", "CFR", "CIF", "DAP", "DDP", "Not sure yet"];

const EMPTY = {
  full_name: "",
  company_name: "",
  email: "",
  phone: "",
  country: "",
  product: "",
  purity: "",
  quantity: "",
  destination_port: "",
  incoterm: "",
  message: "",
};

const labelCls = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500";
const fieldCls =
  "h-11 rounded-lg border-slate-200 bg-white focus-visible:ring-emerald-500";

export default function InquiryForm({
  defaultProduct = "",
  defaultMessage = "",
  formType = "inquiry",
  idPrefix = "inquiry",
}) {
  const [form, setForm] = useState({ ...EMPTY, product: defaultProduct, message: defaultMessage });
  const [sending, setSending] = useState(false);

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e && e.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim()) {
      toast.error("Please add your full name and business email.");
      return;
    }
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/inquiries`, { ...form, form_type: formType });
      toast.success(data.message || "Inquiry sent. We will get back to you shortly.");
      setForm({ ...EMPTY });
    } catch (err) {
      toast.error("Could not send right now. Please email us at Sales@arnavaexim.com.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      data-testid={`${idPrefix}-form`}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div>
        <label htmlFor={`${idPrefix}-name`} className={labelCls}>Full Name *</label>
        <Input id={`${idPrefix}-name`} data-testid={`${idPrefix}-form-name-input`} required
          value={form.full_name} onChange={setField("full_name")} placeholder="Your full name" className={fieldCls} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-company`} className={labelCls}>Company Name</label>
        <Input id={`${idPrefix}-company`} data-testid={`${idPrefix}-form-company-input`}
          value={form.company_name} onChange={setField("company_name")} placeholder="Your company" className={fieldCls} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-email`} className={labelCls}>Business Email *</label>
        <Input id={`${idPrefix}-email`} type="email" data-testid={`${idPrefix}-form-email-input`} required
          value={form.email} onChange={setField("email")} placeholder="name@company.com" className={fieldCls} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-phone`} className={labelCls}>Phone / WhatsApp</label>
        <Input id={`${idPrefix}-phone`} data-testid={`${idPrefix}-form-phone-input`}
          value={form.phone} onChange={setField("phone")} placeholder="+1 555 000 0000" className={fieldCls} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-country`} className={labelCls}>Country</label>
        <Input id={`${idPrefix}-country`} data-testid={`${idPrefix}-form-country-input`}
          value={form.country} onChange={setField("country")} placeholder="Destination country" className={fieldCls} />
      </div>
      <div>
        <label className={labelCls}>Product Required</label>
        <Select value={form.product} onValueChange={setField("product")}>
          <SelectTrigger data-testid={`${idPrefix}-form-product-select`} className={fieldCls}>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_OPTIONS.map((p) => (
              <SelectItem key={p} value={p} data-testid={`${idPrefix}-product-option-${p.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className={labelCls}>Required Purity</label>
        <Select value={form.purity} onValueChange={setField("purity")}>
          <SelectTrigger data-testid={`${idPrefix}-form-purity-select`} className={fieldCls}>
            <SelectValue placeholder="Select purity" />
          </SelectTrigger>
          <SelectContent>
            {PURITY_OPTIONS.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-quantity`} className={labelCls}>Required Quantity</label>
        <Input id={`${idPrefix}-quantity`} data-testid={`${idPrefix}-form-quantity-input`}
          value={form.quantity} onChange={setField("quantity")} placeholder="e.g. 1 x 20ft FCL / 10 MT" className={fieldCls} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-port`} className={labelCls}>Destination Port</label>
        <Input id={`${idPrefix}-port`} data-testid={`${idPrefix}-form-port-input`}
          value={form.destination_port} onChange={setField("destination_port")} placeholder="e.g. Rotterdam" className={fieldCls} />
      </div>
      <div>
        <label className={labelCls}>Incoterm</label>
        <Select value={form.incoterm} onValueChange={setField("incoterm")}>
          <SelectTrigger data-testid={`${idPrefix}-form-incoterm-select`} className={fieldCls}>
            <SelectValue placeholder="Select incoterm" />
          </SelectTrigger>
          <SelectContent>
            {INCOTERM_OPTIONS.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-message`} className={labelCls}>Message</label>
        <Textarea id={`${idPrefix}-message`} data-testid={`${idPrefix}-form-message-input`} rows={4}
          value={form.message} onChange={setField("message")}
          placeholder="Share your specification, target quantity and any documentation requirements."
          className="rounded-lg border-slate-200 bg-white focus-visible:ring-emerald-500" />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          data-testid={`${idPrefix}-form-submit-button`}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-emerald-600 disabled:opacity-60"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
          {sending ? "Sending..." : "Request a Quote"}
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">
          Your details are used only to respond to your inquiry.
        </p>
      </div>
    </form>
  );
}
