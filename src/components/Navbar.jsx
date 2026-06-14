import { useSelector } from "react-redux";

import ThemeToggle from "./ThemeToggle";

const Navbar = ({ setSidebarOpen }) => {

    const { user } = useSelector(
        (state) => state.auth
    );

    return (
        <header className="h-16 border-b border-base-300 bg-base-100/80 backdrop-blur-md sticky top-0 z-50">

            <div className="h-full px-6 flex items-center justify-between">

                <button
                    className="
    btn
    btn-ghost
    btn-square
    lg:hidden
    mr-2
  "
                    onClick={() =>
                        setSidebarOpen(true)
                    }
                >
                    ☰
                </button>

                {/* Logo */}

                <div className="flex items-center gap-3">


                    <div className="w-9 h-9 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold">

                        S

                    </div>

                    <div>

                        <h1 className="font-bold text-lg">
                            SnipVault
                        </h1>

                        <p className="text-xs opacity-60">
                            Code Snippet Manager
                        </p>

                    </div>

                </div>

                {/* Search */}

                {/* <div className="hidden md:block w-[400px]">

                    <input
                        type="text"
                        placeholder="Search snippets..."
                        className="input input-bordered w-full"
                    />

                </div> */}

                {/* Actions */}

                <div className="flex items-center gap-4">

                    <ThemeToggle />

                    {/* <div className="avatar placeholder">

                        <div className="bg-primary text-primary-content rounded-full w-10">

                            <span>
                                {user?.name?.charAt(0)}
                            </span>

                        </div>

                    </div> */}

                </div>

            </div>

        </header>
    );
};

export default Navbar;