// import Navbar from "../components/Navbar";

// import Sidebar from "../components/Sidebar";

// const MainLayout = ({
//     children,
// }) => {
//     return (
//         <div className="min-h-screen bg-base-200">

//             <Navbar />

//             <div className="flex">

//                 <Sidebar />

//                 <main className="flex-1 p-8 overflow-auto">

//                     {children}

//                 </main>

//             </div>

//         </div>
//     );
// };

// export default MainLayout;


import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    return (
        <div className="min-h-screen bg-base-200">

            <Navbar
                setSidebarOpen={
                    setSidebarOpen
                }
            />

            <div className="flex">

                <Sidebar
                    sidebarOpen={
                        sidebarOpen
                    }
                    setSidebarOpen={
                        setSidebarOpen
                    }
                />

                <main
                    className=" flex-1 p-6 md:p-8 lg:ml-0"
                >

                    {children}

                </main>

            </div>

        </div>
    );
};

export default MainLayout;