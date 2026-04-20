import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught:', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            color: '#fff',
            background: '#000',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <h1 style={{ color: '#febd59', marginBottom: '1rem' }}>Something went wrong.</h1>
          <p style={{ maxWidth: 520, marginBottom: '1.5rem', color: '#ccc' }}>
            Sorry about that — the page hit an unexpected error. Please refresh, or reach out directly.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 50,
              border: 'none',
              background: 'linear-gradient(135deg, #febd59 0%, #ffd700 100%)',
              color: '#000',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
