import React from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { mobile } from "../Responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e8b9e;
  ${mobile({ height: "40px" })}
`;

const Search = styled.input`
  height: 40px;
  width: 40%;
  border: 0.5px solid gray;
  margin-left: 26px;
  border-radius: 5px;
  padding: 15px;
  font-size: 16px;
  ${mobile({
    height: "25px",
    width: "200px",
    marginLeft: "10px",
    padding: "10px",
  })}
`;

const SearchIconBox = styled.button`
  height: 40px;
  width: 60px;
  background-color: #dfc750;
  border: 0.4px solid gray;
  border-radius: 3px;
  cursor: pointer;
  ${mobile({ height: "25px", width: "50px" })}
`;

const InnerContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FilterCategories = styled.div`
  margin: 30px;
  display: flex;
  justify-content: space-around;
`;
const Categories = styled.div``;
const FilterButton = styled.button`
  height: 45px;
  width: 150px;
  border-radius: 20px;
  cursor: pointer;
  background-color: white;
  border: 2px solid teal;
  font-weight: 700;
  &:hover {
    background-color: black;
    color: white;
    border-radius: 20px;
  }
  &:active {
    transform: translateY(2px);
  }
`;

const Products = () => {
  const [product, setProduct] = useState([]);

  const [search, setSearch] = useState({
    searchValue: "",
    productList: [],
  });

  useEffect(() => {
    axios
      .get("http://3.24.139.91/api/product/")
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const changeHandler = (e) => {
    setSearch({
      searchValue: e.target.value,
    });
    var searchValue = e.target.value.replace(/\s+/g, "+");

    axios
      .get(
        "http://127.0.0.1:8000/api/product/search/search/?search=" + searchValue
      )
      .then((res) => {
        let allPosts = res.data;
        setProduct(allPosts);
        console.log(res.data);
      });
    console.log(searchValue);
  };

  const whiteShoes = (catItem) => {
    const whiteShoe = product.filter((curData) => {
      return curData.category === catItem;
    });
    setProduct(whiteShoe);
  };

  const blackShoes = (catItem) => {
    const blackShoe = product.filter((curData) => {
      return curData.category === catItem;
    });
    setProduct(blackShoe);
  };

  const blueShoes = (catItem) => {
    const blueShoe = product.filter((curData) => {
      return curData.category === catItem;
    });
    setProduct(blueShoe);
  };

  const redShoes = (catItem) => {
    const redShoe = product.filter((curData) => {
      return curData.category === catItem;
    });
    setProduct(redShoe);
  };

  const allShoes = () => {
    axios
      .get("http://3.24.139.91/api/product/")
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <React.Fragment>
      <SearchContainer>
        <Search
          type="search"
          onChange={changeHandler}
          placeholder="Search"
        ></Search>
        <SearchIconBox>
          <SearchIcon />
        </SearchIconBox>
      </SearchContainer>
      <FilterCategories>
        <Categories>
          <FilterButton onClick={() => allShoes()}>All Shoes</FilterButton>
        </Categories>
        <Categories>
          <FilterButton onClick={() => whiteShoes("white")}>
            White Shoes
          </FilterButton>
        </Categories>
        <Categories>
          <FilterButton onClick={() => blackShoes("black")}>
            Black Shoes
          </FilterButton>
        </Categories>
        <Categories>
          <FilterButton onClick={() => blueShoes("blue")}>
            Blue Shoes
          </FilterButton>
        </Categories>
        <Categories>
          <FilterButton onClick={() => redShoes("red")}>Red Shoes</FilterButton>
        </Categories>
      </FilterCategories>

      <Container>
        {
          product ?
          product.map((item) => {
            return <Product item={item} key={item.id} />
          })
          :
          <h2>No product yet!</h2>
        }
      </Container>
    </React.Fragment>
  );
};

export default Products;
