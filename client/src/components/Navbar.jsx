import { NavLink } from "react-router-dom"

const Navbar = () => {
  const linkStyles = "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-300";


  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-slate-800">
                TaskFlow
            </h1>

            <ul className="flex items-center gap-2 sm:gap-4">
                <li>
                    <NavLink
                      to={'/'}
                      className={({ isActive }) => 
                        `${linkStyles} ${
                            isActive ? "bg-slate-900 text-white"
                              : "text-slate-700 hover:bg-slate-200"
                        }`
                      }
                    >
                      All Tasks
                    </NavLink>
                </li>

                <li>
                    <NavLink
                      to={'/active'}
                      className={({ isActive }) => 
                        `${linkStyles} ${
                            isActive ? "bg-slate-900 text-white"
                              : "text-slate-700 hover:bg-slate-200"
                        }`
                      }
                    >
                      Active
                    </NavLink>
                </li>

                <li>
                    <NavLink
                      to={'/completed'}
                      className={({ isActive }) => 
                        `${linkStyles} ${
                            isActive ? "bg-slate-900 text-white"
                              : "text-slate-700 hover:bg-slate-200"
                        }`
                      }
                    >
                      Completed
                    </NavLink>
                </li> 
            </ul>
        </nav>
    </header>
  )
}

export default Navbar