import { Undo2, Redo2, RotateCcw } from 'lucide-react';
import { useConfigStore } from '@/store/useConfigStore';
import { Button } from '@/components/ui/Button';

export function Header() {
  const undo = useConfigStore((s) => s.undo);
  const redo = useConfigStore((s) => s.redo);
  const resetConfig = useConfigStore((s) => s.resetConfig);
  const historyIndex = useConfigStore((s) => s.historyIndex);
  const historyLength = useConfigStore((s) => s.history.length);

  return (
    <header className="bg-panel border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-primary tracking-tight">
          Sauna Configurator
        </h1>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={undo}
          disabled={historyIndex <= 0}
          title="Undo"
        >
          <Undo2 size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={redo}
          disabled={historyIndex >= historyLength - 1}
          title="Redo"
        >
          <Redo2 size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetConfig}
          title="Reset configuration"
        >
          <RotateCcw size={16} />
        </Button>
      </div>
    </header>
  );
}
