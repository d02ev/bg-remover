import { Download, AlertCircle, Loader2 } from 'lucide-react';
import { saveAs } from 'file-saver';

export default function ImageCard({ image }) {
  const handleDownload = () => {
    if (image.processedUrl) {
      saveAs(image.processedUrl, `bg-removed-${image.filename.replace(/\.[^/.]+$/, "")}.png`);
    }
  };

  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: '1rem',
      overflow: 'hidden',
      border: '1px solid var(--border-color)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Image Area */}
      <div style={{ 
        height: '240px', 
        position: 'relative',
        background: 'repeating-conic-gradient(#1f1f21 0% 25%, #161618 0% 50%) 50% / 20px 20px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {image.status === 'processing' && (
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'rgba(0,0,0,0.6)', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 10,
            backdropFilter: 'blur(2px)'
          }}>
            <Loader2 className="spin" size={32} color="var(--accent-primary)" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Processing...</span>
          </div>
        )}
        
        {image.status === 'error' && (
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'rgba(0,0,0,0.6)', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 10
          }}>
            <AlertCircle size={32} color="var(--error)" />
            <span style={{ marginTop: '0.5rem', color: 'var(--error)' }}>Failed</span>
          </div>
        )}

        {/* Show processed if available, otherwise original */}
        <img 
          src={image.processedUrl || image.originalUrl} 
          alt={image.filename}
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain',
            opacity: image.status === 'processing' ? 0.5 : 1
          }} 
        />
      </div>

      {/* Footer */}
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            maxWidth: '150px',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {image.filename}
          </p>
        </div>
        
        <button 
          onClick={handleDownload}
          disabled={image.status !== 'completed'}
          style={{
            background: image.status === 'completed' ? 'var(--accent-primary)' : '#27272a',
            color: image.status === 'completed' ? 'white' : 'var(--text-secondary)',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            cursor: image.status === 'completed' ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s'
          }}
          title="Download Result"
        >
          <Download size={20} />
        </button>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
