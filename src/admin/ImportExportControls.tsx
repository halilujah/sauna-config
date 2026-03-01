import { useRef } from 'react';
import { usePricingStore } from '@/store/usePricingStore';
import { useAdminStore } from '@/store/useAdminStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, Upload, RotateCcw } from 'lucide-react';

export function ImportExportControls() {
  const rules = usePricingStore((s) => s.rules);
  const setRules = usePricingStore((s) => s.setRules);
  const resetRules = usePricingStore((s) => s.resetRules);
  const submissions = useAdminStore((s) => s.submissions);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = {
      pricingRules: rules,
      submissions,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sauna-config-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.pricingRules) {
          setRules(data.pricingRules);
        }
        alert('Import successful!');
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);

    // Reset input so same file can be re-imported
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleReset = () => {
    if (confirm('Reset all pricing rules to defaults? This cannot be undone.')) {
      resetRules();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Import / Export</h2>

      <Card>
        <h3 className="font-semibold mb-3">Export Configuration</h3>
        <p className="text-sm text-text-muted mb-3">
          Download all pricing rules and submissions as a JSON file.
        </p>
        <Button onClick={handleExport}>
          <Download size={16} />
          Export All Data
        </Button>
      </Card>

      <Card>
        <h3 className="font-semibold mb-3">Import Configuration</h3>
        <p className="text-sm text-text-muted mb-3">
          Upload a previously exported JSON file to restore pricing rules.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        <Button onClick={() => fileRef.current?.click()} variant="secondary">
          <Upload size={16} />
          Import JSON
        </Button>
      </Card>

      <Card>
        <h3 className="font-semibold mb-3">Reset to Defaults</h3>
        <p className="text-sm text-text-muted mb-3">
          Restore all pricing rules to their original default values.
        </p>
        <Button onClick={handleReset} variant="ghost">
          <RotateCcw size={16} />
          Reset Defaults
        </Button>
      </Card>
    </div>
  );
}
