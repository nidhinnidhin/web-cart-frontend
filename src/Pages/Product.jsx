import styled from "styled-components";
import Anouncement from "../Components/Anouncement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { mobile, tab } from "../Responsive";
import toast, { Toaster } from "react-hot-toast";
import { useStateValue } from "../stateProvider";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 30px;
  display: flex;
`;
const ImgContainer = styled.div`
  flex: 1;
  ${mobile({ flex: 2 })}
`;
const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: contain;
  ${mobile({ height: "23vh", marginTop: "20px" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 30px 30px;
  ${mobile({ padding: "20px", flex: 2 })}
  ${tab({ maginTop: "100px" })}
`;
const Title = styled.h1`
  font-weight: 200;
  ${mobile({ fontSize: "20px" })}
`;
const Desc = styled.p`
  margin: 20px 0px;
  ${mobile({ fontSize: "10px" })}
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  ${mobile({ fontSize: "20px" })}
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
  margin: 30px 0px;
`;
const Button = styled.button`
  padding: 10px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: black;
    color: white;
    border-radius: 5px;
  }
  &:active {
    transform: translateY(2px);
  }
  ${mobile({ height: "30px", width: "100px", fontSize: "10px" })}
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Starcontainer = styled.div`
  margin-bottom: 20px;
`;
const SecondImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: contain;
  margin-left: 90px;
  ${mobile({ height: "23vh", marginTop: "20px" })}
`;

const Product = () => {
  const [product, setProduct] = useState({});
  const [{ basket }, dispatch] = useStateValue();

  const params = useParams();

  const history = useHistory();

  useEffect(() => {
    axios.get(`http://3.24.139.91/api/product/${params.id}/`).then((res) => {
      setProduct(res.data);
    });
  }, []);

  const AddToCart = (id) => {
    axios
      .post(
        `http://3.24.139.91/cart/cart-product/`,
        {
          product: id,
          count: 1,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast(" product added to cart", {
          duration: 5000,
        });
        dispatch({
          type: "ADD_TO_BASKET",
          item: {
            product: product,
          },
        });
        console.log(product);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Container>
      <Toaster />
      <Anouncement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} />
          <SecondImage src={product.secondimage} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>{product.description}</Desc>
          <Price>${product.price}</Price>

          <AddContainer>
            <AmountContainer>
              <Button onClick={() => AddToCart(product.id, product.name)}>
                ADD TO CART
              </Button>
            </AmountContainer>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
