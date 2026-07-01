import { Reorder } from 'framer-motion';
import { useState } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { mergePdfs } from '../../services/conversion';
import { createId, downloadBlob, formatBytes, isPdfFile } from '../../utils/files';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';
import { DownloadIcon, SparkIcon, UploadIcon } from '../ui/Icons';
import { ProgressBar } from '../ui/ProgressBar';
import { FileDropzonePanel } from './FileDropzonePanel';

interface MergePdfItem {
  id: string;
  file: File;
}

export function MergePdfTool() {
  const { pushNotification } = useNotifications();
  const [items, setItems] = useState<MergePdfItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [progress, setProgress] = useState(0);

  const addFiles = (files: File[]) => {
    const pdfFiles = files.filter(isPdfFile);

    if (!pdfFiles.length) {
      pushNotification({
        title: 'Unsupported files skipped',
        description: 'Only PDF files can be merged in this tool.',
        tone: 'error',
      });
      return;
    }

    const nextItems = pdfFiles.map((file) => ({
      id: createId('pdf'),
      file,
    }));

    setItems((current) => [...current, ...nextItems]);
    pushNotification({
      title: 'Files added',
      description: `${nextItems.length} PDF${nextItems.length > 1 ? 's' : ''} ready to merge.`,
      tone: 'success',
    });
  };

  const moveItem = (id: string, direction: -1 | 1) => {
    setItems((current) => {
      const index = current.findIndex((item) => item.id === id);
      const nextIndex = index + direction;

      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }

      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(nextIndex, 0, item);
      return next;
    });
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const handleMerge = async () => {
    if (!items.length) {
      pushNotification({
        title: 'Add at least one PDF',
        description: 'Use the upload area to add PDF files first.',
        tone: 'error',
      });
      return;
    }

    setIsMerging(true);
    setProgress(10);

    try {
      const blob = await mergePdfs(items.map((item) => item.file));
      setProgress(100);

      downloadBlob(blob, 'merged.pdf');
      pushNotification({
        title: 'PDF merged',
        description: 'Your merged PDF was created locally and downloaded as merged.pdf.',
        tone: 'success',
      });
    } catch (error) {
      pushNotification({
        title: 'Merge failed',
        description: error instanceof Error ? error.message : 'We could not merge the selected PDFs.',
        tone: 'error',
      });
    } finally {
      setIsMerging(false);
      window.setTimeout(() => setProgress(0), 700);
    }
  };

  const totalBytes = items.reduce((sum, item) => sum + item.file.size, 0);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <FileDropzonePanel
          title="Drop PDFs to merge them"
          description="Browser-only merging with drag-and-drop upload, reordering, and quick removal."
          accept=".pdf,application/pdf"
          multiple
          helper="Multiple uploads supported"
          onFiles={addFiles}
          actionLabel="Choose PDFs"
          icon={<SparkIcon className="h-6 w-6" />}
        />

        {items.length ? (
          <Card>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-950 dark:text-white">File order</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Drag to reorder before merging, or use the keyboard-friendly controls.</p>
              </div>
              <Badge>
                {items.length} file{items.length > 1 ? 's' : ''} · {formatBytes(totalBytes)}
              </Badge>
            </div>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
              {items.map((item, index) => (
                <Reorder.Item key={item.id} value={item} className="cursor-grab active:cursor-grabbing">
                  <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
                      <UploadIcon className="h-6 w-6 rotate-180" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{item.file.name}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{formatBytes(item.file.size)}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Position {index + 1}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <Button type="button" variant="secondary" onClick={() => moveItem(item.id, -1)} disabled={index === 0}>
                        Up
                      </Button>
                      <Button type="button" variant="secondary" onClick={() => moveItem(item.id, 1)} disabled={index === items.length - 1}>
                        Down
                      </Button>
                      <Button type="button" variant="ghost" onClick={() => removeItem(item.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </Card>
        ) : (
          <EmptyState
            title="No PDFs yet"
            description="Upload one or more PDF files to merge them in your browser."
            action={<p className="text-sm text-slate-500 dark:text-slate-400">Accepted format: PDF.</p>}
          />
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-slate-950 dark:text-white">Merge settings</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Everything runs locally using pdf-lib.</p>
            </div>

            <ProgressBar value={progress} label={isMerging ? 'Merging PDFs' : 'Ready'} />

            <Button
              type="button"
              className="w-full"
              onClick={handleMerge}
              disabled={!items.length || isMerging}
              icon={<DownloadIcon className="h-4 w-4" />}
            >
              {isMerging ? 'Merging…' : 'Merge and download PDF'}
            </Button>
          </div>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">Browser-only</p>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Your PDFs stay on device. The merged file is created in the browser and downloaded as `merged.pdf`.
          </p>
        </Card>
      </div>
    </div>
  );
}
