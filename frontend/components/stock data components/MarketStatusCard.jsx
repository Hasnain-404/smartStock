import React, { useEffect, useState } from 'react';

const MarketStatusCard = () => {
    const [timeNow, setTimeNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeNow(new Date());
        }, 1000); // Update every second
        return () => clearInterval(interval);
    }, []);

    const getTimeString = (date) =>
        date.toLocaleTimeString('en-AU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Australia/Sydney',
        });

    const totalMinutes = 24 * 60;
    const dateInSydney = new Date(
        timeNow.toLocaleString('en-US', { timeZone: 'Australia/Sydney' })
    );

    const currentHour = dateInSydney.getHours();
    const currentMinute = dateInSydney.getMinutes();
    const currentTimeString = getTimeString(dateInSydney);

    const currentMinutes = currentHour * 60 + currentMinute;
    const progressPercent = (currentMinutes / totalMinutes) * 100;

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
            {/* Market Header */}
            <div className="flex items-center gap-2 text-green-600 font-semibold mb-1 text-lg">
                <i className="ri-sun-line text-xl"></i>
                Main market
            </div>
            <p className="text-gray-600 text-sm mb-4">Exchange is currently active.</p>

            {/* Time Progress */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full mb-2">
                <div
                    className="absolute top-0 left-0 h-2 bg-green-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                ></div>
                {/* Time Marker */}
                <div
                    className="absolute top-[-10px] text-[12px] font-semibold text-gray-700"
                    style={{ left: `${progressPercent}%`, transform: 'translateX(-50%)' }}
                >
                    {currentTimeString}
                </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>00:00</span>
                <span>23:59</span>
            </div>

            {/* Trading Hours Box */}
            <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-600">
                <p className="mb-1 font-medium">
                    <strong className="text-green-600">Trading Hours (Monday - Friday):</strong>
                </p>
                <p>
                    <strong className="text-green-600">Main market</strong> 00:00 - 23:59
                </p>
            </div>

            {/* Timezone Info */}
            <p className="text-xs text-gray-400 text-center mt-3">
                All times are displayed in the Australia/Sydney timezone (AEST, UTC+10:00).
            </p>
        </div>
    );
};

export default MarketStatusCard;
