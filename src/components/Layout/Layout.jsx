import Footer from '../Footer/Footer';
import HeaderNav from '../HeaderNav/HeaderNav';
import Sidebar from '../Sidebar/Sidebar';

function Layout (){
  return (
    <div className="bg-primary-content">
      <HeaderNav />
      <Sidebar />
      <Footer />
    </div>
  )
}
export default Layout;