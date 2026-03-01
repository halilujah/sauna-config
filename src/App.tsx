import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConfiguratorPage } from '@/pages/ConfiguratorPage';
import { AdminPage } from '@/pages/AdminPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ConfiguratorPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
}
