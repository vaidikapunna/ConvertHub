import type { ReactNode } from 'react';
import { useFileDropzone } from '../../hooks/useFileDropzone';
import { Button } from '../ui/Button';
import { UploadIcon } from '../ui/Icons';

interface FileDropzonePanelProps {
  title: string;
  description: string;
  accept?: string;
  multiple?: boolean;
  helper?: string;
  onFiles: (_files: File[]) => void;
  actionLabel: string;
  icon?: ReactNode;
}

export function FileDropzonePanel({
  title,
  description,
  accept,
  multiple,
  helper,
  onFiles,
  actionLabel,
  icon,
}: FileDropzonePanelProps) {
  const { inputRef, inputProps, dropzoneProps, isDragging, openPicker } = useFileDropzone({ accept, multiple, onFiles });

  return (
    <div
      {...dropzoneProps}
      className={`rounded-3xl border border-dashed p-6 transition ${
        isDragging
          ? 'border-cyan-400 bg-cyan-500/10 shadow-glow'
          : 'border-slate-300 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-900/60'
      }`}
    >
      <input ref={inputRef} {...inputProps} />
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
          {icon ?? <UploadIcon className="h-6 w-6" />}
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-slate-950 dark:text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
          {helper ? <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{helper}</p> : null}
        </div>
        <Button type="button" onClick={openPicker} icon={<UploadIcon className="h-4 w-4" />}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
