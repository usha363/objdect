
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { HistoryPage } from './pages/HistoryPage';
import { AppRoute } from './types';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={AppRoute.Landing} element={<LandingPage />} />
          <Route path={AppRoute.Dashboard} element={<Dashboard />} />
          <Route path={AppRoute.History} element={<HistoryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
