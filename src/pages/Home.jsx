import Movielist from "../components/Movielist";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-20 my-12">
        <Movielist />
      </div>
    </div>
  );
};

export default Home;
