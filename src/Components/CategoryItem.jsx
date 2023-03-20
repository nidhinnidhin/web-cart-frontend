import styled from "styled-components"


const Container = styled.div`
    flex: 1;
    margin: 3;
    height: 65vh;
    position: relative;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
`;
const Title = styled.h1`
    color: white;
    font-size: 30px;
    margin: 15px;
`;
const Button = styled.button`
    border: none;
    padding: 8px;
    background-color: #8b6b6b;
    border-radius: 3px;
    font-weight: 700;
    color: #1d0303;
    cursor: pointer;
`;
const Info = styled.div`
    position: absolute;
    top:0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const CategoryItem = ({item}) => {
  return (
    <Container>
        <Image src = {item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>Shop now</Button>
        </Info>
    </Container>
  )
}

export default CategoryItem