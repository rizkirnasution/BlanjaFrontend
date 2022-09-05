import React, { useEffect } from "react";
import Navbar from "../components/module/home/navbar/Navbar";
import Category from "../components/module/home/Category/Category";
import Carousel from "../components/module/home/Carousel/Carousel";
import Populer from "../components/module/home/Populer/Populer";
import Footer from "../components/module/home/footer/Footer";
import axios from "axios";
import Card from "../components/base/Card";
import { FormatRupiah } from "@arismun/format-rupiah";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import './style.css'

const Home = () => {

  const [products, setProducts] = useState([]);
  

  useEffect(() => {
      axios
        .get(`http://localhost:8080/products`) 
        // ${process.env.REACT_APP_API_BACKEND}/products/AllProduct
        .then((response)=>{
          setProducts(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    // fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!auth.email) return <Navigate to="/login" />;
  return (
    <div className="mx-2">
      <Navbar/>
      <Carousel />
      <Category />
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">New</h3>
            <p>What are you currently looking for</p>
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">

            {products.map((item)=>(
                 <div className="col" key={item.id}>
                 <Card
                   src={item.photo}//ganti photo
                   to={`/detail/${item.id}`}
                   titleName={item.name}
                   price={<FormatRupiah value={item.price} />}
                   merk={item.merk}
                 />
               </div>
         ))
            }
          </div>
        </div>
      </div>
      <Populer />
      <Footer />
    </div>
  );
};

export default Home;
