import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';

interface UseFileDropzoneOptions {
  accept?: string;
  multiple?: boolean;
  onFiles: (_files: File[]) => void;
}

export function useFileDropzone({ accept, multiple = true, onFiles }: UseFileDropzoneOptions) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openPicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) {
        return;
      }

      onFiles(Array.from(fileList));
    },
    [onFiles],
  );

  const inputProps = {
    type: 'file' as const,
    className: 'sr-only',
    accept,
    multiple,
    onChange: (event: ChangeEvent<HTMLInputElement>) => handleFiles(event.target.files),
  };

  const dropzoneProps = {
    onDragEnter: (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    onDragOver: (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsDragging(false);
    },
    onDrop: (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsDragging(false);
      handleFiles(event.dataTransfer.files);
    },
  };

  return {
    inputRef,
    inputProps,
    dropzoneProps,
    isDragging,
    openPicker,
  };
}
