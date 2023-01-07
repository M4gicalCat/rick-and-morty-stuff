import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {Button} from "./Button";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/init";
import {Title} from "./Title";
import {ActionButton} from "./ActionButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import {CustomLink} from "./CustomLink";
import {Link, redirect} from "react-router-dom";
import {Spinner} from "./Spinner";
import {ErrorMessage} from "./ErrorMessage";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: max-content;
  width: max-content;
  border: ${({theme}) => `1px solid ${theme.color.border}`};
  border-radius: 5px;
  padding: 1rem;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  
  & input {
    padding: 0.5rem;
    border: ${({theme}) => `1px solid ${theme.color.border}`};
    border-radius: 5px;
    margin: 0.5rem 0;
    width: 20rem;
    background-color: ${({theme}) => theme.color.card.background};
    outline: none;
    color: ${({theme}) => theme.color.text};
    transition-duration: .25s;
    &::placeholder {
      color: ${({theme}) => theme.color.dark};
    }
    &:focus {
      border: ${({theme}) => `1px solid ${theme.color.hover}`};
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({theme}) => theme.color.title};
  width: 1rem;
`;

const Action = styled(ActionButton)`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding-right: .5rem;
  &:focus {
    & ${Icon} {
      border: none;
      outline: 1px solid ${({theme}) => theme.color.hover};
      outline-offset: 2px;
      border-radius: 5px;
    }
  }
`;

export const Register = ({newUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState("");
  const link = useRef();

  useEffect(() => {
    if (auth.currentUser?.uid) {
      redirect("/");
      // redirect doesn't work for some reason
      link.current?.click();
    }
  }, [auth.currentUser?.uid, link.current]);

  useEffect(() => {
    // pressing enter would show the password, which is not what we want
    document.onkeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        register();
      }
    };
    return () => {
      document.onkeydown = null;
    }
  }, []);

  const register = () => {
    if (loading) return;
    setError("");
    setLoading(true);
    const f = newUser ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
    (async () => {
      try {
        await f(auth, email, password);
        redirect("/");
      } catch (e) {
        setError(e.code);
        console.error(e);
      }
      setLoading(false);
    })();
  };

  return (
    <Container onSubmit={e => e.preventDefault()}>
      <Title fullWidth border style={{paddingBottom: "1rem"}}>{newUser ? "Créer un compte" : "Se connecter"}</Title>
      <ErrorMessage code={error}/>
      <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label style={{position: "relative"}}>
        <input autoComplete={"password"} placeholder="Mot de passe" type={reveal ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
        <Action onClick={() => setReveal(o => !o)}>
          <Icon icon={reveal ? faEyeSlash : faEye}/>
        </Action>
      </label>
      <CustomLink style={{fontSize: ".8rem"}} to={newUser ? "/auth/login" : "/auth/"}>{newUser ? "Se connecter" : "Créer un compte"}</CustomLink>
      <Button onClick={register}>{loading ? <Spinner /> : (newUser ? "Créer un compte" : "Se connecter")}</Button>
      {auth.currentUser?.uid && <Link ref={link} to={"/"} style={{visibility: "hidden"}}>Home</Link>}
    </Container>
  );
};