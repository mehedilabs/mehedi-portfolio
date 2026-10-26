/**
 * Google Drive Sharing URL Parser & Validator
 * Supports extraction of Google Drive file ID from all standard sharing formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - Bare ID: FILE_ID
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

  const trimmed = inputUrl.trim();

  // Pattern 1: /file/d/([a-zA-Z0-9_-]+)
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    const fileId = fileDMatch[1];
    return {
      isValid: true,
      fileId,
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      streamUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
    };
  }

  // Pattern 2: id=([a-zA-Z0-9_-]+)
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) {
    const fileId = idParamMatch[1];
    return {
      isValid: true,
      fileId,
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      streamUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
    };
  }

  // Pattern 3: Bare File ID (standard 25 to 45 chars alphanumeric with - and _)
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
      "Invalid Google Drive sharing URL. Please ensure it follows the format 'https://drive.google.com/file/d/.../view?usp=sharing' with general access set to 'Anyone with the link'.",
  };
}

