import { ArrowLeftOutlined, ArrowRightOutlined} from "@material-ui/icons"
import styled from "styled-components";
import { SliderItems } from "../Data";
import {useState, useEffect} from "react";
import axios from "axios";
import { mobile } from "../Responsive";
import { tab } from "../Responsive";


const Container = styled.div`
    width: 100%;
    height: 70vh;
    position: relative;
    display: flex;
    overflow: hidden;
    ${mobile({height: "55vh"})}
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #f1e9e9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;

    left : ${props=> props.direction === "left" && "10px"};
    right : ${props=> props.direction === "right" && "10px"};
    ${mobile({height: "30px", width: "30px"})}
`;

const Wraper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100 }vw);
`;

const Slide = styled.div`
    display: flex;
    align-items: center;
    width:100vw;
    height: 80vh;
    background-color: #232f3e;
`;
const ImgContainer = styled.div`
    height: 100%;
    width :50%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;
const Image = styled.img`
    height: 100vh;
    width:100%;
    border-radius: 5px;
    object-fit: contain;
    background-color: #232f3e;
    ${mobile({height: "140px",width: "100px", marginTop: "-280px", marginLeft: "50px"})}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
    color: white;
`;

const Title = styled.h1`
    font-size: 60px;
    ${mobile({fontSize: "30px", marginTop: "-180px"})}
`;
const Desc = styled.p`
    margin: 30px 0px;
    font-size: 20px;
    font-weight: 100;
    letter-spacing: 2px;
    ${mobile({fontSize: "10px"})}
`;

const Slider = () => {

    const [slider, setSlider] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/slider/`)
        .then(res => {
            setSlider(res.data)
        })
    },[])

    const[slideIndex,setSlideIndex] = useState(0);
    const handleClick=(direction) => {
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex -1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex +1 : 0)
        }
    }

  return (
    <Container>
        <Arrow direction = "left" onClick={() => handleClick("left")}>
            <ArrowLeftOutlined/>
        </Arrow>
        <Wraper slideIndex = {slideIndex}>
            {slider.map((item) => (
            <Slide>
                <ImgContainer>
                <Image src={item.image}/>
                </ImgContainer>
                {/* <InfoContainer>
                    <Title>{item.name}</Title>
                    <Desc>{item.description}</Desc>
                </InfoContainer> */}
            </Slide>
            ))}
        </Wraper>
        <Arrow direction = "right" onClick={() => handleClick("right")}>
            <ArrowRightOutlined/>
        </Arrow>
    </Container>
  )
}

export default Slider
