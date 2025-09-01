import React from "react";
import logo from "../../src/assets/traderscasa-logo-icon.svg";

const LoadingPage = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-sky-900">
            {/* Center Logo */}
            <img
                src={logo}
                alt="TradersCasa Logo"
                className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 mb-8"
            />

            {/* Animated dots */}
            <div className="flex space-x-3">
                <span className="dot animate-pingDot"></span>
                <span className="dot animate-pingDot delay-200"></span>
                <span className="dot animate-pingDot delay-400"></span>
            </div>

            {/* Tailwind CSS custom animation */}
            <style jsx>{`
                .dot {
                    width: 14px;
                    height: 14px;
                    background-color: white;
                    border-radius: 50%;
                }

                @keyframes pingDot {
                    0%, 80%, 100% {
                        transform: scale(0);
                        opacity: 0.3;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-pingDot {
                    animation: pingDot 1.2s infinite;
                }

                .delay-200 {
                    animation-delay: 0.2s;
                }
                .delay-400 {
                    animation-delay: 0.4s;
                }
            `}</style>
        </div>
    );
};

export default LoadingPage;
