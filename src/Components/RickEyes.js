import {useMousePosition} from "../hooks";
import styled from "styled-components";
import Rick from '../assets/Rick.png';
import {Eye} from "./Eye";
import {useRef} from "react";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const RickEyes = () => {
  const ref = useRef();
  const {x, y} = useMousePosition();

  return (
    <Container ref={ref}>
      <Eye pX={85} pY={122} {...{x, y} } size={72} diffX={ref?.current?.getBoundingClientRect?.()?.x ?? 0}/>
      <Eye pX={30} pY={120} {...{x, y}} size={72} diffX={ref?.current?.getBoundingClientRect?.()?.x ?? 0}/>
      <img src={Rick} alt=""/>
    </Container>
  );
};

