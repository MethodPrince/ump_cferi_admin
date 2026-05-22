import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPageBySlug } from '../services/api';
import '../styles/about.css';

const Page = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data } = await getPageBySlug(slug);
        setPage(data);
      } catch (err) {
        setError('Page not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return <div className="about-container"><p>Loading page...</p></div>;
  }

  if (error) {
    return (
      <div className="about-container">
        <h1>Page not found</h1>
        <p>{error}</p>
        <Link to="/" className="btn btn-secondary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="about-container">
      <h1 className="about-title">{page.title}</h1>
      {page.excerpt && <p className="about-description">{page.excerpt}</p>}
      <div className="about-section">
        {page.content.split('\n').map((block, index) => (
          <p key={index}>{block}</p>
        ))}
      </div>
    </div>
  );
};

export default Page;
