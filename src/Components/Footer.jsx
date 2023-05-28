import { Email, Facebook, Instagram, LocationOn, Phone, Twitter, WhatsApp } from "@material-ui/icons";
import styled from 'styled-components';
import { mobile } from "../Responsive";
import {tab} from "../Responsive"


const Container = styled.div`
    display: flex;
    background-color: #4f5152;
    color: white;
    ${mobile({height: "200px", width: "100%"})}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    ${mobile({flex: 2, padding: "10px", width: "130px"})}
`;
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({display: "none"})}
`;
const Title = styled.h3`
    margin-bottom: 30px;
    ${mobile({fontSize: "15px"})}
    ${tab({fontSize: "18px"})}
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    ${tab({fontSize: "12px"})}
`;
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({flex: 2,paddingTop:"10px", fontSize: "10px", marginTop:"5px"})}
    ${tab({fontSize: "12px"})}
`;
const Logo = styled.h1`
    ${mobile({fontSize:"15px"})}
    ${tab({fontSize: "20px"})}
`;
const Desc = styled.p`
    margin: 20px 0px;
    ${mobile({fontSize: "10px"})}
    ${tab({fontSize: "12px"})}
`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    ${mobile({marginRight: "5px"})}
`;
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;
const Payment = styled.img`
    height: 50px;
    width: 200px;
    ${mobile({display: "none"})}
`;

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>TRENDY SHOES</Logo>
                <Desc>
                Welcome to our shoe shop! We pride ourselves on offering a wide selection of footwear to meet your every need and style preference. Step inside and discover a world of shoes that combine comfort, quality, and fashion.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color="3e743e">
                        <WhatsApp/>
                    </SocialIcon>
                    <SocialIcon color="3c99be">
                        <Twitter/>
                    </SocialIcon>
                </SocialContainer>
        </Left>
        <Center>
            <Title>Useful links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Shoes</ListItem>
                <ListItem>Different styles</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Filter</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><LocationOn style={{marginRight : "10px"}} /> 622 Bangalure, Whitefield, Prashanth Layout, 560066</ContactItem>
            <ContactItem><Phone style={{marginRight : "10px"}}/>+91 6385 386 029</ContactItem>
            <ContactItem><Email style={{marginRight : "10px"}}/>nidhinbabu171@gmail.com</ContactItem>
            <Payment src = "https://www.horusrc.com/media/wysiwyg/pay_by_cards.jpg"/>
        </Right>
    </Container>
  )
}

export default Footer;