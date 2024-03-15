import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; // Adjust the import path as necessary
import DashboardLayout from './components/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import OrdersPage from './pages/OrdersPage';
import MenuPage from './pages/MenuPage';
import View from './pages/View';
import Add from './pages/Add';
import Edit from './pages/Edit';
import CustomersPage from './pages/CustomersPage';
import SignupWrapper from './pages/signup';

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
          <Route path="/dashboard/menu/view" element={<View />} />
          <Route path="/dashboard/menu/add" element={<Add />} />
          <Route path="/dashboard/menu/edit" element={<Edit />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="signup" element={<SignupWrapper />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
