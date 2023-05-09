import { ShoppingCartOutlined } from "@material-ui/icons";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { useState } from "react";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 250px;
    height: 350px;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    border-radius: 10px;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`;
const Image = styled.img`
    height: 60%;
    width: 200px;
    object-fit: contain;

    &:hover {
        transform: scale(1.09);
    }
`;

const Price = styled.h4`
    margin-top:5px;
`;

const Innercontainer = styled.div`
    margin-top: 6px;
    margin: 10px 20px;
`;

const Des = styled.h6`
    font-size: 12px;
`;

const DesContainer = styled.div`
    height: 55px;
    overflow: hidden;
`;

const WishlistContainer = styled.div`
    padding-top: 0px;
    margin-top: -25px;
`;
    
const WishlistBtn = styled.button`
    height: 30px;
    width: 110px;
    font-size: 10px;
    cursor: pointer;
    background-color: white;
    border: 2px solid teal;
    font-weight: 700;
    &:hover{
        background-color: black;
        color:white;
        border-radius: 5px;
    }
    &:active{
        transform: translateY(2px);
    }
`; 


const Name = styled.h4`
    
`;

const Discount = styled.h6`
    text-decoration: line-through;
`;

const Product = ({item}) => {

    const history = useHistory()

    const productDetail = (id) => {
        history.push(`/product/${id}`)
    }

    const toggleBtn = (id) => {
        axios.post(`http://13.236.44.131/wishlist/wishlistlisting/`,{
            'product':id
        },
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("access_token"),
                "Content-Type": 'application/json'
            }
        }).
        then((res) => {
            toast(" product added to wishlist",{
                duration: 5000
            })
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }


  return (
    <Container>
        <Toaster/>
        <Image onClick={() => productDetail(item.id)} src = {item.image}/>
        <Innercontainer>
            <Name>{item.name}</Name>
            <Price>${item.price}</Price>
            <Discount>${item.discount}</Discount>
        <DesContainer>
            <Des>{item.description}</Des>
        </DesContainer>
        </Innercontainer>
        <WishlistContainer onClick={() => toggleBtn(item.id)}>
            <WishlistBtn>ADD TO WISHLIST</WishlistBtn>
        </WishlistContainer>   
    </Container>
  )
}

export default Product