// import { NavLink } from "react-router-dom";

// const Sidebar = () => {

//     const links = [
//         {
//             name: "Dashboard",
//             path: "/dashboard",
//             icon: "📊",
//         },
//         {
//             name: "My Snippets",
//             path: "/snippets",
//             icon: "📄",
//         },
//         {
//             name: "Explore",
//             path: "/explore",
//             icon: "🌎",
//         },
//         {
//             name: "Folders",
//             path: "/folders",
//             icon: "📂",
//         },
//         {
//             name: "Profile",
//             path: "/profile",
//             icon: "👤",
//         },
//     ];

//     return (
//         <aside className="w-64 bg-base-100 border-r border-base-300 h-[calc(100vh-64px)] sticky top-16">

//             <div className="p-4">

//                 <ul className="space-y-2">

//                     {links.map((link) => (

//                         <li key={link.path}>

//                             <NavLink
//                                 to={link.path}
//                                 className={({ isActive }) =>
//                                     `
//                   flex
//                   items-center
//                   gap-3
//                   px-4
//                   py-3
//                   rounded-xl
//                   transition-all
//                   duration-200
//                   ${isActive
//                                         ? "bg-primary text-primary-content"
//                                         : "hover:bg-base-200"
//                                     }
//                 `
//                                 }
//                             >

//                                 <span>
//                                     {link.icon}
//                                 </span>

//                                 <span>
//                                     {link.name}
//                                 </span>

//                             </NavLink>

//                         </li>

//                     ))}

//                 </ul>

//             </div>

//         </aside>
//     );
// };

// export default Sidebar;


import { NavLink } from "react-router-dom";

const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
}) => {

    const links = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "📊",
        },
        {
            name: "My Snippets",
            path: "/snippets",
            icon: "📄",
        },
        {
            name: "Explore",
            path: "/explore",
            icon: "🌎",
        },
        {
            name: "Folders",
            path: "/folders",
            icon: "📂",
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "👤",
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}

            {sidebarOpen && (
                <div
                    className="
          fixed
          inset-0
          bg-black/50
          z-40
          lg:hidden
        "
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
        fixed
        lg:static
        top-0
        left-0
        z-50
        h-screen
        w-64
        bg-base-100
        border-r
        border-base-300
        transition-transform
        duration-300

        ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

        lg:translate-x-0
      `}
            >

                <div className="p-4">

                    <div className="flex justify-between items-center mb-6 lg:hidden">

                        <h2 className="font-bold">
                            SnipVault
                        </h2>

                        <button
                            className="btn btn-sm"
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                        >
                            ✕
                        </button>

                    </div>

                    <ul className="space-y-2">

                        {links.map((link) => (
                            <li key={link.path}>

                                <NavLink
                                    to={link.path}
                                    onClick={() =>
                                        setSidebarOpen(false)
                                    }
                                    className={({
                                        isActive,
                                    }) =>
                                        `
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    transition-all
                    duration-200

                    ${isActive
                                            ? "bg-primary text-primary-content"
                                            : "hover:bg-base-200"
                                        }
                  `
                                    }
                                >
                                    <span>
                                        {link.icon}
                                    </span>

                                    <span>
                                        {link.name}
                                    </span>

                                </NavLink>

                            </li>
                        ))}

                    </ul>

                </div>

            </aside>
        </>
    );
};

export default Sidebar;