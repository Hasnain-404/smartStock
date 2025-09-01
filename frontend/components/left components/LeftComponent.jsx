import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeftComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const navigate = useNavigate(); // 👈 navigate hook

    // Detect outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const navItems = [
        ['ri-dashboard-line', 'Dashboard', '/dashboard'],
        ['ri-add-large-line', 'Markets', '/markets'],
        ['ri-stock-line', 'Trades', '/trade-positions'],
        ['ri-bar-chart-horizontal-line', 'Statistics', '/statistics'],
        ['ri-book-open-line', 'Trade Journal', '/trade-journal'],
    ];

    // Logout function
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
            navigate("/login"); // redirect after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            {/* Mobile Menu Icon */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button onClick={() => setIsOpen(true)} className="text-black text-2xl">
                    <i className="ri-menu-line"></i>
                </button>
            </div>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`
                    bg-gray-950 text-white font-sans h-[100vh]
                    md:w-[20%] w-fit min-w-[240px] fixed top-0 left-0 z-40
                    transform transition-transform duration-300
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                `}
            >
                {/* Logo */}
                <div className='text-center py-4 font-bold text-3xl cursor-pointer'>
                    <NavLink to={"/"}>Smart Stock</NavLink>
                </div>

                {/* Nav Items */}
                <div className='font-semibold text-gray-400 text-base space-y-5 px-7 mt-9'>
                    {navItems.map(([icon, label, path], idx) => (
                        <NavLink
                            key={idx}
                            to={path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 py-3 px-3 rounded-xl cursor-pointer transition-transform duration-150 active:scale-95
                                ${isActive
                                    ? 'bg-white text-black shadow hover:scale-[1.02]'
                                    : 'hover:bg-white hover:text-black hover:scale-[1.03] text-gray-400'}`
                            }
                        >
                            <span className='w-6 flex justify-center text-xl'>
                                <i className={icon}></i>
                            </span>
                            <span className='flex-1'>{label}</span>
                        </NavLink>
                    ))}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 py-3 px-3 rounded-xl w-full text-gray-400 hover:bg-white hover:text-black hover:scale-[1.03] transition-transform duration-150"
                    >
                        <span className='w-6 flex justify-center text-xl'>
                            <i className="ri-logout-box-line"></i>
                        </span>
                        <span >Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default LeftComponent;
