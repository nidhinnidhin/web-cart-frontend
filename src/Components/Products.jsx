import React from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from 'axios';
import {useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { mobile } from "../Responsive";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const SearchContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e8b9e;
  ${mobile({height: "40px"})}
`;

const Search = styled.input`
  height: 30px;
  width: 30%;
  border: 0.5px solid gray;
  margin-left: 26px;
  border-radius: 5px;
  padding: 10px;
  ${mobile({height: "25px", width: "200px", marginLeft: "10px", padding: "10px"})}
`;

const SearchIconBox = styled.button`
  height: 30px;
  width: 60px;
  background-color: #dfc750;
  border: 0.4px solid gray;
  border-radius: 3px;
  cursor: pointer;
  ${mobile({height: "25px", width: "50px"})}
`;

const InnerContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {

  const [product, setProduct] = useState([])

  const [search, setSearch] = useState({
    searchValue: '',
    productList : [],
});

  useEffect(() => {
    axios.get('http://localhost:8000/api/product/')
    .then(res => {
      setProduct(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err.response)
    })
  }, [])

  const changeHandler = (e) => {
        setSearch({
            searchValue: e.target.value
          })
          var searchValue = e.target.value.replace(/\s+/g, '+')
          
          axios.get("http://127.0.0.1:8000/api/product/search/search/?search="+searchValue)
            .then((res) => {
              let allPosts = res.data;
              setProduct(allPosts);
              console.log(res.data);
            })
        console.log(searchValue);
          
          
    }
  return (
    <React.Fragment>
      <SearchContainer>
        <Search type="search" onChange={changeHandler} placeholder="Search"></Search>
        <SearchIconBox>
          <SearchIcon />
        </SearchIconBox>
      </SearchContainer>

      <Container>
          {product.map((item) => {
            return(
              <Product item = {item} key = {item.id}/>
            )
            })}
      </Container>
    </React.Fragment>
  )
}

export default Products