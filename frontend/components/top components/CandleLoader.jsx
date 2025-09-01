import React from "react";

const CandleLoader = () => {
    const colors = ["#22c55e", "#ef4444", "#22c55e"]; // green, red, green

    return (
        <div className=" h-[80%] flex items-center justify-center ">
            {/* Candle loader */}
            <div className="flex items-end gap-4">
                {colors.map((color, i) => (
                    <div
                        key={i}
                        className="w-6 md:w-8 rounded-t-lg animate-candle"
                        style={{
                            backgroundColor: color,
                            animationDelay: `${i * 0.2}s`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Custom animation */}
            <style jsx>{`
        @keyframes candleGrow {
          0%, 100% {
            height: 20px;
            opacity: 0.5;
          }
          50% {
            height: 60px;
            opacity: 1;
          }
        }
        .animate-candle {
          animation: candleGrow 1s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
};

export default CandleLoader;
