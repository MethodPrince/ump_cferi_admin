import { useRef, useState, useEffect } from 'react';
import { getNewsletterPages, BACKEND_URL } from '../services/api';
import '../styles/newsletter.css';

const Newsletter = () => {
  const newsletterRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewsletterPages = async () => {
      setLoading(true);
      try {
        const response = await getNewsletterPages();
        setPages(response.data);
      } catch (error) {
        console.error('Could not load newsletter pages', error);
      } finally {
        setLoading(false);
      }
    };

    loadNewsletterPages();
  }, []);

  const handleDownloadPDF = async () => {
    const container = newsletterRef.current;
    if (!container) return;
    setIsDownloading(true);
    try {
      if (typeof window.html2pdf === 'undefined') {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js';
          s.onload = resolve;
          s.onerror = reject;
          document.body.appendChild(s);
        });
      }

      // Ensure all images inside the container are loaded before rendering
      const imgs = Array.from(container.querySelectorAll('img'));
      const originalLoading = new Map();
      imgs.forEach((img) => {
        originalLoading.set(img, img.loading);
        try { img.loading = 'eager'; } catch (e) {}
      });

      await Promise.all(
        imgs.map((img) =>
          new Promise((resolve) => {
            if (img.complete && img.naturalWidth !== 0) return resolve();
            const onFinish = () => {
              img.removeEventListener('load', onFinish);
              img.removeEventListener('error', onFinish);
              resolve();
            };
            img.addEventListener('load', onFinish);
            img.addEventListener('error', onFinish);
            // safety timeout in case load never fires
            setTimeout(onFinish, 8000);
          })
        )
      );

      const opt = {
        margin: 0.5,
        filename: 'UMPCFERI-Newsletter-2026.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, imageTimeout: 20000 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      await window.html2pdf().set(opt).from(container).save();

      // restore original loading attributes
      imgs.forEach((img) => {
        const orig = originalLoading.get(img);
        try { img.loading = orig === undefined ? '' : orig; } catch (e) {}
      });
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('Could not generate PDF. Opening print dialog as fallback.');
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="newsletter-page" ref={newsletterRef}>
      {/* Header with download button */}
      <div className="newsletter-header">
        <h1>UMPCFERI NEWSLETTER 2026</h1>
        <button onClick={handleDownloadPDF} className="download-pdf-btn">
          <span>📥</span> Download PDF
        </button>
      </div>

      {/* Newsletter Pages */}
      <div className="newsletter-pages">
        {loading ? (
          <div className="newsletter-loading">Loading newsletter pages…</div>
        ) : pages.length ? (
          pages.map((page, index) => {
            const imageSrc = page.image?.startsWith('http') ? page.image : `${BACKEND_URL}${page.image}`;
            return (
              <div key={page._id || index} className="newsletter-page-container">
                <div className="page-number">Page {index + 1}</div>
                <img
                  src={imageSrc}
                  alt={page.alt}
                  className="newsletter-page-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.warn(`Image not found: ${imageSrc}`);
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="newsletter-empty">No newsletter pages are available yet.</div>
        )}
      </div>

      {/* Back to Top Button */}
      <button onClick={scrollToTop} className="back-to-top">
        ↑ Back to Top
      </button>
    </div>
  );
};

export default Newsletter;