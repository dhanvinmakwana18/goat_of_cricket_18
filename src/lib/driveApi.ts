import { DriveFile } from '../types';

const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';
const UPLOAD_API_BASE = 'https://www.googleapis.com/upload/drive/v3';

/**
 * List files in Google Drive
 */
export async function listDriveFiles(
  accessToken: string,
  query: string = '',
  folderId?: string
): Promise<DriveFile[]> {
  try {
    let q = "trashed = false";
    if (folderId) {
      q += ` and '${folderId}' in parents`;
    }
    if (query.trim()) {
      q += ` and name contains '${query.replace(/'/g, "\\'")}'`;
    }

    const fields = 'files(id, name, mimeType, thumbnailLink, webViewLink, createdTime, size, iconLink, parents)';
    const url = `${DRIVE_API_BASE}/files?q=${encodeURIComponent(q)}&fields=${encodeURIComponent(fields)}&pageSize=30&orderBy=createdTime desc`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Failed to list files from Google Drive');
    }

    const data = await res.json();
    return data.files || [];
  } catch (err: any) {
    console.error('listDriveFiles error:', err);
    throw err;
  }
}

/**
 * Upload a file to Google Drive using multipart upload
 */
export async function uploadFileToDrive(
  accessToken: string,
  file: File,
  folderId?: string
): Promise<DriveFile> {
  try {
    const metadata: Record<string, any> = {
      name: file.name,
      mimeType: file.type || 'application/octet-stream',
    };

    if (folderId) {
      metadata.parents = [folderId];
    }

    const formData = new FormData();
    formData.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    );
    formData.append('file', file);

    const res = await fetch(
      `${UPLOAD_API_BASE}/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,thumbnailLink,size,createdTime`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Failed to upload file to Google Drive');
    }

    return await res.json();
  } catch (err: any) {
    console.error('uploadFileToDrive error:', err);
    throw err;
  }
}

/**
 * Create a new folder in Google Drive
 */
export async function createDriveFolder(
  accessToken: string,
  folderName: string,
  parentFolderId?: string
): Promise<DriveFile> {
  try {
    const metadata: Record<string, any> = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    };

    if (parentFolderId) {
      metadata.parents = [parentFolderId];
    }

    const res = await fetch(`${DRIVE_API_BASE}/files?fields=id,name,mimeType,webViewLink,createdTime`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Failed to create folder in Google Drive');
    }

    return await res.json();
  } catch (err: any) {
    console.error('createDriveFolder error:', err);
    throw err;
  }
}

/**
 * Delete a file from Google Drive
 */
export async function deleteDriveFile(
  accessToken: string,
  fileId: string
): Promise<void> {
  try {
    const res = await fetch(`${DRIVE_API_BASE}/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok && res.status !== 204) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || 'Failed to delete file from Google Drive');
    }
  } catch (err: any) {
    console.error('deleteDriveFile error:', err);
    throw err;
  }
}

/**
 * Save a custom text / JSON document directly to Google Drive
 */
export async function saveDocumentToDrive(
  accessToken: string,
  filename: string,
  content: string,
  mimeType: string = 'text/plain'
): Promise<DriveFile> {
  try {
    const metadata = {
      name: filename,
      mimeType,
    };

    const formData = new FormData();
    formData.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    );
    formData.append(
      'file',
      new Blob([content], { type: mimeType })
    );

    const res = await fetch(
      `${UPLOAD_API_BASE}/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,size,createdTime`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Failed to save document to Google Drive');
    }

    return await res.json();
  } catch (err: any) {
    console.error('saveDocumentToDrive error:', err);
    throw err;
  }
}
