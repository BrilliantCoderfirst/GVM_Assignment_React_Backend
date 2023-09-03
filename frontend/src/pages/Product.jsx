import React, { useEffect, useState } from "react";
import SideImage from "../assest/img/formImage.png";
import Input from "../components/Input";
import Button from "../components/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const param = useParams();
  const userId = localStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [productName, setProductName] = useState(data ? data.productName : "");
  const [productType, setProductType] = useState(data ? data.productType : "");
  const [price, setPrice] = useState(data ? data.price : "");
  const [compnayName, setCompnayName] = useState(data ? data.compnayName : "");
  const [photo, setPhoto] = useState([]);

  const addProductFun = async () => {
    const url = `https://gvm-backend-assignment.onrender.com/api/product/postProducts`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
        productName: productName,
        productType: productType,
        price: price,
        compnayName: compnayName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          navigate("/vendor");
          setProductName("");
          setProductType("");
          setPrice("");
          setCompnayName("");
        } else {
          alert("Your Product Is Not Added");
        }
      })
      .catch((err) => console.log(err));
  };

  const editProductFun = async (id) => {
    const url = `https://gvm-backend-assignment.onrender.com/api/product/editProducts/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
        productName: productName,
        productType: productType,
        price: price,
        compnayName: compnayName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          navigate("/vendor");
          setProductName("");
          setProductType("");
          setPrice("");
          setCompnayName("");
        } else {
          alert("Your Product Is Not Updated");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleProductDataFun = (id) => {
    if (
      productName === "" ||
      productType === "" ||
      price === "" ||
      compnayName === ""
    ) {
      alert("Please Enter Data");
    } else {
      if (!id) {
        addProductFun();
      } else {
        editProductFun(id);
      }
    }
  };

  const getParticularProductFun = async (id) => {
    let url = `https://gvm-backend-assignment.onrender.com/api/product/getParticularProducts/${id}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        const productData = jsonData.data;
        setData(productData);
        setProductName(productData.productName);
        setProductType(productData.productType);
        setPrice(productData.price);
        setCompnayName(productData.compnayName);
      } else {
        console.error("API request failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (param.id !== undefined) {
      getParticularProductFun(param.id);
    }
  }, [param.id]);

  return (
    <>
      <div className="formContainer">
        <div className="form">
          <div className="leftFormPart">
            {!param.id ? <h1>Add Product</h1> : <h1>Edit Product</h1>}
            <form action="">
              <div className="formInput">
                <AddBoxIcon />
                <Input
                  name="productname"
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e)}
                />
              </div>
              <div className="formInput">
                <CategoryIcon />
                <Input
                  name="producttype"
                  type="text"
                  placeholder="Product Type"
                  value={productType}
                  onChange={(e) => setProductType(e)}
                />
              </div>
              <div className="formInput">
                <AttachMoneyIcon />
                <Input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e)}
                />
              </div>
              <div className="formInput">
                <BusinessIcon />
                <Input
                  name="companyName"
                  type="text"
                  placeholder="Company Name"
                  value={compnayName}
                  onChange={(e) => setCompnayName(e)}
                />
              </div>
              <div className="formInput photoInput">
                {/* <Input
                  name="photo"
                  type="file"
                  onChange={(e) => console.log(e.target)}
                /> */}
              </div>
            </form>
            {!param.id ? (
              <div className="btn">
                <Button text="Add" onClick={() => handleProductDataFun()} />
              </div>
            ) : (
              <div className="btn">
                <Button
                  text="Edit"
                  onClick={() => handleProductDataFun(param.id)}
                />
              </div>
            )}
          </div>

          <div className="rightFormPart">
            <img src={SideImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
