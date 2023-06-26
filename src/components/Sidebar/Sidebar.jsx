function Sidebar() {
  return (
    <div className="drawer z-40">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-primary-content text-base-content">
          {/* Sidebar content here */}
          <li><a href=' '>Sidebar Item 1</a></li>
          <li><a href=' '>Sidebar Item 2</a></li>

        </ul>
      </div>
    </div>
  )
}
export default Sidebar;