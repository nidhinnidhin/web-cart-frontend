import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Anouncement from '../Components/Anouncement';
import { mobile, tab } from "../Responsive";
import { useHistory } from "react-router-dom";

const Container = styled.div`
    width: 100%;
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
const ProductContainer = styled.div`
    height: 250px;
    width: 84%;
    margin-top: 15px;
    display: flex;
    align-items: center;
    background-color: #f3f8f9;
    margin-left: 120px;
    ${mobile({height: "150px", width: "96%", marginLeft: "13px", backgroundColor: "white"})}
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
    margin-left: 50px;
    ${mobile({height: "100px", marginLeft: "10px"})}

    &:hover {
        transform: scale(1.09);
    }
`;

const DeliveryStatusContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const DeliveryStatus = styled.h5`
    font-size: 18px;
    color: green;
    margin-left: 20px;
    margin-top: 50px;
    ${mobile({fontSize: "15px"})}
`;

const TitleNameContainer = styled.div`
    
`;
const TitleName = styled.span`
    margin-left: 20px;
    font-size: 15px;
`;
const AddressContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Checkout = () => {

    const [checkoutList, setCheckoutList] = useState([])
    const [cartCheckout, setCartCheckout] = useState([])

    const history = useHistory()

    useEffect(() => {
        axios.get(`http://3.24.139.91/checkout/checkout-carts/`, {
            headers:{
                "Authorization":`Bearer `+localStorage.getItem("access_token"),
                "Content-Type":'application/json'
            }
        }).then((res) => {
            setCartCheckout(res.data)
            console.log(res.data);
            console.log("hello");
        })
    },[])

    useEffect(() => {
        axios.get(`http://3.24.139.91/checkout/checkout-list/`, {
            headers:{
                "Authorization":`Bearer `+localStorage.getItem("access_token"),
                "Content-Type":'application/json'
            }
        }).then((res) => {
            setCheckoutList(res.data)
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const checkoutDetail = (id) => {
        history.push(`/product/${id}`)
    }

    

    return(
        <Container>
            <Anouncement/>
            <Header>
                <Navbar />
            </Header>
            <CheckoutList>
                <TitleContainer>
                    <Title>YOUR CHECKOUT LIST</Title>
                </TitleContainer>
            </CheckoutList>
            {
                checkoutList.map((item) => {
                    return(
                        <ProductContainer>
                        <ImageContainer>
                            <Image src={item.product.image} onClick = {() => checkoutDetail(item.product.id)}/>
                        </ImageContainer>
                        <AddressContainer>
                            <TitleNameContainer>
                            <TitleName>{item.product.name}</TitleName>
                            </TitleNameContainer>
                        <DeliveryStatusContainer>
                            <DeliveryStatus>{item.delivery_status}</DeliveryStatus>
                        </DeliveryStatusContainer>
                        </AddressContainer>
                        </ProductContainer>
                    )
                })
            }
            <EmptySpace>
            </EmptySpace>
            
            <Bottom>
                <Footer />
            </Bottom>
        </Container>
    )
}

export default Checkout;