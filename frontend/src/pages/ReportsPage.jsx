import React from 'react';
import { useFetch } from '../hooks/useFetch';
import reportService from '../api/reportService';
import Dashboard from '../components/reports/Dashboard';

const ReportsPage = () => {
  const { data: dashboardData } = useFetch(() => reportService.getDashboard());
  const { data: statistics } = useFetch(() => reportService.getStatistics());

  return (
    <div className="reports-page">
      <h1>Báo Cáo & Thống Kê</h1>
      
      {dashboardData && <Dashboard data={dashboardData.data} />}
      
      {statistics && (
        <div className="statistics">
          <h2>Thống Kê</h2>
          <pre>{JSON.stringify(statistics.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;

