import { Reorder, AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { generateImagePdf } from '../../services/conversion';
import type { ImageItem, Orientation, PageSizeOption } from '../../types/converter';
import { createId, downloadBlob, formatBytes, getFileBaseName, isImageFile } from '../../utils/files';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';
import { FileDropzonePanel } from './FileDropzonePanel';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { useNotifications } from '../../hooks/useNotifications';
import { DownloadIcon, SparkIcon } from '../ui/Icons';

const pageSizeOptions: { label: string; value: PageSizeOption }[] = [
  { label: 'Auto', value: 'auto' },
  { label: 'A4', value: 'a4' },
  { label: 'Letter', value: 'letter' },
  { label: 'Legal', value: 'legal' },
];

const orientationOptions: { label: string; value: Orientation }[] = [
  { label: 'Portrait', value: 'portrait' },
  { label: 'Landscape', value: 'landscape' },
];

export function ImageToPdfTool() {
  const { pushNotification } = useNotifications();
  const [items, setItems] = useState<ImageItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pageSize, setPageSize] = useState<PageSizeOption>('auto');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [margin, setMargin] = useState(24);
  const itemsRef = useRef<ImageItem[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, []);

  const addFiles = (files: File[]) => {
    const imageFiles = files.filter(isImageFile);

    if (!imageFiles.length) {
      pushNotification({
        title: 'Unsupported files skipped',
        description: 'Only JPG, JPEG, and PNG files are accepted for Image to PDF.',
        tone: 'error',
      });
      return;
    }

    const nextItems = imageFiles.map((file) => ({
      id: createId('image'),
      file,
      url: URL.createObjectURL(file),
      rotation: 0,
    }));

    setItems((current) => [...current, ...nextItems]);
    pushNotification({
      title: 'Files added',
      description: `${nextItems.length} image${nextItems.length > 1 ? 's' : ''} are ready for conversion.`,
      tone: 'success',
    });
  };

  const updateItem = (id: string, updater: (currentItem: ImageItem) => ImageItem) => {
    setItems((current) => current.map((item) => (item.id === id ? updater(item) : item)));
  };

  const removeItem = (id: string) => {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.url);
      }

      return current.filter((item) => item.id !== id);
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

  const handleConvert = async () => {
    if (!items.length) {
      pushNotification({
        title: 'Add at least one image',
        description: 'Use the upload area to add JPG, JPEG, or PNG files first.',
        tone: 'error',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(5);

    try {
      const blob = await generateImagePdf(
        items,
        {
          pageSize,
          orientation,
          margin,
        },
        (value) => setProgress(value),
      );

      const outputName = `${getFileBaseName(items[0].file.name)}-converted.pdf`;
      downloadBlob(blob, outputName);
      pushNotification({
        title: 'PDF generated',
        description: 'Your images were merged into a PDF and downloaded locally.',
        tone: 'success',
      });
    } catch (error) {
      pushNotification({
        title: 'Conversion failed',
        description: error instanceof Error ? error.message : 'We could not generate the PDF.',
        tone: 'error',
      });
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(0), 700);
    }
  };

  const totalBytes = items.reduce((sum, item) => sum + item.file.size, 0);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <FileDropzonePanel
          title="Drop images to build a PDF"
          description="Convert JPG, JPEG, and PNG files locally in the browser. Reorder pages, rotate pages, and download automatically."
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          multiple
          helper="Multiple uploads supported"
          onFiles={addFiles}
          actionLabel="Choose images"
          icon={<SparkIcon className="h-6 w-6" />}
        />

        {items.length ? (
          <Card>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-950 dark:text-white">Page order</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Drag pages into position or use the keyboard-friendly move buttons.
                </p>
              </div>
              <Badge>
                {items.length} page{items.length > 1 ? 's' : ''} · {formatBytes(totalBytes)}
              </Badge>
            </div>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
              <AnimatePresence initial={false}>
                {items.map((item, index) => (
                  <Reorder.Item
                    key={item.id}
                    value={item}
                    className="cursor-grab active:cursor-grabbing"
                    whileDrag={{ scale: 1.02 }}
                    layout
                  >
                    <motion.article
                      layout
                      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center"
                    >
                      <img
                        src={item.url}
                        alt={`Uploaded page ${index + 1}`}
                        className="h-24 w-full rounded-2xl object-cover sm:w-28"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{item.file.name}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{formatBytes(item.file.size)}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Rotation: {item.rotation}°</p>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        <Button type="button" variant="secondary" onClick={() => moveItem(item.id, -1)} disabled={index === 0}>
                          Up
                        </Button>
                        <Button type="button" variant="secondary" onClick={() => moveItem(item.id, 1)} disabled={index === items.length - 1}>
                          Down
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => updateItem(item.id, (current) => ({ ...current, rotation: (current.rotation + 90) % 360 }))}
                        >
                          Rotate
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => removeItem(item.id)}>
                          Delete
                        </Button>
                      </div>
                    </motion.article>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          </Card>
        ) : (
          <EmptyState
            title="No pages yet"
            description="Upload one or more images to start building a PDF."
            action={<p className="text-sm text-slate-500 dark:text-slate-400">Accepted formats: JPG, JPEG, PNG.</p>}
          />
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-slate-950 dark:text-white">PDF options</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Everything runs locally in your browser with pdf-lib.</p>
            </div>

            <div className="grid gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Page size</span>
                <Select value={pageSize} onChange={(event) => setPageSize(event.target.value as PageSizeOption)}>
                  {pageSizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Orientation</span>
                <Select value={orientation} onChange={(event) => setOrientation(event.target.value as Orientation)}>
                  {orientationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </label>

              <label className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Margins</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{margin} pt</span>
                </div>
                <Input type="range" min="0" max="72" step="2" value={margin} onChange={(event) => setMargin(Number(event.target.value))} />
              </label>
            </div>

            <ProgressBar value={progress} label={isGenerating ? 'Generating PDF' : 'Ready'} />

            <Button type="button" className="w-full" onClick={handleConvert} disabled={!items.length || isGenerating} icon={<DownloadIcon className="h-4 w-4" />}>
              {isGenerating ? 'Generating…' : 'Convert and download PDF'}
            </Button>
          </div>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">Local-first</p>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Your images never leave the device. Reordering, rotation, and PDF creation all happen in-browser with no upload step.
          </p>
        </Card>
      </div>
    </div>
  );
}
