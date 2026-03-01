import { useState } from 'react';
import clsx from 'clsx';
import { PricingEditor } from './PricingEditor';
import { MaterialsManager } from './MaterialsManager';
import { HeatersManager } from './HeatersManager';
import { FeaturesManager } from './FeaturesManager';
import { SubmissionsViewer } from './SubmissionsViewer';
import { ImportExportControls } from './ImportExportControls';
import { ArrowLeft } from 'lucide-react';

const TABS = [
  { id: 'pricing', label: 'Pricing' },
  { id: 'materials', label: 'Materials' },
  { id: 'heaters', label: 'Heaters' },
  { id: 'features', label: 'Features' },
  { id: 'submissions', label: 'Submissions' },
  { id: 'import_export', label: 'Import/Export' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState<TabId>('pricing');

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-panel border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1 text-sm text-text-muted hover:text-text"
            >
              <ArrowLeft size={16} />
              Back
            </a>
            <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Tab navigation */}
        <nav className="w-48 border-r border-border bg-panel min-h-[calc(100vh-65px)] p-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1',
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text-muted hover:bg-surface-dark hover:text-text'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 p-6 max-w-4xl">
          {activeTab === 'pricing' && <PricingEditor />}
          {activeTab === 'materials' && <MaterialsManager />}
          {activeTab === 'heaters' && <HeatersManager />}
          {activeTab === 'features' && <FeaturesManager />}
          {activeTab === 'submissions' && <SubmissionsViewer />}
          {activeTab === 'import_export' && <ImportExportControls />}
        </main>
      </div>
    </div>
  );
}
