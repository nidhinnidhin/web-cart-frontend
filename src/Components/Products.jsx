import React from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { mobile } from "../Responsive";
import "./Style.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
  align-items:center;
  ${mobile({
    flexDirection: "column",
    display: "flex",
    flexWrap: "wrap",
    height: "200px",
  })}
`;
const Categories = styled.div`
  ${mobile({ margin: "0px 3px" })}
`;
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
  ${mobile({ margin: "5px 0px" })}
`;

const Pagination = styled.div`
    padding: 10px;
    margin: 15px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;
const Numbers = styled.div`
    padding: 20px 20px;
    cursor: pointer;
    &:hover{
      color: blue;
    }
`;
const Number = styled.div`
    padding: 15px 20px;
    border: none;
    cursor: pointer;
    background-color: #94e3f7;
`;

const Products = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1)

  const [search, setSearch] = useState({
    searchValue: "",
    productList: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product/")
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

  const yellowShoes = (catItem) => {
    const yellowShoe = product.filter((curData) => {
      return curData.category === catItem;
    });
    setProduct(yellowShoe);
  };

  const redShoes = (catItem) => {
    const redShoe = product.filter((curData) => {
      return curData.category === catItem;
    });
    setProduct(redShoe);
  };

  const allShoes = () => {
    axios
      .get("http://localhost:8000/api/product/")
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const selectPageHandler = (selectedPage) => {
    if(selectedPage >= 1 && selectedPage <= Math.ceil(product.length / 5) && selectedPage !== page)
    setPage(selectedPage)
  }

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
        <Categories>
          <FilterButton onClick={() => yellowShoes("yellow")}>
            Yellow Shoes
          </FilterButton>
        </Categories>
      </FilterCategories>

      <Container>
        {product ? (
          product.slice(page * 10 - 10, page * 10).map((item) => {
            return <Product item={item} key={item.id} />;
          })
        ) : (
          <h2>No product yet!</h2>
        )}
          <Pagination>
            <Number className={page > 1 ? "" : "pagination__disable"}    onClick={() => selectPageHandler(page-1)}><ArrowBackIosNewIcon/></Number>
            {[...Array(Math.ceil(product.length / 10))].map((_,i) => ( <Numbers className={page === i+1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i+1)} key={i}>{i + 1}</Numbers>
            ))}
            <Number onClick={() => selectPageHandler(page+1)}
              className={page < Math.ceil(product.length / 10) ? "" : "pagination__disable"}
            ><ArrowForwardIosIcon/></Number>
          </Pagination>
      </Container>
    </React.Fragment>
  );
};

export default Products;
