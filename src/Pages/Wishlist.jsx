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
    font-size: 25px;
    font-weight: 100;
    margin-top: 20px;
    ${mobile({fontSize: "15px"})}
    ${tab({fontSize: "16px"})}
`;
const CheckoutList = styled.div`
    background-color: white;
`;

const DescriptionContainer = styled.div`
    margin-top:30px ;
    height:50px;
    overflow: hidden;
`;

const AmountContainer = styled.div`
    margin-top:10px ;
`;

const Description = styled.p`
    font-size: 13px;
    font-family: Arial;
    font-family: inherit;
`;
const Amount = styled.p`
    font-size: 13px;
    font-family: Arial;
    font-family: inherit;
`;

const ProductContainer = styled.div`
    height: 250px;
    width: 59%;
    margin-top: 15px;
    display: flex;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    background-color: #f3f8f9;
    ${mobile({height: "150px", width: "350px"})}
    ${tab({height: "150px", width: "350px"})}
`;

const EmptySpace = styled.div`
    height: 45vh;
    width: 100%;
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    object-fit: contain;
    height: 200px;
    width: 150px;
    margin: 0px 20px;
    ${mobile({height: "100px"})}
    ${tab({height: "100px"})}

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
const DeleteIcon = styled.div`
    color: red;
    display: flex;
    cursor: pointer;
    margin: 0px 30px;
`;
const ProductListingCOntainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
`;

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    const history = useHistory()

    useEffect(() => {
        axios.get(`http://13.236.44.131/wishlist/`,{
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
        axios.delete(`http://13.236.44.131/wishlist/wishlistdelete/${id}/`, 
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("access_token"),
                "Content-Type": 'application/json'
            }
        }).then((res) => {
            console.log("Deleted")
            console.log(res.data)
            axios.get(`http://13.236.44.131/wishlist/`,{
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
                    <Title>YOUR WISHLIST</Title>
                </TitleContainer>
            </CheckoutList>
            <ProductListingCOntainer>
                {
                    wishlist.map((item) => {
                    return(
                        <ProductContainer>
                            <ImageContainer>
                                <Image src={item.product.image} onClick={() => wishlistDetail(item.product.id)}/>
                            </ImageContainer>
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
                            <DeleteIcon onClick={() => deleteProduct(item.id)}>
                                <DeleteForeverIcon/>
                            </DeleteIcon>
                        </ProductContainer>
                        )
                    })
                }
            </ProductListingCOntainer>
            <EmptySpace>
            </EmptySpace>
            <Bottom>
                <Footer />
            </Bottom>
        </Container>
    )
}

export default Wishlist;
