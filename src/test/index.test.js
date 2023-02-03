import {fireEvent, render, screen} from "@testing-library/react";
import {ThemeProvider} from "styled-components";
import {Register} from "../Components/Register";
import {themes} from "../themes";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import '@testing-library/jest-dom';

describe('AUTH', () => {
  it("Doesn't do anything when having a bad email", async () => {
    render(
      <ThemeProvider theme={themes.light}>
        <RouterProvider router={createBrowserRouter([{path: '*', element: <Register newUser/>, errorElement: <></>}])} />
      </ThemeProvider>
    );
    const b = screen.getByRole('button', {
      name: "Créer un compte",
    });
    const email = screen.getByPlaceholderText("Email");
    const pwd = screen.getByPlaceholderText("Mot de passe");
    fireEvent.input(email, {target: {value: 'not a valid email'}});
    fireEvent.input(pwd, {target: {value: 'Azertyuiop123456789'}});
    fireEvent.click(b);
    expect(await screen.findByText(/Une erreur est survenue/i)).toBeInTheDocument();
  });
  it("Doesn't do anything when having a password less than 8 characters long", async () => {
    render(
      <ThemeProvider theme={themes.light}>
        <RouterProvider router={createBrowserRouter([{path: '*', element: <Register newUser/>, errorElement: <></>}])} />
      </ThemeProvider>
    );
    const b = screen.getByRole('button', {
      name: "Créer un compte",
    });
    const email = screen.getByPlaceholderText("Email");
    const pwd = screen.getByPlaceholderText("Mot de passe");
    fireEvent.input(email, {target: {value: 'xyz@example.com'}});
    fireEvent.input(pwd, {target: {value: '1234567'}});
    fireEvent.click(b);
    expect(await screen.findByText(/Une erreur est survenue/i)).toBeInTheDocument();
  });
  it("Logs in with valid email/password", async () => {
    render(
      <ThemeProvider theme={themes.light}>
        <RouterProvider router={createBrowserRouter([{path: '*', element: <Register/>, errorElement: <></>}])} />
      </ThemeProvider>
    );
    const b = screen.getByRole('button', {
      name: "Se connecter",
    });

    const email = screen.getByPlaceholderText("Email");
    const pwd = screen.getByPlaceholderText("Mot de passe");
    fireEvent.input(email, {target: {value: 'test@test.com'}});
    fireEvent.input(pwd, {target: {value: 'Testtest'}});
    fireEvent.click(b);
    let erreur = false;
    try {
      await screen.findByText(/Une erreur est survenue/i);
    } catch (e) {
      erreur = true;
    }
    expect(erreur).toBe(true);
  });
});