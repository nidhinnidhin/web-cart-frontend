import styled from "styled-components";
import {useState} from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import {mobile} from "../Responsive";
import {tab} from "../Responsive"
import toast,{ Toaster } from "react-hot-toast";


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
    height: 500px;
    border: 1px solid gray;
    border-radius:5px;
    background-color:#0f111b;
    ${mobile({width: "300px"})}
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
const Agreement = styled.span`
    font-size:12px ;
    margin:20px 0px ;
    color: white;
    ${mobile({fontSize: "10px"})}
`;

const ButtonContainer = styled.div`
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
    margin:0px 155px ;

    &:active{
        transform: translateY(2px);
    }
`;

const Register = () => {
    
    const [firstname,setName] = useState('')
    const [lastname,setLastname] = useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmPassword] = useState('')
    const [loading,setLoading] = useState(false)
    
    const history = useHistory()

    const submit=()=>{
        if (!loading){

            setLoading(true)
            console.log("Clicked")
            const datas = {
                "firstname":firstname,
                "lastname":lastname,
                "username":username,
                "email":email,
                "password":password,
                "confirmpassword":confirmpassword,
            }
            axios.post("http://127.0.0.1:8000/api/account/register/",datas, {
                headers:{
                    "Content-Type":'application/json'
                }
            })
            .then(res=>{
                setLoading(false)
                console.log("hello world");
                const data = {
                    "username":username,
                    "password":password
                }
                axios.post("http://127.0.0.1:8000/api/login/",data)
                .then(res=>{
                    console.log(res.data)
                    localStorage.setItem("access_token",res.data.access)
                    localStorage.setItem("refresh_token",res.data.refresh)
                    history.push('/')
                    toast("Sccessfully created your account",{
                        duration: 5000
                    })
                })
                .catch(err=>{
                    console.log(err.response)
                })
                console.log(res.data) 
            })
            .catch(err=>{
                setLoading(false)
                console.log(err.response)
            })
        }
    }


    const validateForm = (e) => {
        e.preventDefault()
        let error = false
        if(firstname === null || firstname == ""){
            document.getElementById("Firstname").style.display = "block";
            error = true
        }else{
            document.getElementById("Firstname").style.display = "none";
        }

        if(lastname === null || lastname == ""){
            document.getElementById("Lastname").style.display = "block";
            error = true
        }else{
            document.getElementById("Lastname").style.display = "none";
        }

        if(username === null || username == ""){
            document.getElementById("Username").style.display = "block";
            error = true
        }else{
            document.getElementById("Username").style.display = "none";
        }

        if(email === null || email == ""){
            document.getElementById("Email").style.display = "block";
            error = true
        }else{
            document.getElementById("Email").style.display = "none";
        }

        if(password === null || password == ""){
            document.getElementById("Password").style.display = "block";
            error = true
        }else if(password.length >= 10){
            document.getElementById("less").style.display = "block";
            error = true
        }else{
            document.getElementById("Password").style.display = "none";
        }

        if(confirmpassword === null || confirmpassword == ""){
            document.getElementById("Confirmpassword").style.display = "block";
            error = true
        }else if(password !== confirmpassword){
            document.getElementById("match").style.display = "block";
            error = true
        }else{
            document.getElementById("Confirmpassword").style.display = "none";
        }
        if(!error){
            submit()
        }
    }
    
  return (
    <Container>
        <Toaster />
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form onSubmit={validateForm}>
                <Input 
                    onChange={(e)=>setName(e.target.value)}  
                    value={firstname}
                    type="text"  
                    name="first_name"
                    placeholder = "first name"
                    id="firstName"
                />
                <p id="Firstname" style={{color:"red",display:"none"}}>Firstname is required</p>
                <Input 
                    onChange={(e)=>setLastname(e.target.value)} 
                    value={lastname} 
                    type="text"
                    name="last_name" 
                    placeholder = "last name"
                    id="lastName"
                />
                <p id="Lastname" style={{color:"red",display:"none"}}>Lastname is required</p>
                <Input 
                    onChange={(e)=>setUsername(e.target.value)}  
                    value={username} 
                    type="text" 
                    name="user_name"
                    placeholder = "username"
                    id="userName"
                />
                <p id="Username" style={{color:"red",display:"none"}}>Username is required</p>
                <Input 
                    onChange={(e)=>setEmail(e.target.value)} 
                    type="text"  
                    value={email} 
                    name="em_ail"
                    placeholder = "email" 
                    id="emailAd"
                />
                <p id="Email" style={{color:"red",display:"none"}}>Email is required</p>
                <Input 
                    onChange={(e)=>setPassword(e.target.value)} 
                    value={password} 
                    placeholder = "password" 
                    type= "password"
                    name="pass_word"
                    id="passWord"
                    
                    />
                <p id="Password" style={{color:"red",display:"none"}}>Password is required</p>
                <p id="less" style={{color:"red",display:"none"}}>Password should less than 10 charecters</p>
                <Input 
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    value={confirmpassword} 
                    placeholder = "confirm password" 
                    type= "password"
                    name="confirm_password"
                    id="confirmPassword"
                />
                
                <p id="Confirmpassword" style={{color:"red",display:"none"}}>Confirmpassword is required</p>
                <p id="match" style={{color:"red",display:"none"}}>Password should match!</p>
                <Agreement>
                    By creating an acount, i concent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <ButtonContainer>
                    <Button type="button" onClick={validateForm}>{loading?"Creating ...":"Create"}</Button>
                </ButtonContainer>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register;