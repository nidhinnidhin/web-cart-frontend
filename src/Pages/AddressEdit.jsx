import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { mobile } from "../Responsive";
import Anouncement from "../Components/Anouncement";
import toast, { Toaster } from "react-hot-toast";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0e1320;
  color: white;
`;
const FormContainer = styled.div`
  height: fit-content;
  width: 460px;
  border: 0.5px solid gray;
  border-radius: 10px;
  background-color: #0e1320;
  ${mobile({ width: "80%" })}
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
  ${mobile({ width: "90%" })}
`;
const Label = styled.label`
  font-size: 15px;
  margin: 8px 0px;
  font-weight: bold;
  ${mobile({ fontSize: "14px" })}
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
  border-radius: 5px;
  background-color: #a4d4f9;
  font-size: 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  ${mobile({ width: "99%" })}
`;

const AddressEdit = () => {
  const [fullName, setFullname] = useState("");
  const [addressLine1, setAddressline1] = useState("");
  const [addressLine2, setAddressline2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/address/addressdetail/`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data)
        // setFullname(res.data[0].fullName);
        // setAddressline1(res.data[0].addressLine1);
        // setAddressline2(res.data[0].addressLine2);
        // setCity(res.data[0].city);
        // setCountry(res.data[0].country);
        // setPincode(res.data[0].pincode);
        // setMobile(res.data[0].mobile);
      })
      .catch((err) => {
        console.log(err.response)
      })
  }, []);
  const datas = {
    fullname: fullName,
    addressline1: addressLine1,
    addressline2: addressLine2,
    city: city,
    country: country,
    pincode: pincode,
    mobile: mobile,
  };

  const addressEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/address/addressedit/`, datas, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast("Address Edited Successfully!!", {
          duration: 5000,
        });
        history.push("/");
        console.log("success")
      });
  };

  return (
    <React.Fragment>
      <Anouncement />
      <Toaster />
      <Navbar />
      <Container>
        <Toaster />
        <FormContainer>
          <TitleContainer>
            <Title>Edit Your Address</Title>
          </TitleContainer>
          <Form>
            <Label>Fullname</Label>
            <Input
              type="text"
              onChange={(e) => setFullname(e.target.value)}
              value={fullName}
            />
            <Label>Address line 1</Label>
            <Input
              type="text"
              onChange={(e) => setAddressline1(e.target.value)}
              value={addressLine1}
            />
            <Label>Address line 2</Label>
            <Input
              type="text"
              onChange={(e) => setAddressline2(e.target.value)}
              value={addressLine2}
            />
            <Label>City</Label>
            <Input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <Label>Country</Label>
            <Input
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
            <Label>Pincode</Label>
            <Input
              type="text"
              onChange={(e) => setPincode(e.target.value)}
              value={pincode}
            />
            <Label>Mobile no</Label>
            <Input
              type="text"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
            <InputBtn type="button" onClick={addressEdit}>
              Update
            </InputBtn>
          </Form>
        </FormContainer>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default AddressEdit;
