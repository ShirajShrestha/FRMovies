import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="lg:mx-20 lg:my-12 md:mx-10 md:my-6 sm:mx-5 sm:my-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
