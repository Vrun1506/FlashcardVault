"use client";
import React, { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB Limit matching your bucket setting

  const validateAndSetFile = (selectedFile: File) => {
    setError(null);
    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum size is 10MB.");
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      
      // Get current session for the user ID and token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("You must be logged in to upload files.");
      }

      const user = session.user;
      const token = session.access_token;

      // 1. UPLOAD TO SUPABASE STORAGE
      // We store it in a folder named after the user's ID to match your RLS policy
      // Adding a timestamp prevents filename collisions
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      
      const { error: storageError } = await supabase.storage
        .from("temp_uploads")
        .upload(filePath, file);

      if (storageError) {
        throw new Error(`Storage error: ${storageError.message}`);
      }

      // 2. NOTIFY BACKEND TO PROCESS
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      // We send the file_path from storage, NOT the actual file data
      const response = await fetch(`${apiUrl}/convert-from-storage`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          file_path: filePath 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); 
        throw new Error(errorData.detail || "Processing failed on server.");
      }

      alert("Success! The PDF is being processed. Check your console."); 
      setFile(null); // Reset UI

    } catch (err: Error | unknown) {
      console.error("Workflow Error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf"
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
            relative rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ease-in-out
            ${isDragging 
                ? "border-blue-500 bg-blue-50 scale-[1.02]" 
                : error 
                  ? "border-red-300 bg-red-50"
                  : "border-slate-300 bg-white hover:border-slate-400"
            }
        `}
      >
        {file ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900">{file.name}</h3>
              <p className="text-slate-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            {!uploading && (
                <button 
                    onClick={() => setFile(null)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                    Remove file
                </button>
            )}
            {error && (
                <div className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded">
                    {error}
                </div>
            )}
            <div className="pt-4">
                 <button 
                    onClick={handleUpload}
                    disabled={uploading}
                    className={`px-8 py-3 font-medium rounded-lg transition-colors shadow-sm w-full sm:w-auto ${
                        uploading 
                        ? "bg-slate-400 text-white cursor-not-allowed" 
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                    {uploading ? "Uploading to Vault..." : "Generate Flashcards"}
                </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
             <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors ${
                isDragging ? "bg-blue-200 text-blue-700" : error ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-600"
            }`}>
              {error ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )}
            </div>
            <div>
              <h3 className={`text-lg font-medium ${error ? "text-red-800" : "text-slate-900"}`}>
                {error ? "Upload Failed" : "Upload PDF"}
              </h3>
              <p className={`mt-1 ${error ? "text-red-600" : "text-slate-500"}`}>
                {error || "Drag and drop your file here, or click to browse (Max 10MB)"}
              </p>
            </div>
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Select File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;