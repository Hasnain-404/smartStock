import React, { useState, useEffect } from "react";

const BuySellCard = ({ symbol, price }) => {
    const [lotSize, setLotSize] = useState(1);
    const [tpPips, setTpPips] = useState("");
    const [slPips, setSlPips] = useState("");
    const [tpPrice, setTpPrice] = useState(null);
    const [slPrice, setSlPrice] = useState(null);

    // Decimal places based on symbol
    const decimalPlaces = symbol === "BTC/USD" ? 2 : 5;

    // TP/SL calculation whenever input or price changes
    useEffect(() => {
        if (price) {
            if (tpPips) setTpPrice((price + tpPips / 100000).toFixed(decimalPlaces));
            if (slPips) setSlPrice((price - slPips / 100000).toFixed(decimalPlaces));
        }
    }, [tpPips, slPips, price, decimalPlaces]);

    const handleOrder = (type) => {
        if (!price || !tpPips || !slPips) {
            alert("Please enter TP & SL pips.");
            return;
        }
        const order = {
            symbol,
            type,
            entryPrice: price.toFixed(decimalPlaces),
            lotSize,
            tpPips,
            slPips,
            tpPrice,
            slPrice,
            time: new Date().toLocaleString(),
        };
        console.log("📊 Trade Log:", order);
        alert(`${type} order placed for ${symbol}`);
    };

    return (
        <div className="bg-white text-gray-800 rounded-xl shadow-md p-6 w-96 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
                {symbol} Order Panel
            </h2>

            {/* Live Price */}
            <div className="mb-4">
                <p className="text-sm text-gray-500">Live Price</p>
                <p className="text-2xl font-mono text-blue-600">
                    {price ? price.toFixed(decimalPlaces) : "Loading..."}
                </p>
            </div>

            {/* Lot Size */}
            <div className="mb-4">
                <label className="block text-sm mb-1 text-gray-600">
                    Lot Size (0.1 - 100)
                </label>
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

            {/* Take Profit */}
            <div className="mb-4">
                <label className="block text-sm mb-1 text-gray-600">
                    Take Profit (pips)
                </label>
                <input
                    type="number"
                    value={tpPips}
                    onChange={(e) => setTpPips(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                />
                {tpPrice && (
                    <p className="text-xs mt-1 text-green-600">TP Price: {tpPrice}</p>
                )}
            </div>

            {/* Stop Loss */}
            <div className="mb-6">
                <label className="block text-sm mb-1 text-gray-600">
                    Stop Loss (pips)
                </label>
                <input
                    type="number"
                    value={slPips}
                    onChange={(e) => setSlPips(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-red-400 outline-none"
                />
                {slPrice && (
                    <p className="text-xs mt-1 text-red-600">SL Price: {slPrice}</p>
                )}
            </div>

            {/* Buy & Sell Buttons */}
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
        </div>
    );
};

export default BuySellCard;
