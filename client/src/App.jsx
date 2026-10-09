import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Dashboard />
      <Toaster
        position="top-center"
        toastOptions={{
          // Shared defaults
          duration: 4000,
          style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#111827',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
            maxWidth: '360px',
          },
          success: {
            iconTheme: { primary: '#2563eb', secondary: '#fff' },
            style: { borderLeft: '4px solid #2563eb' },
          },
          error: {
            duration: 5000,
            iconTheme: { primary: '#dc2626', secondary: '#fff' },
            style: { borderLeft: '4px solid #dc2626' },
          },
          loading: {
            style: { borderLeft: '4px solid #9ca3af' },
          },
        }}
      />
    </>
  );
}

export default App;
