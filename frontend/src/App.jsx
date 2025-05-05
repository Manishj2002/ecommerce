import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import Navigation from './pages/Auth/Navigation';
import { Outlet } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Frontend Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-center text-red-500">Something went wrong. Please try again.</h1>;
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* Accessibility: Skip to content link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:bg-gray-800 focus:text-white focus:p-2">
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" className="py-3">
          <Outlet />
        </main>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;