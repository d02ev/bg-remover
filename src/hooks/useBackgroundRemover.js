

import { useState, useCallback, useRef } from 'react';
import { removeBackground as imglyRemoveBackground } from '@imgly/background-removal';

export default function useBackgroundRemover() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState([]);
  
  // Use a ref to keep track of processing status if needed in loops, though state is usually enough for UI
  const abortControllerRef = useRef(null);

  const processBatch = useCallback(async (files) => {
    setIsProcessing(true);
    
    // Config for the removal tool
    const config = {
      debug: false,
      progress: (key, current, total) => {},
      model: 'medium', // Balance between speed and quality
    };

    for (const file of files) {
      const id = Math.random().toString(36).substr(2, 9);
      const originalUrl = URL.createObjectURL(file);
      
      // Add to state immediately
      setProcessedImages(prev => [{
        id,
        filename: file.name,
        originalUrl,
        status: 'processing',
        processedUrl: null,
        error: null
      }, ...prev]);

      try {
        const blob = await imglyRemoveBackground(file, config);
        const processedUrl = URL.createObjectURL(blob);

        setProcessedImages(prev => prev.map(img => 
          img.id === id ? { ...img, status: 'completed', processedUrl } : img
        ));
      } catch (err) {
        console.error("Processing failed for", file.name, err);
        setProcessedImages(prev => prev.map(img => 
          img.id === id ? { ...img, status: 'error', error: 'Failed to process' } : img
        ));
      }
    }
    
    setIsProcessing(false);
  }, []);

  return {
    processBatch,
    processedImages,
    isProcessing,
    setProcessedImages // Exporting this so we can clear/remove items if needed
  };
}
