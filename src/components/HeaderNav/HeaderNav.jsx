import './HeaderNav'
function HeaderNav({children}) {
  return (
    <>
      <link href="../../dist.output.css" rel="stylesheet"></link>
      <div className="navbar bg-base-300  ">
        <div className="flex-1">
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>

          <a href=' ' className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered border-none bg-accent-content w-14 h-10 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary-content rounded-box w-52 z-40">
              <li>
                <a href=' ' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a href=' '>Settings</a></li>
              <li><a href=' '>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default HeaderNav;