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
            <Logo>SHOPIFY</Logo>
                <Desc>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque modi fugit aliquid! Exercitationem sequi magnam doloremque neque quia ad, voluptates sed sapiente porro nisi rem possimus, fugiat molestias quas adipisci.
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
                <ListItem>Man Fashion</ListItem>
                <ListItem>Women Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><LocationOn style={{marginRight : "10px"}} /> 622 Dixie Path, South Tobinchester 98336</ContactItem>
            <ContactItem><Phone style={{marginRight : "10px"}}/>+1 489 323 233</ContactItem>
            <ContactItem><Email style={{marginRight : "10px"}}/>contact@shopify.dev</ContactItem>
            <Payment src = "https://www.horusrc.com/media/wysiwyg/pay_by_cards.jpg"/>
        </Right>
    </Container>
  )
}

export default Footer;