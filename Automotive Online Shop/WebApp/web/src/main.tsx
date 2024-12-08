import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { UserDataProvider } from './contexts/UserDataProvider';
import VehicleDetailPage from './pages/vehicle-detail';
import VehicleSearchPage from './pages/vehicle-search';
import PartsStatistics from './pages/report-parts-statistics';
import PricePerCondition from './pages/report-price-per-condition';
import AvgTimeInInventory from './pages/report-avg-time-in-inventory';
import SellerHistory from './pages/report-seller-history';
import MonthlySales from './pages/report-monthly-sales';
import Layout from './Layout';
import { PAGES } from './constants';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserDataProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path={PAGES.VEHICLE_SEARCH} element={<VehicleSearchPage />} />
                <Route path={PAGES.VEHICLE_DETAIL} element={<VehicleDetailPage />} />
                <Route path={PAGES.REPORT_PARTS_STATISTICS} element={<PartsStatistics />} />
                <Route path={PAGES.REPORT_PRICE_PER_CONDITION} element={<PricePerCondition />} />
                <Route path={PAGES.REPORT_AVG_TIME_IN_INVENTORY} element={<AvgTimeInInventory />} />
                <Route path={PAGES.REPORT_SELLER_HISTORY} element={<SellerHistory />} />
                <Route path={PAGES.REPORT_MONTHLY_SALES} element={<MonthlySales />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </QueryClientProvider>
      </UserDataProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
