import Footer from '../Footer/Footer';
import HeaderNav from '../HeaderNav/HeaderNav';
import Sidebar from '../Sidebar/Sidebar';

function Layout ({role}){
  return (
    <div className="bg-primary-content">
      <HeaderNav />
      <Sidebar role={role} />
      <Footer />
    </div>
  )
}
export default Layout;