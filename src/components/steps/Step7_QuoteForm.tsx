import { useState } from 'react';
import { useConfigStore } from '@/store/useConfigStore';
import { useAdminStore } from '@/store/useAdminStore';
import { useUIStore } from '@/store/useUIStore';
import { usePriceCalculation } from '@/hooks/usePriceCalculation';
import { validateQuoteForm } from '@/utils/validation';
import { generatePDF } from '@/engine/pdf';
import { generateShareLink } from '@/engine/serialization';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Send, Download, Link, CheckCircle } from 'lucide-react';
import type { ContactInfo } from '@/types';

export function Step7QuoteForm() {
  const getConfig = useConfigStore((s) => s.getConfig);
  const addSubmission = useAdminStore((s) => s.addSubmission);
  const pricing = usePriceCalculation();
  const showQuoteSuccess = useUIStore((s) => s.showQuoteSuccess);
  const setShowQuoteSuccess = useUIStore((s) => s.setShowQuoteSuccess);

  const [form, setForm] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [shareLink, setShareLink] = useState('');

  const updateField = (field: keyof ContactInfo, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateQuoteForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const config = getConfig();
    const submission = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      contact: { ...form },
      config,
      pricing,
    };

    addSubmission(submission);
    setShareLink(generateShareLink(config));
    setShowQuoteSuccess(true);
  };

  const handleDownloadPDF = () => {
    const config = getConfig();
    const doc = generatePDF(config, pricing, form);
    doc.save('sauna-configuration.pdf');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Request a Quote</h2>
        <p className="text-sm text-text-muted mb-3">Fill in your details to receive a quote</p>
      </div>

      <Input
        label="Name *"
        value={form.name}
        onChange={(e) => updateField('name', e.target.value)}
        error={errors.name}
        placeholder="Your full name"
      />
      <Input
        label="Email *"
        type="email"
        value={form.email}
        onChange={(e) => updateField('email', e.target.value)}
        error={errors.email}
        placeholder="you@example.com"
      />
      <Input
        label="Phone"
        type="tel"
        value={form.phone}
        onChange={(e) => updateField('phone', e.target.value)}
        error={errors.phone}
        placeholder="+1 234 567 890"
      />
      <Input
        label="Address *"
        value={form.address}
        onChange={(e) => updateField('address', e.target.value)}
        error={errors.address}
        placeholder="Delivery address"
      />
      <div className="space-y-1">
        <label className="block text-sm font-medium text-text">Notes</label>
        <textarea
          value={form.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-border bg-panel text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          rows={3}
          placeholder="Any additional requirements..."
        />
      </div>

      <Button onClick={handleSubmit} size="lg" className="w-full">
        <Send size={18} />
        Submit Quote Request
      </Button>

      <Modal
        open={showQuoteSuccess}
        onClose={() => setShowQuoteSuccess(false)}
        title="Quote Submitted!"
      >
        <div className="space-y-4 text-center">
          <CheckCircle size={48} className="text-success mx-auto" />
          <p className="text-sm text-text-muted">
            Your quote request has been submitted successfully.
          </p>

          <div className="flex flex-col gap-2">
            <Button onClick={handleDownloadPDF} variant="primary" className="w-full">
              <Download size={16} />
              Download PDF Spec Sheet
            </Button>
            <Button onClick={handleCopyLink} variant="secondary" className="w-full">
              <Link size={16} />
              Copy Configuration Link
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
