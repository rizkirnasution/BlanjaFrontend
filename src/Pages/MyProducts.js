import React,{useEffect,useState} from 'react'
import Footer from '../components/module/home/footer/Footer'
import Navbar from '../components/module/home/navbar/Navbar'
import Card from "../components/base/Card";
import { useSearchParams } from 'react-router-dom';
import axios from "axios"

const MyProducts = () => {


  const [searchParams, setSearchParams] = useSearchParams([]);
  const [products, setProduct] = useState([])
  const getProducts = async () => {
  axios
    .get(
      `http://localhost:8080/products/cari?${searchParams}`
    )
    .then((res) => {
      console.log(res.data.data);
      setProduct(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
  useEffect(() => {


    getProducts();
    searchParams.get("search");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchParams]);
 

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="products">
            {/* <h3 className="title">New</h3> */}
            {/* <p className="mt-5">Your Looking For This Product</p> */}
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 mt-5">
        
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
            {products.length > 0 ? (
              products.map((item) => (
                <div className="col" key={item.id}>
                  <Card
                    src={item.photo}
                    to={`/detail/${item.id}`}
                    titleName={item.name}
                    price={item.price}
                    merk={item.merk}
                  />
                </div>
              ))
            ) : (
              <div className=" text-center m-auto mb-5 mt-5">
                <h2>Sorry... Data Not Found</h2>
              </div>
            )}
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 mt-5">
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyProducts