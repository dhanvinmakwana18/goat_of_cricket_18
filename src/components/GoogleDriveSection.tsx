import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  HardDrive,
  Upload,
  Search,
  FolderPlus,
  Trash2,
  ExternalLink,
  RefreshCw,
  FileText,
  Folder,
  Image,
  Video,
  FileCode,
  File,
  CheckCircle2,
  AlertCircle,
  Download,
  Plus,
  X,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { initAuth, googleSignIn, logout, getAccessToken } from '../lib/auth';
import {
  listDriveFiles,
  uploadFileToDrive,
  createDriveFolder,
  deleteDriveFile,
  saveDocumentToDrive,
} from '../lib/driveApi';
import { DriveFile } from '../types';

export const GoogleDriveSection: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Drive state
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [fetchingFiles, setFetchingFiles] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modals state
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [isCreatingFolder, setIsCreatingFolder] = useState<boolean>(false);

  // Export Note Modal
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>('VK18_Match_Archive.txt');
  const [noteContent, setNoteContent] = useState<string>(
    'Virat Kohli Career Highlights Archive\n------------------------------------\n50 ODI Centuries Record\n26,884 International Runs\n80 International Centuries'
  );
  const [isSavingNote, setIsSavingNote] = useState<boolean>(false);

  // Initialize Auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setLoading(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Fetch files when accessToken changes or user searches
  useEffect(() => {
    if (accessToken) {
      loadFiles();
    }
  }, [accessToken]);

  const loadFiles = async (query: string = searchQuery) => {
    if (!accessToken) return;
    setFetchingFiles(true);
    setStatusMessage(null);
    try {
      const fileList = await listDriveFiles(accessToken, query);
      setFiles(fileList);
    } catch (err: any) {
      console.error('Failed to load drive files:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Could not load files from Google Drive.',
      });
    } finally {
      setFetchingFiles(false);
    }
  };

  const handleSignIn = async () => {
    setAuthError(null);
    setLoading(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setStatusMessage({
          type: 'success',
          text: `Successfully connected to Google Drive as ${result.user.email}`,
        });
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setAuthError(err.message || 'Failed to authenticate with Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setFiles([]);
    setStatusMessage({
      type: 'success',
      text: 'Signed out from Google Drive.',
    });
  };

  // Upload file handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0 || !accessToken) return;

    setUploading(true);
    setStatusMessage(null);

    try {
      const file = selectedFiles[0];
      const uploaded = await uploadFileToDrive(accessToken, file);
      setStatusMessage({
        type: 'success',
        text: `Uploaded "${uploaded.name}" directly to Google Drive!`,
      });
      loadFiles();
    } catch (err: any) {
      console.error('Upload error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to upload file.',
      });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // Create folder handler
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim() || !accessToken) return;

    setIsCreatingFolder(true);
    try {
      await createDriveFolder(accessToken, newFolderName.trim());
      setStatusMessage({
        type: 'success',
        text: `Folder "${newFolderName}" created in Google Drive.`,
      });
      setNewFolderName('');
      setShowFolderModal(false);
      loadFiles();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to create folder.',
      });
    } finally {
      setIsCreatingFolder(false);
    }
  };

  // Destructive delete handler with modal confirmation
  const confirmDeleteFile = async () => {
    if (!fileToDelete || !accessToken) return;

    setIsDeleting(true);
    try {
      await deleteDriveFile(accessToken, fileToDelete.id);
      setStatusMessage({
        type: 'success',
        text: `Successfully deleted "${fileToDelete.name}" from Google Drive.`,
      });
      setFileToDelete(null);
      loadFiles();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to delete file from Google Drive.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Save Note / Backup to Drive
  const handleSaveNoteToDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !noteTitle.trim()) return;

    setIsSavingNote(true);
    try {
      await saveDocumentToDrive(accessToken, noteTitle.trim(), noteContent);
      setStatusMessage({
        type: 'success',
        text: `Saved document "${noteTitle}" to Google Drive!`,
      });
      setShowNoteModal(false);
      loadFiles();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to save note to Google Drive.',
      });
    } finally {
      setIsSavingNote(false);
    }
  };

  // Helper for file icon
  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('folder')) return <Folder className="w-5 h-5 text-[#eab308]" />;
    if (mimeType.includes('image')) return <Image className="w-5 h-5 text-blue-400" />;
    if (mimeType.includes('video')) return <Video className="w-5 h-5 text-purple-400" />;
    if (mimeType.includes('json') || mimeType.includes('code') || mimeType.includes('javascript'))
      return <FileCode className="w-5 h-5 text-emerald-400" />;
    if (mimeType.includes('pdf') || mimeType.includes('text') || mimeType.includes('document'))
      return <FileText className="w-5 h-5 text-amber-400" />;
    return <File className="w-5 h-5 text-white/50" />;
  };

  // Format file size
  const formatSize = (bytes?: string) => {
    if (!bytes) return 'N/A';
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return 'N/A';
    if (num < 1024) return `${num} B`;
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    return `${(num / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section id="drive" class="max-w-7xl mx-auto px-6 lg:px-12 py-16 scroll-mt-20 border-t border-white/5">
      {/* Header Title */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <div class="inline-block px-3 py-1 border border-[#eab308]/30 bg-[#eab308]/5 text-[10px] font-bold text-[#eab308] uppercase tracking-[0.2em] mb-3">
            <span class="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5" /> Workspace Cloud Storage
            </span>
          </div>
          <h2 class="text-4xl font-black text-white uppercase tracking-tight font-brand italic">
            Google Drive Integration
          </h2>
          <div class="h-1.5 w-24 bg-[#eab308] mt-2"></div>
        </div>

        {/* User Status Bar */}
        {user ? (
          <div class="flex items-center gap-4 bg-[#07090d] border border-white/10 p-3">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} class="w-8 h-8 rounded-full border border-[#eab308]" />
            ) : (
              <div class="w-8 h-8 bg-[#eab308] text-black font-black flex items-center justify-center text-xs">
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
            )}
            <div class="text-left">
              <p class="text-xs font-bold text-white">{user.displayName || 'Google User'}</p>
              <p class="text-[10px] text-white/40 font-mono">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              class="p-2 text-white/40 hover:text-[#eab308] hover:bg-white/5 transition-colors border-l border-white/10 ml-2"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div class="flex items-center gap-3">
            {/* Google Standard Material Button Style */}
            <button
              onClick={handleSignIn}
              disabled={loading}
              class="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2.5 px-4 rounded-none border border-gray-300 shadow-sm flex items-center gap-3 transition-colors text-xs font-sans cursor-pointer"
            >
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-4 h-4 shrink-0">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
        )}
      </div>

      {/* Auth Error Banner */}
      {authError && (
        <div class="mb-6 p-4 bg-red-950/50 border border-red-500/30 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {/* Status Alert Banner */}
      {statusMessage && (
        <div
          class={`mb-6 p-4 border text-xs flex items-center justify-between gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
              : 'bg-red-950/40 border-red-500/30 text-red-200'
          }`}
        >
          <div class="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} class="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Drive Workspace Container */}
      {!user ? (
        <div class="bg-[#07090d] border border-white/5 p-10 text-center space-y-6">
          <div class="w-16 h-16 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/20 flex items-center justify-center mx-auto">
            <HardDrive className="w-8 h-8" />
          </div>
          <div class="max-w-md mx-auto space-y-2">
            <h3 class="text-xl font-black text-white font-brand uppercase tracking-wide">
              Connect Google Drive Account
            </h3>
            <p class="text-xs text-white/60 leading-relaxed font-light">
              Sign in with your Google Account to list, search, upload, create folders, and backup King Kohli's legacy statistics directly into your Google Drive.
            </p>
          </div>
          <button
            onClick={handleSignIn}
            disabled={loading}
            class="px-8 py-3.5 bg-[#eab308] text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Connect Google Drive</span>
          </button>
        </div>
      ) : (
        <div class="space-y-6">
          {/* Action Toolbar */}
          <div class="bg-[#07090d] border border-white/5 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div class="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search files in Google Drive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadFiles(searchQuery)}
                class="w-full bg-[#05070a] border border-white/10 pl-9 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#eab308]"
              />
            </div>

            {/* Quick Actions */}
            <div class="flex flex-wrap items-center gap-2">
              <button
                onClick={() => loadFiles(searchQuery)}
                disabled={fetchingFiles}
                class="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-2"
                title="Refresh Files"
              >
                <RefreshCw class={`w-3.5 h-3.5 ${fetchingFiles ? 'animate-spin text-[#eab308]' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={() => setShowFolderModal(true)}
                class="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-2"
              >
                <FolderPlus className="w-3.5 h-3.5 text-[#eab308]" />
                <span>New Folder</span>
              </button>

              <button
                onClick={() => setShowNoteModal(true)}
                class="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-[#eab308]" />
                <span>Save Archive Note</span>
              </button>

              {/* File Upload Input */}
              <label class="px-4 py-2.5 bg-[#eab308] text-black text-[10px] font-black uppercase tracking-widest hover:bg-white cursor-pointer transition-colors flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                <input type="file" onChange={handleFileUpload} disabled={uploading} class="hidden" />
              </label>
            </div>
          </div>

          {/* File Grid / Explorer */}
          <div class="bg-[#07090d] border border-white/5 p-6">
            {fetchingFiles ? (
              <div class="py-12 text-center text-white/40 space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin text-[#eab308] mx-auto" />
                <p class="text-xs uppercase font-mono tracking-widest">Fetching Drive Contents...</p>
              </div>
            ) : files.length === 0 ? (
              <div class="py-12 text-center text-white/30 space-y-3">
                <HardDrive className="w-10 h-10 mx-auto text-white/20" />
                <p class="text-xs uppercase font-mono tracking-widest">No matching Google Drive files found</p>
                <p class="text-[11px] font-light text-white/40">Try uploading a file or creating a new folder above.</p>
              </div>
            ) : (
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((f) => (
                  <div
                    key={f.id}
                    class="p-4 bg-[#05070a] border border-white/5 hover:border-[#eab308]/40 transition-colors flex flex-col justify-between group space-y-3"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div class="flex items-center gap-3 overflow-hidden">
                        <div class="p-2 bg-white/5 shrink-0">{getFileIcon(f.mimeType)}</div>
                        <div class="overflow-hidden">
                          <p class="text-xs font-bold text-white truncate group-hover:text-[#eab308] transition-colors">
                            {f.name}
                          </p>
                          <span class="text-[9px] font-mono text-white/30 uppercase block mt-0.5">
                            {f.mimeType.split('.').pop()?.replace('vnd.google-apps.', '') || 'file'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 font-mono">
                      <span>{formatSize(f.size)}</span>

                      <div class="flex items-center gap-2">
                        {f.webViewLink && (
                          <a
                            href={f.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="p-1.5 text-white/60 hover:text-[#eab308] hover:bg-white/5 transition-colors"
                            title="Open in Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => setFileToDelete(f)}
                          class="p-1.5 text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors"
                          title="Delete File"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Folder Modal */}
      {showFolderModal && (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <form
            onSubmit={handleCreateFolder}
            class="bg-[#07090d] border border-white/10 max-w-md w-full p-6 relative space-y-6"
          >
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 class="text-lg font-black text-white font-brand uppercase flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-[#eab308]" /> Create Drive Folder
              </h3>
              <button
                type="button"
                onClick={() => setShowFolderModal(false)}
                class="text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] uppercase font-mono text-white/40 tracking-wider">Folder Name</label>
              <input
                type="text"
                required
                placeholder="e.g. VK18_Cricket_Archives"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                class="w-full bg-[#05070a] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#eab308]"
              />
            </div>

            <div class="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFolderModal(false)}
                class="px-4 py-2.5 text-xs text-white/60 hover:text-white uppercase font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreatingFolder}
                class="px-6 py-2.5 bg-[#eab308] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                {isCreatingFolder ? 'Creating...' : 'Create Folder'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Save Note / Archive Modal */}
      {showNoteModal && (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <form
            onSubmit={handleSaveNoteToDrive}
            class="bg-[#07090d] border border-white/10 max-w-lg w-full p-6 relative space-y-6"
          >
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 class="text-lg font-black text-white font-brand uppercase flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#eab308]" /> Save Note to Drive
              </h3>
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                class="text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div class="space-y-4">
              <div class="space-y-1">
                <label class="text-[10px] uppercase font-mono text-white/40 tracking-wider">Document Name</label>
                <input
                  type="text"
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  class="w-full bg-[#05070a] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#eab308]"
                />
              </div>

              <div class="space-y-1">
                <label class="text-[10px] uppercase font-mono text-white/40 tracking-wider">Content</label>
                <textarea
                  rows={6}
                  required
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  class="w-full bg-[#05070a] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#eab308] font-mono"
                ></textarea>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                class="px-4 py-2.5 text-xs text-white/60 hover:text-white uppercase font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSavingNote}
                class="px-6 py-2.5 bg-[#eab308] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                {isSavingNote ? 'Saving...' : 'Save to Drive'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MANDATORY Explicit User Confirmation Modal for Destructive Delete */}
      {fileToDelete && (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div class="bg-[#07090d] border border-red-500/40 max-w-md w-full p-6 relative space-y-6">
            <div class="flex items-center gap-3 border-b border-white/10 pb-4">
              <div class="p-3 bg-red-950/50 text-red-400 border border-red-500/20">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <span class="text-[10px] uppercase text-red-400 font-mono tracking-widest block">
                  Confirm Destructive Action
                </span>
                <h3 class="text-lg font-black text-white">Delete File from Drive?</h3>
              </div>
            </div>

            <p class="text-xs text-white/70 leading-relaxed font-light">
              Are you sure you want to permanently delete <span class="text-white font-bold">"{fileToDelete.name}"</span> from your Google Drive? This action cannot be undone.
            </p>

            <div class="flex items-center justify-end gap-3 pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                class="px-4 py-2.5 text-xs text-white/60 hover:text-white uppercase font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteFile}
                disabled={isDeleting}
                class="px-6 py-2.5 bg-red-600 text-white text-xs font-black uppercase tracking-widest hover:bg-red-500 transition-colors"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
