import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Download, Package } from 'lucide-react';
import ImageCard from './ImageCard';

export default function ResultsGallery({ images }) {
  if (!images || images.length === 0) return null;

  const completedImages = images.filter(img => img.status === 'completed');
  
  const handleDownloadAll = async () => {
    if (completedImages.length === 0) return;

    const zip = new JSZip();
    
    // Add images to zip
    for (const img of completedImages) {
      try {
         const response = await fetch(img.processedUrl);
         const blob = await response.blob();
         zip.file(`bg-removed-${img.filename.replace(/\.[^/.]+$/, "")}.png`, blob);
      } catch (e) {
        console.error("Failed to add to zip", e);
      }
    }

    // Generate and save
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "background-removed-images.zip");
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem' 
      }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Results</h2>
        
        {completedImages.length > 1 && (
          <button 
            onClick={handleDownloadAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--accent-secondary)',
              color: 'white',
              padding: '0.6rem 1.2rem',
              borderRadius: '0.5rem',
              fontWeight: '600'
            }}
          >
            <Package size={18} />
            Download All ZIP
          </button>
        )}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {images.map(img => (
          <ImageCard key={img.id} image={img} />
        ))}
      </div>
    </div>
  );
}
