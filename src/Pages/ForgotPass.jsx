import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { mobile } from "../Responsive";
import { tab } from "../Responsive";
import { useHistory } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:#0e1320;
    `;

const Wrapper = styled.div`
    padding: 20px;
    width: 25%;
    height: object-fit;
    background-color: #0f111b;
    border:1px solid gray;
    border-radius:5px;
    color: white;
    ${mobile({width:"80%"})}
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight:300;
    ${mobile({fontSize:"15px"})}
`;
const Form = styled.form`
    display:flex;
    flex-direction:column ;
    align-items: center;
    justify-content: center;
`;
const Input = styled.input`
    flex: 1;
    min-width:90% ;
    font-family: "Convergence", sans-serif;
    font-family: inherit;
    font-size: inherit;
    margin:20px 10px 0px 0px;
    padding:10px ;
    border-radius: 5px;
`;
const Button = styled.button`
    width:40% ;
    border:none ;
    padding: 15px 20px;
    background-color:teal ;
    color:white ;
    cursor: pointer;
    margin:15px 90px ;
    border-radius: 3px;
    &:active{
        transform: translateY(2px);
    }
    ${mobile({marginLeft: "70px"})}
    ${tab({marginLeft: "70px"})}
`;


const ForgotPass = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const [step, setStep] = useState(1)

    const history = useHistory()

    const submitForm = (e) => {
        e.preventDefault()

    }
    const resetPassword = () => {
        axios.post(`http://3.24.232.247/api/account/reset-password/`,
        {
            "otp":otp,
            "email":email,
            "password1":password,
            "password2":confirmpassword,
        })
        .then((res) => {
            history.push("/login")
        })
        .catch((err) => {
            console.log(err);
            alert("Error occured");
        })
    }

    const generateOtp = () => {
        axios.post(`http://3.24.232.247/api/account/generate-otp/`, 
        {
            "email": email,
        })
        .then((res) => {
            setStep(2)
        })
        .catch((err) => {
            console.log(err);
            alert("Error occured");
        })
    }
 

  return (
        <Container>
            <Wrapper>
            <Title>FORGOT PASSWORD</Title>
            {step===1
            ?
                <Form onSubmit={submitForm}>

                    <Input placeholder = "Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Button type="button" onClick={generateOtp}>Submit</Button>
                </Form>
            :
                <Form onSubmit={submitForm}>

                    <Input placeholder = "OTP" value={otp} onChange={(e) => setOtp(e.target.value)}/>
                    <Input placeholder = "Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Input placeholder = "Confirm password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}/>
                    <Button type="button" onClick={resetPassword}>Submit</Button>
                </Form>
            }
            </Wrapper>
        </Container>
  )
}

export default ForgotPass;