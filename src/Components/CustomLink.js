import styled from "styled-components";
import {Link} from "react-router-dom";

export const CustomLink = styled(Link)`
  text-decoration: underline;
  color: ${({theme}) => theme.color.title};
  &:hover {
    color: ${({theme}) => theme.color.hover};
  }
  display: inline;
`;