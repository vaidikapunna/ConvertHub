export function createId(prefix = 'item') {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function formatBytes(bytes: number) {
  if (bytes === 0) {
    return '0 B';
  }

  const sizes = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
  const value = bytes / 1024 ** index;

  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${sizes[index]}`;
}

export function getFileBaseName(fileName: string) {
  return fileName.replace(/\.[^.]+$/, '');
}

export function getFileExtension(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase() ?? '';
}

export function isImageFile(file: File) {
  return file.type.startsWith('image/');
}

export function isPdfFile(file: File) {
  return file.type === 'application/pdf' || getFileExtension(file.name) === 'pdf';
}

export function acceptAttribute(extensions: string[]) {
  return extensions.join(',');
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
