import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import { mobile } from "../Responsive";
import { tab } from "../Responsive";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
    width: 50%;
    height: 300px;
    background-color: #0f111b;
    border:1px solid gray;
    border-radius:5px;
    color: white;
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight:300 ;
`;
const Form = styled.form`
    display:flex ;
    flex-direction:column ;
`;
const Input = styled.input`
    flex: 1;
    min-width:30% ;
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
    border-radius: 3px;
    &:active{
        transform: translateY(2px);
    }
`;


const Link = styled.a`
font-size:9px ;
margin:5px 0px ;
text-decoration:underline ;
    cursor: pointer;
`;
const LinkForgotPassword = styled.a`
    font-size:9px ;
    margin-top:15px ;
    text-decoration:underline ;
    cursor: pointer;
    `;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;

const EyeIcon = styled.button`
    height: 40px;
    width: 50px;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;
const EyeIconContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: -30px;
`;


const Login = () => {

    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const [showPassword,setshowPassword] = useState(false)

    const history = useHistory();

    const submit =()=>{
        if(!loading){
        const data = {
            "username":username,
            "password":password
        }
        console.log("hello")
        axios.post("http://127.0.0.1:8000/api/login/",data)
        .then(res=>{
            console.log(res.data)
            localStorage.setItem("access_token",res.data.access)
            localStorage.setItem("refresh_token",res.data.refresh)
            history.push("/")
        })
        .catch(err=>{
            console.log(err.response)
        })
        }
    }

    const reDirect = () => {
        history.push("/register")
    }

    const ForgotPass = () => {
        history.push("/forgotPass")
    }

    // const toggleBtn = () => {
    //     setshowPassword(prevState => !prevState)
    // } 

    const validateForm = (e) => {
        e.preventDefault()
        if(username === null || username == ""){
            document.getElementById("username").style.display = "block";
        }else{
            document.getElementById("username").style.display = "none";
        }

        if(password === null || password == ""){
            document.getElementById("password").style.display = "block";
        }else{
            document.getElementById("password").style.display = "none";
        }
    }

  return (
        <Container>
            <Wrapper>
            <Title>SIGN IN</Title>
            <Form onSubmit={validateForm}>
                <Input 
                onChange={(e)=>setUsername(e.target.value)} 
                value={username} 
                placeholder = "Username" 
                />
                <p id="username" style={{color:"red", display:"none", fontSize:"15px"}}>Username is required</p>

                <Input
                    onChange={(e)=>setPassword(e.target.value)} 
                    type="password"
                    // type= {showPassword ? "text" : "password"} 
                    value={password} 
                    placeholder = "password" 
                />
                {/* <EyeIconContainer>
                    <EyeIcon onClick={toggleBtn}>
                        {
                            showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
                        }
                    </EyeIcon>
                </EyeIconContainer> */}


                <p id="password" style={{color:"red", display:"none", fontSize:"15px"}}>Password is required</p>

                <ButtonContainer>
                    <Button onClick={submit} type="submit" >{loading?"Logingin ...":"Login"}</Button>
                </ButtonContainer>
                <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                <Link onClick={reDirect}>CREATE A NEW ACCOUNT</Link>
                <LinkForgotPassword onClick={ForgotPass}>FORGOT PASSWORD</LinkForgotPassword>
                </Form>
            </Wrapper>
        </Container>
  )
}

export default Login
