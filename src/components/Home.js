import { hero } from "../asstes/index";
import { useAuth } from "../context/GlobalContext";
import Product from "./Product";

const Home = () => {
  const { products } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <div className="w-[99%] mx-auto">
        <img src={hero}className="w-full [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))] z-[-1]" alt="hero-image" />
      </div>
      <div
        className=" w-[97%] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative top-[-100px]">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
