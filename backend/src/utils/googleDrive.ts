/**
 * Google Drive Sharing URL Parser & Validator
 * Supports extraction of Google Drive file ID from all standard sharing formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
 * - https://drive.google.com/file/u/0/d/FILE_ID/view
 * - https://drive.google.com/file/u/1/d/FILE_ID/view
 * - https://drive.google.com/file/d/FILE_ID/preview
 * - https://drive.google.com/file/d/FILE_ID/edit
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - https://docs.google.com/.../d/FILE_ID/...
 * - <iframe ... src="...FILE_ID..."></iframe> embed codes
 * - Bare ID: FILE_ID (20-50 alphanumeric characters with - and _)
 */

export interface GoogleDriveParseResult {
  isValid: boolean;
  fileId?: string;
  previewUrl?: string;
  streamUrl?: string;
  error?: string;
}

export function parseGoogleDriveUrl(inputUrl: string): GoogleDriveParseResult {
  if (!inputUrl || typeof inputUrl !== "string") {
    return {
      isValid: false,
      error: "Google Drive sharing URL cannot be empty.",
    };
  }

  let trimmed = inputUrl.trim();

  // If user pasted an iframe embed code, extract the src URL
  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    trimmed = iframeMatch[1].trim();
  }

  // Pattern 1: /d/([a-zA-Z0-9_-]{20,50}) (matches /file/d/ID, /file/u/0/d/ID, /document/d/ID, etc.)
  const dMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]{20,50})/);
  if (dMatch && dMatch[1]) {
    const fileId = dMatch[1];
    return {
      isValid: true,
      fileId,
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      streamUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
    };
  }

  // Pattern 2: [?&]id=([a-zA-Z0-9_-]{20,50}) (matches /open?id=ID, /uc?id=ID, etc.)
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{20,50})/);
  if (idParamMatch && idParamMatch[1]) {
    const fileId = idParamMatch[1];
    return {
      isValid: true,
      fileId,
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      streamUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
    };
  }

  // Pattern 3: Bare File ID (standard 20 to 50 chars alphanumeric with - and _)
  if (/^[a-zA-Z0-9_-]{20,50}$/.test(trimmed)) {
    return {
      isValid: true,
      fileId: trimmed,
      previewUrl: `https://drive.google.com/file/d/${trimmed}/preview`,
      streamUrl: `https://drive.google.com/uc?export=download&id=${trimmed}`,
    };
  }

  return {
    isValid: false,
    error:
      "Invalid Google Drive URL. Please paste a valid sharing link (e.g. 'https://drive.google.com/file/d/.../view?usp=sharing') with General Access set to 'Anyone with the link'.",
  };
}
