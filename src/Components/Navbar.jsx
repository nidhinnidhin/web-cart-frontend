import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import { Badge } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Home } from '@material-ui/icons';
import { mobile } from '../Responsive';
import { tab } from '../Responsive';
import profile from '../img/user.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../img/logo.png';

const Container = styled.div`
    height: 60px;
    background-color: #c2bfbf;
    color: white;
    ${mobile({height: "50px"})}
`;

const Wraper = styled.div`
    padding: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding: "0px 0px"})}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;


const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    background-color: white;
    border-radius:5px;
`;
    
const Input = styled.input`
    
    border-color: white;
    border: 0;
    
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: "20px", marginRight: "35px"})}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    font-size:14px ;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "8px", marginLeft : "10px"})}
`;


const HomeIcon = styled.div`
    font-size: 40px;
    cursor: pointer;
    ${mobile({height: "50px"})}
`;

const LogoImg = styled.img`
    height:40px;
    width:100px;
    object-fit: contain;
    ${mobile({height: "28px", width: "28px", marginLeft: "10px"})}
`;
const Image = styled.img`
    height:35px;
    width:100px;
    cursor: pointer;    
    object-fit: contain;
    ${mobile({height: "28px", width: "28px"})}
`;

const User = styled.div`
    
`;

const Basket = styled.div`
    margin-right: 5px;
`;

const Navbar = () => {

    const [open, setOpen] = useState(false);
 
    const history = useHistory()

    const submit = () =>{

        axios.post("http://localhost:8000/api/account/logout/blacklist/",{
            refresh_token: localStorage.getItem('refresh_token'),
        })
        .then(res=>{
            localStorage.removeItem("access_token",res.data.access)
            localStorage.removeItem("refresh_token",res.data.refresh)
            history.push('/login')
        })
    }

    const profile = () => {
        history.push("/profile")
    }

    const accountEdit = () => {
        history.push("/accountedit")
    }

    
  return (
    <Container>
        <Wraper>
            <Left>
                <HomeIcon>
                    <LogoImg onClick={() => {history.push('/')}} src ={logo}/>
                </HomeIcon>
            </Left>
            <Center><Logo>TRENDY</Logo></Center>
            <Right>
                {/* <MenuItem onClick = { () => {
                    history.push('/register')
                }}>REGISTER</MenuItem> */}

                <MenuItem onClick = { () => {
                    history.push('/login')
                }}>LOGIN</MenuItem>
                <MenuItem onClick={submit}>LOGOUT</MenuItem>
                <MenuItem>

                <Basket>

                <Badge badgeContent={0} color="primary">
                    <ShoppingCartOutlined onClick = { () => {
                        history.push('/cart')
                    }} color="action" />
                </Badge>

                </Basket>

                </MenuItem>
                <User>
                    <Image onClick={accountEdit} src = "https://static.thenounproject.com/png/4035889-200.png" />
                </User>
            </Right>
        </Wraper>
    </Container>
  )
}

export default Navbar;
