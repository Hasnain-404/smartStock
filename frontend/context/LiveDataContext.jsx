import React, { createContext, useContext, useEffect, useState } from 'react';

const LiveDataContext = createContext();

export const useLiveData = () => useContext(LiveDataContext);

export const LiveDataProvider = ({ children }) => {
    const [liveData, setLiveData] = useState({});

    useEffect(() => {
        const socket = new WebSocket("wss://ws.twelvedata.com/v1/quotes/price?apikey=a5dda0add8754f5b912a0fcf4c2f4499");

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    action: "subscribe",
                    params: {
                        symbols: "BTC/USD,EUR/USD",
                    },
                })
            );
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.symbol && data.price) {
                setLiveData((prev) => ({
                    ...prev,
                    [data.symbol.replace("/", "")]: data,
                }));
            }
        };

        return () => socket.close();
    }, []);

    return (
        <LiveDataContext.Provider value={liveData}>
            {children}
        </LiveDataContext.Provider>
    );
};
