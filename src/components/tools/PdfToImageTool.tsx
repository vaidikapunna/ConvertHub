import { useEffect, useMemo, useRef, useState } from 'react';
import JSZip from 'jszip';
import { renderPdfPages, type PdfImageFile } from '../../services/conversion';
import type { ImageOutputFormat } from '../../types/converter';
import { downloadBlob, formatBytes, getFileBaseName, isPdfFile } from '../../utils/files';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';
import { FileDropzonePanel } from './FileDropzonePanel';
import { ProgressBar } from '../ui/ProgressBar';
import { Select } from '../ui/Select';
import { useNotifications } from '../../hooks/useNotifications';
import { DownloadIcon, SparkIcon } from '../ui/Icons';
import { Badge } from '../ui/Badge';

export function PdfToImageTool() {
  const { pushNotification } = useNotifications();
  const [file, setFile] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<PdfImageFile[]>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [format, setFormat] = useState<ImageOutputFormat>('png');
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputs, setOutputs] = useState<PdfImageFile[]>([]);
  const thumbnailUrls = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      thumbnailUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const clearPreviews = () => {
    thumbnailUrls.current.forEach((url) => URL.revokeObjectURL(url));
    thumbnailUrls.current = [];
  };

  const loadPdf = async (files: File[]) => {
    const pdf = files.find(isPdfFile);

    if (!pdf) {
      pushNotification({
        title: 'Unsupported file',
        description: 'Please upload a PDF file to preview and export pages.',
        tone: 'error',
      });
      return;
    }

    setFile(pdf);
    setIsRendering(true);
    setProgress(5);
    setThumbnails([]);
    setOutputs([]);
    setSelectedPages([]);
    clearPreviews();

    try {
      const previewPages = await renderPdfPages(pdf, { format: 'png', scale: 0.42 }, (value) => setProgress(value));
      thumbnailUrls.current = previewPages.map((page) => URL.createObjectURL(page.file));
      setThumbnails(previewPages);
      setSelectedPages(previewPages.map((page) => page.pageNumber));
      pushNotification({
        title: 'PDF loaded',
        description: `${previewPages.length} page${previewPages.length > 1 ? 's' : ''} are ready for export.`,
        tone: 'success',
      });
    } catch (error) {
      pushNotification({
        title: 'Could not read PDF',
        description: error instanceof Error ? error.message : 'The PDF could not be previewed.',
        tone: 'error',
      });
      setFile(null);
    } finally {
      setIsRendering(false);
      setTimeout(() => setProgress(0), 700);
    }
  };

  const togglePage = (pageNumber: number) => {
    setSelectedPages((current) =>
      current.includes(pageNumber) ? current.filter((value) => value !== pageNumber) : [...current, pageNumber].sort((left, right) => left - right),
    );
  };

  const selectedPreview = useMemo(() => new Set(selectedPages), [selectedPages]);

  const exportSelection = async () => {
    if (!file || !selectedPages.length) {
      pushNotification({
        title: 'Select at least one page',
        description: 'Pick one or more PDF pages before exporting.',
        tone: 'error',
      });
      return;
    }

    setIsRendering(true);
    setProgress(5);

    try {
      const rendered = await renderPdfPages(file, { format, scale: 2 }, (value) => setProgress(value), selectedPages);
      setOutputs(rendered);

      if (rendered.length === 1) {
        downloadBlob(rendered[0].file, rendered[0].file.name);
      } else {
        const zip = new JSZip();
        for (const output of rendered) {
          zip.file(output.file.name, await output.file.arrayBuffer());
        }

        const blob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
          setProgress(metadata.percent);
        });
        downloadBlob(blob, `${getFileBaseName(file.name)}-images.zip`);
      }

      pushNotification({
        title: 'Export complete',
        description: `Your PDF pages were exported as ${format.toUpperCase()} locally.`,
        tone: 'success',
      });
    } catch (error) {
      pushNotification({
        title: 'Export failed',
        description: error instanceof Error ? error.message : 'Could not export the selected pages.',
        tone: 'error',
      });
    } finally {
      setIsRendering(false);
      setTimeout(() => setProgress(0), 700);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <FileDropzonePanel
          title="Drop a PDF to preview it"
          description="Preview pages, choose specific pages, and export them as JPG or PNG. ZIP downloads are created locally with JSZip."
          accept=".pdf,application/pdf"
          multiple={false}
          helper="Single PDF upload"
          onFiles={loadPdf}
          actionLabel="Choose PDF"
          icon={<SparkIcon className="h-6 w-6" />}
        />

        {thumbnails.length ? (
          <Card>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-950 dark:text-white">Select pages</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Use the toggles below to export only the pages you need.</p>
              </div>
              <Badge>
                {selectedPages.length}/{thumbnails.length} pages selected
              </Badge>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => setSelectedPages(thumbnails.map((page) => page.pageNumber))}>
                Select all
              </Button>
              <Button type="button" variant="secondary" onClick={() => setSelectedPages([])}>
                Clear all
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {thumbnails.map((page) => {
                const url = thumbnailUrls.current[page.pageNumber - 1];
                const isSelected = selectedPreview.has(page.pageNumber);

                return (
                  <button
                    key={page.pageNumber}
                    type="button"
                    className={`overflow-hidden rounded-3xl border text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700'
                    }`}
                    onClick={() => togglePage(page.pageNumber)}
                  >
                    <img src={url} alt={`Page ${page.pageNumber} thumbnail`} className="aspect-[3/4] w-full object-cover" />
                    <div className="flex items-center justify-between gap-3 p-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-950 dark:text-white">Page {page.pageNumber}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Preview ready</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isSelected ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Off'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        ) : (
          <EmptyState
            title="No PDF loaded"
            description="Upload a PDF to generate page previews and select the pages you want to export."
            action={<p className="text-sm text-slate-500 dark:text-slate-400">Export as JPG or PNG, then download a ZIP if needed.</p>}
          />
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-slate-950 dark:text-white">Export settings</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Page rendering and export happen entirely in the browser.</p>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Output format</span>
              <Select value={format} onChange={(event) => setFormat(event.target.value as ImageOutputFormat)}>
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </Select>
            </label>

            <ProgressBar value={progress} label={isRendering ? 'Rendering pages' : 'Ready'} />

            <Button type="button" className="w-full" onClick={exportSelection} disabled={!file || !selectedPages.length || isRendering} icon={<DownloadIcon className="h-4 w-4" />}>
              {isRendering ? 'Exporting…' : 'Export selected pages'}
            </Button>
          </div>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">Downloads</p>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            One page downloads directly. Multiple selected pages are bundled into a ZIP archive for a cleaner browser-only workflow.
          </p>
          {outputs.length ? (
            <div className="space-y-3 pt-2">
              {outputs.map((output) => (
                <div key={output.pageNumber} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-medium text-slate-950 dark:text-white">Page {output.pageNumber}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{formatBytes(output.file.size)}</p>
                  </div>
                  <Button type="button" variant="secondary" onClick={() => downloadBlob(output.file, output.file.name)}>
                    Download
                  </Button>
                </div>
              ))}
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
