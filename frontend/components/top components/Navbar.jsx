import React from 'react';
import NotificationPage from './NotificationPage';

const Navbar = () => {
    return (
        <div className='w-full bg-gray-50 shadow-sm'>
            <div className='flex justify-between items-center h-[60px] px-4 sm:px-6 md:px-10'>
                {/* Dashboard Title */}
                <div className='text-xl font-semibold truncate'>
                    <span className='ml-12 sm:ml-1'>Dashboard</span>
                </div>

                {/* Notification Icon */}
                <NotificationPage />
            </div>
        </div>
    );
};

export default Navbar;
