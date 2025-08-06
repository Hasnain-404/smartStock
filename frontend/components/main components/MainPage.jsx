import React from 'react';
import LeftComponent from '../left components/LeftComponent';
import RightComponent from '../right components/RightComponent';
import Navbar from '../top components/navbar';

const MainPage = () => {
    return (
        <div className="flex w-full min-h-screen bg-gray-100 relative">
            {/* Sidebar */}
            <LeftComponent />

            {/* Main Content Area */}
            <div
                className="
                    flex flex-col
                    w-full
                    md:w-[calc(100%-20%)] 
                    ml-0
                    md:ml-[20%] 
                    transition-all
                "
            >
                <Navbar />
                <RightComponent />

            </div>
        </div>
    );
};

export default MainPage;
