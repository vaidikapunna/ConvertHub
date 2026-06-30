export interface DocumentToPdfRequest {
  file: File;
  sourceType: 'word' | 'excel' | 'powerpoint';
}

export async function convertDocumentToPdf(_request: DocumentToPdfRequest) {
  throw new Error(
    'Document to PDF conversion is scaffolded for future support. The architecture is ready for backend-free adapters once browser-safe parsers are selected.',
  );
}
