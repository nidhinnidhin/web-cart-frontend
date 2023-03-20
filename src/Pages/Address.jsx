import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import toast, { Toaster } from "react-hot-toast";


const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #110a23;
    color: white;
`;
const FormContainer = styled.div`
    height: 580px;
    width: 460px;
    border: 0.5px solid gray;
    border-radius: 10px;
    background-color: #0e1320;
`;
const Form = styled.form`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 20px;
`;
const Input = styled.input`
    height: 24px;
    width: 400px;
    border: none;
    border-radius: 5px;
    padding: 0px 10px;
`;
const Label = styled.label`
    font-size: 15px;
    margin: 8px 0px;
    font-weight: bold;
`;
const Title = styled.h3`
    font-size: 30px;
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;

const InputBtn = styled.button`
    margin-top: 20px;
    height: 35px;
    width: 419px;
    border-radius: 10px;
    background-color: #c8c4c4;
    font-size: 20px;
    border: none;
    cursor: pointer;
    font-weight: bold;
`;


const Address = () => {

    const [fullName, setFullname] = useState('')
    const [addressLine1, setAddressline1] = useState('')
    const [addressLine2, setAddressline2] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [pincode, setPincode] = useState('')
    const [mobile, setMobile] = useState('')


    const changeHandler = (e) => {
        e.preventDefault()
        if(e.target.name === "fullName"){
            setFullname(e.target.value)
            console.log(e.target.value);
        }
        else if (e.target.name === "addressLine1"){
            setAddressline1(e.target.value)
            console.log(e.target.value);
        }
        else if (e.target.name === "addressLine2"){
            setAddressline2(e.target.value)
            console.log(e.target.value);
        }
        else if (e.target.name === "city"){
            setCity(e.target.value)
            console.log(e.target.value);
        }
        else if (e.target.name === "country"){
            setCountry(e.target.value)
            console.log(e.target.value);
        }
        else if (e.target.name === "mobile"){
            setMobile(e.target.value)
            console.log(e.target.value);
        }
        else if (e.target.name === "pincode"){
            setPincode(e.target.value)
            console.log(e.target.value);
        }
    }
    
    let history = useHistory()

    const createAddress = (e) => {

        e.preventDefault()

        const data = {
            "fullName": fullName,
            "addressLine1": addressLine1,
            "addressLine2": addressLine2,
            "city": city,
            "country": country,
            "pincode": pincode,
            "mobile": mobile,
        }
        axios.post(`http://127.0.0.1:8000/address/address/`,data,
        {
            headers: {
                "Authorization": `Bearer ` + localStorage.getItem("access_token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then(res => {
            toast("Address created",{
                duration: 5000
            })
            history.push('/cart')
            console.log(res.data)
        })
        .catch(err =>{
            console.log(err.response);
        })
    }


    return(
        <React.Fragment>
            <Navbar/>
        <Container>
            <Toaster/>
            <FormContainer>
                <TitleContainer>
                    <Title>Create Address</Title>
                </TitleContainer>
                    <Form onSubmit={createAddress}>
                        <Label>
                            Fullname
                        </Label>
                            <Input type="text" name="fullName" onChange={changeHandler}/>
                        <Label>
                            Address line 1
                        </Label>
                            <Input type="text" name="addressLine1" onChange={changeHandler}/>
                        <Label>
                            Address line 2
                        </Label>
                            <Input type="text" name="addressLine2" onChange={changeHandler}/>
                        <Label>
                            City
                        </Label>
                            <Input type="text" name="city" onChange={changeHandler}/>
                        <Label>
                            Country
                        </Label>
                            <Input type="text" name="country" onChange={changeHandler}/>
                        <Label>
                            Pincode
                        </Label>
                            <Input type="text" name="pincode" onChange={changeHandler}/>
                        <Label>
                            Mobile no
                        </Label>
                            <Input type="text" name="mobile" onChange={changeHandler}/>
                        
                            <InputBtn type="submit">Create</InputBtn>
                    </Form>
            </FormContainer>
        </Container>
        <Footer/>

        </React.Fragment>
            
    )

}

export default Address;