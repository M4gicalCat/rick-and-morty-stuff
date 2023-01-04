import {useMousePosition} from "../hooks";
import styled from "styled-components";
import Morty from '../assets/Morty.png';
import {Eye} from "./Eye";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const MortyEyes = () => {
  const {x, y} = useMousePosition();

  return (
    <Container>
        <Eye pX={112} pY={75} {...{x, y} } size={67}/>
        <Eye pX={55} pY={62} {...{x, y}} size={72}/>
        <img src={Morty} alt="" style={{transform: "rotate(20deg)"}}/>
    </Container>
  );
};

