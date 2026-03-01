import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export function SubmissionsViewer() {
  const submissions = useAdminStore((s) => s.submissions);
  const clearSubmissions = useAdminStore((s) => s.clearSubmissions);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Submissions ({submissions.length})
        </h2>
        {submissions.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearSubmissions}>
            <Trash2 size={16} />
            Clear All
          </Button>
        )}
      </div>

      {submissions.length === 0 ? (
        <Card>
          <p className="text-sm text-text-muted text-center py-8">
            No submissions yet.
          </p>
        </Card>
      ) : (
        submissions.map((sub) => (
          <Card key={sub.id}>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
            >
              <div>
                <div className="font-medium">{sub.contact.name}</div>
                <div className="text-xs text-text-muted">
                  {sub.contact.email} &middot;{' '}
                  {new Date(sub.timestamp).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">
                  {formatCurrency(sub.pricing.total)}
                </span>
                {expandedId === sub.id ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
            </div>

            {expandedId === sub.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-text-muted mb-1">Contact</h4>
                    <p>Phone: {sub.contact.phone || 'N/A'}</p>
                    <p>Address: {sub.contact.address}</p>
                    {sub.contact.notes && <p>Notes: {sub.contact.notes}</p>}
                  </div>
                  <div>
                    <h4 className="font-medium text-text-muted mb-1">Configuration</h4>
                    <p>{sub.config.saunaType} / {sub.config.shape.replace('_', ' ')}</p>
                    <p>{sub.config.dimensions.width}×{sub.config.dimensions.depth}×{sub.config.dimensions.height}mm</p>
                    <p>Heater: {sub.config.heater.type.replace(/_/g, ' ')}</p>
                  </div>
                </div>
                <details className="mt-3">
                  <summary className="text-xs text-text-muted cursor-pointer">
                    Raw JSON
                  </summary>
                  <pre className="mt-2 p-2 bg-surface-dark rounded text-xs overflow-auto max-h-48">
                    {JSON.stringify(sub.config, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
