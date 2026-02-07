import { useState } from 'react';
import './index.css';
import FileUploader from './components/FileUploader';
import ResultsGallery from './components/ResultsGallery';
import useBackgroundRemover from './hooks/useBackgroundRemover';

function App() {
  const { processBatch, processedImages, isProcessing } = useBackgroundRemover();

  const handleFilesSelected = (files) => {
    processBatch(files);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ 
          background: 'var(--accent-gradient)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          fontSize: '3rem',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          marginBottom: '1rem'
        }}>
          BG Remover
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          Instant client-side background removal powered by AI.
        </p>
      </header>
      
      <main>
        <FileUploader onFilesSelected={handleFilesSelected} />
        
        {isProcessing && (
          <div style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--accent-primary)' }}>
            <p>Processing images... check cards below.</p>
          </div>
        )}

        <ResultsGallery images={processedImages} />
      </main>

       <footer style={{ 
        marginTop: '4rem', 
        textAlign: 'center', 
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '2rem'
      }}>
        <p>Processed entirely in your browser. No data leaves your device.</p>
      </footer>
    </div>
  );
}

export default App;
