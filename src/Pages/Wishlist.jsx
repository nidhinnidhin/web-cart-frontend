import axios from "axios";
import React from "react";
import {useEffect, useState} from 'react';
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Anouncement from '../Components/Anouncement';
import { mobile, tab } from "../Responsive";
import { useHistory } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Container = styled.div`
`;
const Header = styled.div`
    
`;
const Bottom = styled.div`
    
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

`;
const Title = styled.h1`
    font-size: 28px;
    text-decoration: underline;
    font-weight: 100;
    margin-top: 20px;
    ${mobile({fontSize: "15px",fontWeight:"100", marginTop: "25px"})}
`;
const CheckoutList = styled.div`
    background-color: white;
`;

const DescriptionContainer = styled.div`
    height:40px;
    overflow: hidden;
`;

const AmountContainer = styled.div`
`;

const Description = styled.p`
    font-size: 13px;
`;
const Amount = styled.p`
    font-size: 13px;
`;

const ProductContainer = styled.div`
    height: 250px;
    width: 80%;
    margin-top: 15px;
    display: flex;
    border-radius: 5px;
    align-items: center;
    background-color: #f8f8f8;
    ${mobile({height: "120px", width: "95%"})}
    ${tab({height: "150px", width: "350px"})}
`;

const EmptySpace = styled.div`
    height: 45vh;
    width: 100%;
`;

const ImageContainer = styled.div`
    
`;

const Image = styled.img`
    object-fit: contain;
    height: 200px;
    width: 150px;
    margin: 0px 20px;
    ${mobile({height: "100px", margin:"0px"})}

    &:hover {
        transform: scale(1.09);
    }
`;


const TitleNameContainer = styled.div`
    
`;
const TitleName = styled.span` 
    font-size: 15px;
`;
const AddressContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const ProductListingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Right = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const RemoveButton = styled.button`
  height: 50px;
  width: 50px;
  background-color: black;
  color: red;
  border-radius: 50%;
  margin-right: 20px;
  cursor: pointer;
  ${mobile({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    color: "red",
  })}
`;

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    const history = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:8000/wishlist/`,{
            headers:{
                "Authorization":`Bearer `+localStorage.getItem("access_token"),
                "Content-Type":'application/json'
            }
        }).
        then((res) => {
            setWishlist(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err.response)
        })
    }, [])

    const wishlistDetail = (id) => {
        history.push(`/product/${id}`)
    }

    const deleteProduct = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8000/wishlist/wishlistdelete/${id}/`, 
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("access_token"),
                "Content-Type": 'application/json'
            }
        }).then((res) => {
            console.log("Deleted")
            console.log(res.data)
            axios.get(`http://localhost:8000/wishlist/`,{
            headers:{
                "Authorization":`Bearer `+localStorage.getItem("access_token"),
                "Content-Type":'application/json'
            }
            }).
            then((res) => {
                setWishlist(res.data)
                console.log(res.data)
            })
        })
    }

    return(
        <Container>
            <Anouncement/>
            <Header>
                <Navbar />
            </Header>
            <CheckoutList>
                <TitleContainer>
                    {
                        wishlist.length > 0 ?
                        <Title>YOUR WISHLIST</Title>
                        :
                        <Title>YOUR WISHLIST IS EMPTY</Title>
                    }
                </TitleContainer>
            </CheckoutList>
            <ProductListingContainer>
                {
                    wishlist.map((item) => {
                    return(
                        <ProductContainer>
                            <ImageContainer>
                                <Image src={item.product.image} onClick={() => wishlistDetail(item.product.id)}/>
                            </ImageContainer>
                            <Right>
                            <AddressContainer>
                                <TitleNameContainer>
                                    <TitleName>{item.product.name}</TitleName>
                                </TitleNameContainer>
                                <DescriptionContainer>
                                    <Description>{item.product.description}</Description>
                                </DescriptionContainer>
                                <AmountContainer>
                                    <Amount>${item.product.price}</Amount>
                                </AmountContainer>
                            </AddressContainer>
                            <RemoveButton onClick={() => deleteProduct(item.id)}>
                                <DeleteForeverIcon/>
                            </RemoveButton>
                            </Right>
                        </ProductContainer>
                        )
                    })
                }

            </ProductListingContainer>
            <EmptySpace>
            </EmptySpace>
            <Bottom>
                <Footer />
            </Bottom>
        </Container>
    )
}

export default Wishlist;
