import { Link } from "react-router-dom";

function Sidebar({role}) {
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
          {
            role===0 ?   <><li><Link to={"/reclamation"}>Réclamation</Link></li>  <li><Link to={"/feedback"}>Feedback</Link></li>  </> :
            <><li><Link to={"/addreclamation"}>Ajouter Réclamation</Link></li>  <li><Link to={"/addfeedback"}>Ajputer Feedback</Link></li> </>
            
          }

        



        </ul>
      </div>
    </div>
  )
}
export default Sidebar;