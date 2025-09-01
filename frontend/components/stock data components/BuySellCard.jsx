import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuySellCard = ({ symbol, price }) => {
    const [lotSize, setLotSize] = useState(1);
    const [tpPips, setTpPips] = useState("");
    const [slPips, setSlPips] = useState("");
    const [tpPrice, setTpPrice] = useState(null);
    const [slPrice, setSlPrice] = useState(null);

    // FIXED decimal places
    const decimalPlaces = symbol === "BTC/USD" ? 2 : 5;

    // Recalculate TP/SL based on trade type
    const calculatePrice = (tradeType) => {
        if (!price || !tpPips || !slPips) return;

        if (tradeType === "BUY") {
            setTpPrice((price + tpPips / (symbol === "BTC/USD" ? 1 : 100000)).toFixed(decimalPlaces));
            setSlPrice((price - slPips / (symbol === "BTC/USD" ? 1 : 100000)).toFixed(decimalPlaces));
        } else if (tradeType === "SELL") {
            setTpPrice((price - tpPips / (symbol === "BTC/USD" ? 1 : 100000)).toFixed(decimalPlaces));
            setSlPrice((price + slPips / (symbol === "BTC/USD" ? 1 : 100000)).toFixed(decimalPlaces));
        }
    };

    const handleOrder = async (type) => {
        calculatePrice(type);

        if (!price || !tpPips || !slPips) {
            toast.error("Please enter TP & SL pips.");
            return;
        }

        try {
            const res = await axios.post(
                "https://smartstock-75j6.onrender.com/stocks/trade",
                {
                    symbol: symbol.replace("/", ""),
                    price: parseFloat(price.toFixed(decimalPlaces)),
                    lotSize,
                    tpPoints: parseInt(tpPips),  // send points also
                    slPoints: parseInt(slPips),  // send points also
                    takeProfit: parseFloat(tpPrice), // for showing in UI
                    stopLoss: parseFloat(slPrice),   // for showing in UI
                    tradeType: type.toLowerCase(),
                },
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(`${type} order placed for ${symbol}`);
            } else {
                toast.error(res.data.message || "Order could not be placed");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to place trade");
        }
    };

    return (
        <div className="bg-white text-gray-800 rounded-xl shadow-md p-6 w-96 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
                {symbol} Order Panel
            </h2>

            <div className="mb-4">
                <p className="text-sm text-gray-500">Live Price</p>
                <p className="text-2xl font-mono text-blue-600">
                    {price ? price.toFixed(decimalPlaces) : "Loading..."}
                </p>
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-1 text-gray-600">Lot Size (0.1 - 100)</label>
                <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    max="100"
                    value={lotSize}
                    onChange={(e) => setLotSize(parseFloat(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-1 text-gray-600">Take Profit (pips)</label>
                <input
                    type="number"
                    value={tpPips}
                    onChange={(e) => setTpPips(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                />
                {tpPrice && <p className="text-xs mt-1 text-green-600">TP Price: {tpPrice}</p>}
            </div>

            <div className="mb-6">
                <label className="block text-sm mb-1 text-gray-600">Stop Loss (pips)</label>
                <input
                    type="number"
                    value={slPips}
                    onChange={(e) => setSlPips(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-red-400 outline-none"
                />
                {slPrice && <p className="text-xs mt-1 text-red-600">SL Price: {slPrice}</p>}
            </div>

            <div className="flex justify-between gap-4">
                <button
                    onClick={() => handleOrder("BUY")}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow-sm transition transform hover:scale-105"
                >
                    Buy
                </button>
                <button
                    onClick={() => handleOrder("SELL")}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold shadow-sm transition transform hover:scale-105"
                >
                    Sell
                </button>
            </div>

            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default BuySellCard;
