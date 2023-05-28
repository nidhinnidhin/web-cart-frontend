import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Anouncement from "../Components/Anouncement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { mobile } from "../Responsive";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { tab } from "../Responsive";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";

// const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ paddingRight: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-top: 30px;
  text-decoration: underline;
  ${mobile({ fontSize: "18px" })}
  ${tab({ fontSize: "18px" })}
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", flexWrap: "wrap", height: "150px" })}
`;
const TopButton = styled.button`
  padding: 10px;
  cursor: pointer;
  font-weight: 600;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({
    fontSize: "10px",
    height: "40px",
    width: "130px",
    marginTop: "5px",
    borderRadius: "10px",
  })}
`;

const TopTexts = styled.div`
  margin-left: -60px;
`;
const TopText = styled.span`
  text-decoration: underline;
  margin: 0px 10px;
  margin-left: 20px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  ${mobile({ flexDirection: "column" })}
  ${tab({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "5px", height: "50px", overFlow: "hidden" })}
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  padding: 10px;
  object-fit: contain;
  ${mobile({ height: "70px", width: "70px" })}

  &:hover {
    transform: scale(1.09);
  }
`;
const ProductColor = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: 20px 0px;
  background-color: ${(props) => props.color};
`;
const ProductId = styled.span`
  margin: 10px 0px;
`;
const ProductDetail = styled.span`
  flex: 2;
  display: flex;
`;
const ProductName = styled.span`
  margin: 5px 0px;
  ${mobile({ fontSize: "12px", marginLeft: "20px", marginTop: "20px" })}
`;
const ProductSize = styled.span`
  flex: 1;
  margin: 5px 0px;
  ${mobile({ flex: 2 })}
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ProductDes = styled.div`
  font-size: 13px;
  ${mobile({ display: "none" })}
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ height: "0px", fontSize: "15px" })}
`;
const ProductAmount = styled.h4`
  font-size: 24px;
  margin: 5px;
  ${mobile({ fontSize: "15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ fontSize: "15px" })}
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: "#f8f8f8";
  margin: 10px 0px;
  ${mobile({
    height: "100px",
    width: "100%",
    marginTop: "10px",
    backgroundColor: "#f8f8f8",
  })}
`;

const SummaryTitle = styled.h1`
  font-weight: 300;
  font-size: 25px;
  ${mobile({ fontSize: "20px" })}
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
  font-size: ${(props) => props.type === "total" && "23px"};
  ${mobile({ fontSize: "15px" })}
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const ImageContainer = styled.div`
  height: 220px;
  width: 220px;
  ${mobile({ height: "80px", width: "80px" })}
`;

const Button = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  padding: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  ${mobile({ fontSize: "14px", height: "35px", width: "200px" })}
  ${tab({ fontSize: "14px", height: "35px", width: "200px" })}
`;
const RemoveIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RemoveButton = styled.button`
  height: 30px;
  width: 70px;
  background-color: black;
  color: white;
  margin-right: 20px;
  cursor: pointer;
  ${mobile({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#d6d1d1",
    color: "black",
  })}/* ${tab({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#d6d1d1",
    color: "black",
  })} */
`;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const params = useParams();
  const history = useHistory();
  const [stripeToken, setStripeToken] = useState(null);
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState("");
  const [showStripe, setShowStripe] = useState(false);
  let cartTotalPrice = 0;
  let quantity = 0;

  const stripePromise = loadStripe(
    "pk_test_51LVzIiSHbelfXOXs2UwOPxn0UZuulmI2mtyUOnivfXahojRw7F5PsI6ngrI7eXke5oJ5yOSRpDPv8gQECEGfl4Jb00Ujnj9dD1"
  );

  useEffect(() => {
    axios
      .get(`http://localhost:8000/cart/`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCart(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
      setCheckoutLoading(true);
      if (!stripe || !elements) {
        console.log("Loading");
        return;
      }

      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        // confirmParams: {
        //   return_url:
        //     "http://localhost:3000/pilot_dashboard/activities/images",
        // },
        redirect: "if_required",
      });
      if (result.error) {
        console.log(result);
        alert("Payment failed.");
        setShowStripe(false);
      } else {
        console.log(result);
        alert("Payment success.");

        axios
          .get(`http://localhost:8000/checkout/cart-checkout/`, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("access_token"),
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            history.push("/checkout");
            console.log("Success");
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div style={{ textAlign: "right" }}>
          <button
            disabled={!stripe}
            className="formBtn5"
            style={{
              display: "inline-block",
              margin: "5px",
              height: "40px",
              width: "300px",
              backgroundColor: "#dcdcef",
              marginTop: "10px",
              border: "0.5px solid black",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    );
  };

  const cartCountDecrement = (id, count, index) => {
    axios
      .post(
        `http://localhost:8000/cart/cart-product-decrement/`,
        {
          product: id,
          count: count - 1,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // window.location.reload()
        let temp_cart = cart;
        temp_cart[index].count = temp_cart[index].count - 1;
        setCart([...temp_cart]);
        console.log(res.data);
      });
  };

  const cartCountIncrement = (id, count, index) => {
    axios
      .post(
        `http://localhost:8000/cart/cart-product/`,
        {
          product: id,
          count: count + 1,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // window.location.reload()
        let temp_cart = cart;
        temp_cart[index].count = temp_cart[index].count + 1;
        setCart([...temp_cart]);
      });
  };

  const cartDetail = (id) => {
    history.push(`/product/${id}`);
  };

  const cartDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8000/cart/cartDelete/${id}/`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("deleted");
        console.log(res.data);
        axios
          .get(`http://localhost:8000/cart/`, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("access_token"),
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setCart(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reDirect = () => {
    history.push("/");
  };

  const orders = () => {
    history.push("/checkout");
  };

  const wishlist = () => {
    history.push("/wishlist");
  };

  const createAddress = () => {
    history.push("/address");
  };
  const checkoutAllPrdoducts = () => {
    axios
      .get("http://localhost:8000/checkout/test-checkout/", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSecret(res.data.client_secret);
        setShowStripe(true);
      });
  };
  const editAddress = () => {
    history.push("/addressedit");
  };

  return (
    <Container>
      <Anouncement />
      <Navbar />
      <Wrapper>
        <Top>
          <TopButton onClick={reDirect}>CONTINUE SHOPING</TopButton>

          <TopButton onClick={orders} type="filled">
            YOUR ORDERS
          </TopButton>
          <TopButton onClick={editAddress} type="filled">
            EDIT ADDRESS
          </TopButton>
          <TopButton onClick={wishlist} type="filled">
            WISHLIST
          </TopButton>
          <TopButton type="filled" onClick={createAddress}>
            CREATE YOUR ADDRESS
          </TopButton>
        </Top>
        <Title>ADDED ITEMS</Title>
        <Bottom>
          <Info>
            {cart.map((item, index) => {
              cartTotalPrice += item.count * item.product.price;
              quantity += item.count;
              return (
                <Product>
                  <ProductDetail>
                    <ImageContainer>
                      <Image
                        src={item.product.image}
                        onClick={() => cartDetail(item.product.id)}
                      />
                    </ImageContainer>
                    <Details>
                      <ProductName>
                        <b>Product : </b>
                        {item.product.name}
                      </ProductName>
                      <ProductDes>{item.product.description}</ProductDes>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove
                        onClick={() => {
                          if (item.count > 1) {
                            cartCountDecrement(
                              item.product.id,
                              item.count,
                              index
                            );
                          } else {
                            console.log("number is below 1");
                          }
                        }}
                      />
                      <ProductAmount>{item.count}</ProductAmount>
                      <Add
                        onClick={() =>
                          cartCountIncrement(item.product.id, item.count, index)
                        }
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {item.count * item.product.price}
                    </ProductPrice>
                  </PriceDetail>
                  <RemoveIcon>
                    <RemoveButton onClick={() => cartDelete(item.id)}>
                      <DeleteForeverIcon />
                    </RemoveButton>
                  </RemoveIcon>
                </Product>
              );
            })}
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Total items</SummaryItemText>
              <SummaryItemPrice>{cart.length}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cartTotalPrice}</SummaryItemPrice>
            </SummaryItem>
            {showStripe ? (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret: secret }}
              >
                <CheckoutForm />
              </Elements>
            ) : (
              <Button onClick={checkoutAllPrdoducts}>CHECKOUT NOW</Button>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
