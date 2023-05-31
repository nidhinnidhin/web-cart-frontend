import styled from "styled-components";
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { mobile } from "../Responsive"

const Container = styled.div`
    height: 30px;
    background-color: black;
    color: #faf8f8;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    ${mobile({fontSize: "11px"})}
`;
const AnnouncementContainer = styled.div`
`;

const Anouncement = () => {

  const [announcement, setAnnouncement] = useState([])

  useEffect(() => {
    axios.get(`http://3.24.232.247/announcement/`)
    .then((res)=>{
      setAnnouncement(res.data)
    })
    .catch(err=>{
      console.log(err.response);
  })
  },[])

  return (
    <Container>
      {announcement.map((item) => {
          return(
            <AnnouncementContainer key={item.id}>
              {item.announcement}
            </AnnouncementContainer>
          )
        })
      }
    </Container>
  )
}

export default Anouncement;
