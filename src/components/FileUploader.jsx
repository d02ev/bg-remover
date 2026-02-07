import { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function FileUploader({ onFilesSelected }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const validateAndPassFiles = useCallback((files) => {
    setError(null);
    const validFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );

    if (validFiles.length === 0 && files.length > 0) {
      setError('Please upload valid image files (PNG, JPG, WEBP).');
      return;
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [onFilesSelected]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndPassFiles(e.dataTransfer.files);
    }
  }, [validateAndPassFiles]);

  const handleFileInput = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndPassFiles(e.target.files);
    }
  }, [validateAndPassFiles]);

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${isDragging ? 'var(--accent-primary)' : 'var(--border-color)'}`,
        borderRadius: '1rem',
        padding: '3rem',
        textAlign: 'center',
        background: isDragging ? 'rgba(139, 92, 246, 0.05)' : 'var(--card-bg)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        marginBottom: '2rem'
      }}
      onClick={() => document.getElementById('file-input').click()}
    >
      <input
        type="file"
        id="file-input"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        width: '64px', 
        height: '64px', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        margin: '0 auto 1.5rem' 
      }}>
        <Upload size={32} color={isDragging ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '600' }}>
        Click or drag images here
      </h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Supports JPG, PNG, WEBP (Single or Multiple)
      </p>

      {error && (
        <div style={{ 
          color: 'var(--error)', 
          background: 'rgba(239, 68, 68, 0.1)', 
          padding: '0.75rem', 
          borderRadius: '0.5rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem'
        }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
}
