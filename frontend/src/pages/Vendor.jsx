import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Vendor = () => {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState([]);
  let userId = localStorage.getItem("userId");

  const handleSearchData = () => {
  }

  const removeProductById = (productId) => {
    setUserData((prevUserData) =>
      prevUserData.filter((product) => product._id !== productId)
    );
  };

  function showProducts() {
    let url = `https://gvm-backend-assignment.onrender.com/api/product/getProducts/${userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    showProducts();
  }, []);

  return (
    <>
      <nav className="Tag_heading">
        <h1>Vendor</h1>
      </nav>

      <div className="vendorContainer">
        <div className="addProduct">
          <Link to="/product">
            <div className="btn">
              <PersonAddAltIcon />
              <Button text="Add Product" />
            </div>
          </Link>
        </div>

        <div className="allCards">
          <div className="heading_card">
            <div className="blank"></div>
            <h1>All Products</h1>
            <div className="search">
              <Input
                type="text"
                placeholder="Search Product ..."
                value={search}
                onChange={handleSearchData}
              />
              <SearchIcon />
            </div>
          </div>
          <div className="cards">
            {userData?.length !== 0 ? (
              userData?.map((items) => (
                <Card
                  key={items._id}
                  id={items._id}
                  name={items.productName}
                  company={items.compnayName}
                  price={items.price}
                  // photo={items.photo}
                  onDelete={removeProductById}
                />
              ))
            ) : (
              <div className="messageShow">
                <div className="center">
                  <h1>Data Not Found</h1>
                </div>
              </div>
            )}
            ;
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendor;
