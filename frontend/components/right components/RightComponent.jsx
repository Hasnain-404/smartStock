import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../left components/navline components/DashbordPage';
import MarketsPage from '../left components/navline components/MarketsPage';
import StatisticsPage from '../left components/navline components/StatisticsPage';
import TradeJournalPage from '../left components/navline components/TradeJournalPage';
import BuySellCard from '../stock data components/BuySellCard';

const RightComponent = () => {
    return (
        <div className='w-full h-[calc(100vh-60px)] overflow-y-auto bg-gray-50 px-4 md:px-8 py-6'>

            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/markets" element={<MarketsPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/trade-journal" element={<TradeJournalPage />} />
                {/* <Route path="/markets/:symbol" element={<BuySellCard />} /> */}
            </Routes>
        </div>
    );
};

export default RightComponent;
