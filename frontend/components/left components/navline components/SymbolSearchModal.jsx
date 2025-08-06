import React, { useEffect, useRef, useState } from 'react';

const sampleData = [
    { icon: 'ri-building-line', symbol: 'RELIANCE', name: 'Reliance Industries Ltd', type: 'Stock', exchange: 'NSE' },
    { icon: 'ri-building-line', symbol: 'TCS', name: 'Tata Consultancy Services', type: 'Stock', exchange: 'NSE' },
    { icon: 'ri-building-line', symbol: 'INFY', name: 'Infosys Limited', type: 'Stock', exchange: 'NSE' },
    { icon: 'ri-building-line', symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', type: 'Stock', exchange: 'NSE' },
    { icon: 'ri-building-line', symbol: 'ITC', name: 'ITC Limited', type: 'Stock', exchange: 'NSE' },
    { icon: 'ri-building-line', symbol: 'EURUSD', name: 'EURUSD', type: 'Stock', exchange: 'CMCMARKETS' },
];

const SymbolSearchModal = ({ isOpen, onClose }) => {
    const [search, setSearch] = useState('');
    const modalRef = useRef(null);

    // Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    // Filter with uppercase enforced
    const filteredData = sampleData.filter((item) =>
        item.symbol.includes(search.toUpperCase()) ||
        item.name.toUpperCase().includes(search.toUpperCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center ">
            <div
                ref={modalRef}
                className="bg-white w-full max-w-xl rounded-lg shadow-lg text-black flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold">Symbol Search</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-black text-xl">
                        <i className="ri-close-line cursor-pointer"></i>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="px-6 py-3 border-b border-gray-200">
                    <input
                        type="text"
                        placeholder="Search Stocks"
                        value={search}
                        onChange={(e) => setSearch(e.target.value.toUpperCase())}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase"
                    />
                </div>

                {/* Symbol List */}
                <div className="overflow-y-auto max-h-80 px-6 py-3">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-100 cursor-pointer rounded-md px-2"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-xl">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div>
                                        <div className="font-medium">{item.symbol}</div>
                                        <div className="text-gray-500 text-sm">{item.name}</div>
                                    </div>
                                </div>
                                <div className="text-right text-sm text-gray-500">
                                    <div>{item.type}</div>
                                    <div className="text-black font-medium">{item.exchange}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 px-2">No results found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SymbolSearchModal;
