import React, { useState } from 'react';
import { useLiveData } from '../../context/LiveDataContext';

const BuySellCard = ({ symbol }) => {
    const liveData = useLiveData();
    const price = liveData[symbol.replace('/', '')]?.price;

    const [type, setType] = useState('Buy'); // 'Buy' or 'Sell'
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`${type} ${amount} of ${symbol} at price ${price}`);
        // Here you'd integrate with backend logic
    };

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 w-full max-w-md mx-auto border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{symbol}</h2>
                    <p className="text-xs text-gray-400">Live {type} Order</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold text-gray-900">{price ? `${price} USD` : 'Loading...'}</p>
                </div>
            </div>

            {/* Buy/Sell Toggle */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className={`w-24 py-2 rounded-full font-semibold border transition ${type === 'Buy'
                        ? 'bg-green-500 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300'
                        }`}
                    onClick={() => setType('Buy')}
                >
                    Buy
                </button>
                <button
                    className={`w-24 py-2 rounded-full font-semibold border transition ${type === 'Sell'
                        ? 'bg-red-500 text-white border-red-600'
                        : 'bg-white text-gray-700 border-gray-300'
                        }`}
                    onClick={() => setType('Sell')}
                >
                    Sell
                </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-lg text-white font-semibold shadow-sm ${type === 'Buy'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                        }`}
                >
                    {type} Now
                </button>
            </form>
        </div>
    );
};

export default BuySellCard;
