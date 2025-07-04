import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../appointmentbooking/components/components/Sidebar';
import Header from '../appointmentbooking/components/components/Header';
import DashboardPage from '../appointmentbooking/components/components/DashboardPage';
import AgentChatPage from '../appointmentbooking/components/components/AgentChatPage';
import BookingsPage from '../appointmentbooking/components/components/BookingsPage';
import { AppRoutes } from './constants';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex h-screen bg-neutral-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 p-6">
            <Routes>
              <Route path="/" element={<Navigate to={AppRoutes.DASHBOARD} replace />} />
              <Route path={AppRoutes.DASHBOARD} element={<DashboardPage />} />
              <Route path={AppRoutes.AGENT_CHAT} element={<AgentChatPage />} />
              <Route path={AppRoutes.BOOKINGS} element={<BookingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
