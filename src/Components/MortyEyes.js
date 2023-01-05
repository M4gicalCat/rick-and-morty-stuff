import {useMousePosition} from "../hooks";
import styled from "styled-components";
import Morty from '../assets/Morty.png';
import {Eye} from "./Eye";
import {useRef} from "react";

const Container = styled.div`
  position: fixed;
  top: 30px;
  left: 0;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const MortyEyes = () => {
  const ref = useRef();
  const {x, y} = useMousePosition();

  return (
    <Container ref={ref}>
        <Eye pX={112} pY={75} {...{x, y} } size={67} diffY={ref?.current?.getBoundingClientRect?.()?.y ?? 0}/>
        <Eye pX={55} pY={62} {...{x, y}} size={72} diffY={ref?.current?.getBoundingClientRect?.()?.y ?? 0}/>
        <img src={Morty} alt="" style={{transform: "rotate(20deg)"}}/>
    </Container>
  );
};

