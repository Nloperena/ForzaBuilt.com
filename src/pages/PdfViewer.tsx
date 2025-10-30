import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PdfViewer: React.FC = () => {
  const { pdfPath } = useParams<{ pdfPath: string }>();
  const navigate = useNavigate();
  const [decodedPdfUrl, setDecodedPdfUrl] = useState<string>('');
  
  useEffect(() => {
    if (pdfPath) {
      // Decode the URL-encoded path
      const decoded = decodeURIComponent(pdfPath);
      setDecodedPdfUrl(decoded);
    }
  }, [pdfPath]);

  if (!decodedPdfUrl) {
    return (
      <div className="min-h-screen bg-[#115B87] flex flex-col">
        <Header />
        <main className="flex-1 pt-20 pb-10">
          <div className="max-w-screen-2xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-kallisto font-black text-white mb-4">PDF Not Found</h1>
            <p className="text-gray-300 mb-8">The document you're looking for doesn't exist or cannot be loaded.</p>
            <Button 
              onClick={() => navigate(-1)}
              className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Check if this is a TDS file that's no longer available
  if (decodedPdfUrl.startsWith('/TDS/')) {
    return (
      <div className="min-h-screen bg-[#115B87] flex flex-col">
        <Header />
        <main className="flex-1 pt-20 pb-10">
          <div className="max-w-screen-2xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-kallisto font-black text-white mb-4">TDS Temporarily Unavailable</h1>
            <p className="text-gray-300 mb-8">Technical Data Sheets are temporarily unavailable. Please contact us for product information.</p>
            <Button 
              onClick={() => navigate(-1)}
              className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#115B87] flex flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-10">
        <div className="max-w-screen-2xl mx-auto px-4">
          {/* Controls Bar */}
          <div className="flex justify-between items-center mb-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-kallisto font-bold text-white">
                Technical Data Sheet
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost"
                onClick={() => window.open(decodedPdfUrl, '_blank')}
                className="text-white hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
              <Button 
                variant="ghost"
                onClick={() => {
                  // Create an anchor element to trigger download
                  const link = document.createElement('a');
                  link.href = decodedPdfUrl;
                  link.download = decodedPdfUrl.split('/').pop() || 'document.pdf';
                  link.click();
                }}
                className="text-white hover:bg-white/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="w-full rounded-xl overflow-hidden border border-white/20 bg-white h-[calc(100vh-240px)]">
            <iframe 
              src={decodedPdfUrl} 
              className="w-full h-full"
              title="PDF Viewer"
              loading="lazy"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PdfViewer;