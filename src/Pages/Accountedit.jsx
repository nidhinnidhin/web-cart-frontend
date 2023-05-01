import React from 'react';
import styled from "styled-components";
import {mobile} from "../Responsive";
import {tab} from "../Responsive";
import {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #0e1320;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    border: 1px solid gray;
    border-radius:5px;
    background-color:#0f111b;
    ${mobile({width: "300px", padding: "10px"})}
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight:300 ;
    color: white;
    ${mobile({fontSize: "20px", marginLeft: "40px"})}
`;
const Form = styled.form`
    display:flex ;
    flex-direction:column ;
`;

const Input = styled.input`
    flex: 1;
    font-family: "Convergence", sans-serif;
    font-family: inherit;
    font-size: inherit;
    min-width:30% ;
    margin:20px 20px 0px 0px;
    padding:10px ;
    border-radius: 5px;
    ${mobile({width: "270px"})}
`;

const ButtonContainer = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const Button = styled.button`
    width:40% ;
    border:none ;
    padding: 15px 20px;
    background-color:teal ;
    color:white ;
    border-radius: 3px;
    cursor: pointer;
    /* margin:15px 155px ; */
    font-size: 17px;

    &:active{
        transform: translateY(2px);
    }

    ${mobile({height: "50px", width: "150px", fontSize:"13px"})}
    ${tab({fontSize:"13px"})}
`;

const Accountedit = () => {

    const [firstName, setFirstName ] = useState('')
    const [lastName, setLastName ] = useState('')
    const [userName, setUserName ] = useState('')
    const [email, setEmail ] = useState('')

    const datas = {
        "firstname":firstName,
        "lastname":lastName,
        "username":userName,
        "email":email
    }

    let history = useHistory();

    useEffect(() => {

        axios.get(`http://3.24.139.91/api/account/accountdetail/`,
        {
            headers:{   
                "Authorization":`Bearer `+localStorage.getItem("access_token"),
                "Content-Type":'application/json'
            }
        })
        .then((res) => {
            setFirstName(res.data.firstname)
            setLastName(res.data.lastname)
            setUserName(res.data.username)
            setEmail(res.data.email)
            console.log(res.data);
        })
    }, [])

    const accountEdit = (e) => {
        e.preventDefault()

        axios.put(`http://3.24.139.91/api/account/accountedit/`,datas, 
        {
            headers:{
                "Authorization":`Bearer `+localStorage.getItem("access_token"),
                "Content-Type":'application/json'
            }
        })
        .then((res) => {
            toast("Edited Successfully!!",{
                duration: 5000
            })
            history.push('/')
        })
    }


    
    return(
    <Container>
        <Toaster/>
        <Wrapper>
            <Title>EDIT YOUR ACCOUNT</Title>
            <Form>
                <Input 
                    type="text"  
                    name="firstname"
                    placeholder = "first name"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
                <Input 
                    type="text"
                    name="lastname" 
                    placeholder = "last name"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
                <Input 
                    type="text" 
                    name="username"
                    placeholder = "username"
                    id = "userName"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                />
                <Input 
                    type="text"  
                    name="email"
                    placeholder = "email" 
                    id="emailId"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <ButtonContainer>
                    <Button type="button" onClick={accountEdit}>update changes</Button>   
                </ButtonContainer>
                
            </Form>
        </Wrapper>
    </Container>
    )
}

export default Accountedit;