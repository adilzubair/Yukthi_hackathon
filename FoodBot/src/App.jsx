import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; // Adjust the import path as necessary
import DashboardLayout from './components/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import OrdersPage from './pages/OrdersPage';
import MenuPage from './pages/MenuPage';
import CustomersPage from './pages/CustomersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login Page at root */}
        {/* Dashboard Layout and nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} /> {/* Default to Overview when "/dashboard" is accessed */}
          <Route path="overview" element={<OverviewPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
