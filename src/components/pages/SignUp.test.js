import {
    fireEvent,
    render,
    waitFor,
} from "@testing-library/react";
import SignUp from "./SignUp";
import * as router from "react-router"


const mockNavigate = jest.fn()

beforeAll(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate)
})

describe("Sign up page tests", () => {
    describe("Layout", () => {
        it("should have a label for email", () => {
            const { getByText } = render(<SignUp />);
            getByText("Correo electrónico");
        });

        it("should have an input for email", () => {
            const { container } = render(<SignUp />);
            const emailInput = container.querySelector("#email");
            expect(emailInput).toBeInTheDocument();
        });

        test("should have a label for password", () => {
            const { getByText } = render(<SignUp />);
            getByText("Contraseña");
        });

        it("should have an input for password", () => {
            const { container } = render(<SignUp />);
            const passwordInput = container.querySelector("#password");
            expect(passwordInput).toBeInTheDocument();
        });

        it("should have a button to send the form", () => {
            const { container } = render(<SignUp />);
            const button = container.querySelector("#btn-register");
            expect(button).toBeInTheDocument();
        });

        it("should have a button title for create account", () => {
            const { container } = render(<SignUp />);
            const title = container.querySelector("h3");
            expect(title.textContent).toBe("Crear Cuenta");
        });
    });

    describe("Functionality", () => {
        const changeEvent = (value) => {
            return {
                target: {
                    value: value,
                },
            };
        };

        let emailInput, passwordInput, signUpButton;

        const setUpForSubmit = (
            emailVal = "test@gmail.com",
            passwordVal = "P@ssword",
            signUpFuntion
        ) => {
            const rendered = render(

                <SignUp signUp={signUpFuntion} />);
            const { container } = rendered;
            emailInput = container.querySelector("#email");
            fireEvent.change(emailInput, changeEvent(emailVal));
            passwordInput = container.querySelector("#password");
            fireEvent.change(passwordInput, changeEvent(passwordVal));
            signUpButton = container.querySelector("#btn-register");
            return rendered;
        };


        test("the email input should have state value", () => {
            const { container } = render(<SignUp />);
            const value = "oswayon@gmail.com";
            const emailInput = container.querySelector("#email");
            fireEvent.change(emailInput, changeEvent(value));
            expect(emailInput).toHaveValue(value); //compara el value del input
        });

        test("the password input should have state value", () => {
            const { container } = render(<SignUp />);
            const value = "1234567";
            const emailInput = container.querySelector("#password");
            fireEvent.change(emailInput, changeEvent(value));
            expect(emailInput).toHaveValue(value); //compara el value del input
        });

        test("when the signup button is clicked and the email is invalid, it should show the validation error", () => {
            const { getByText } = setUpForSubmit("dss");
            fireEvent.submit(signUpButton);
            const messageError = "El correo electrónico no es válido";
            getByText(messageError);
        });

        test("when the signup button is clicked and the password is invalid, it should show the validation error", () => {
            const { getByText } = setUpForSubmit("test@gmil.com", "343");
            fireEvent.submit(signUpButton);
            const messageError = "La contraseña debe tener de 6 a 30 caracteres";
            getByText(messageError);
        });

        test("when the signup button is clicked, should clean the errors", () => {
            const signUpFunction = jest.fn().mockResolvedValue({});

            const { queryByText } = setUpForSubmit(
                "test@gmil.com",
                "343",
                signUpFunction
            );
            fireEvent.click(signUpButton);

            fireEvent.change(passwordInput, changeEvent("123456"));

            fireEvent.click(signUpButton);

            const messageError = "La contraseña debe tener de 6 a 30 caracteres";
            const error = queryByText(messageError);
            expect(error).not.toBeInTheDocument();
        });

        test("when the signup button is clicked and the fields are valid, should call the signup function", () => {
            const signUpFunction = jest.fn().mockResolvedValue({});

            setUpForSubmit("test@gmil.com", "123456", signUpFunction);

            fireEvent.click(signUpButton);

            expect(signUpFunction).toHaveBeenCalledTimes(1);
        });

        test("when the signup button is clicked and the fields are valid, should call the signup function with the same data", () => {
            const signUpFunction = jest.fn().mockResolvedValue({});

            setUpForSubmit("test@gmil.com", "123456", signUpFunction);

            fireEvent.click(signUpButton);

            expect(signUpFunction).toHaveBeenCalledWith("test@gmil.com", "123456");
        });

        test("when the signup button is clicked and the email is valid but password is invalid, shouldn't call the signUp function", () => {
            const signUpFunction = jest.fn().mockResolvedValue({});

            setUpForSubmit("test@gmil.com", "", signUpFunction);

            fireEvent.click(signUpButton);

            expect(signUpFunction).toHaveBeenCalledTimes(0);
        });

        test("when the backend return a error, should show on the screen", async () => {
            const signUpFunction = jest.fn().mockRejectedValue({
                message: "Validation error",
            });

            const { findByText } = setUpForSubmit(
                "test@gmil.com",
                "1234556",
                signUpFunction
            );

            fireEvent.click(signUpButton);

            await findByText("Validation error"); // testear si se renderizo un elemento de forma asincrona
        });

        test("when there is an error message from the backend and a request is sent again, the error should disappear", async () => {
            const signUpFunction = jest.fn().mockRejectedValueOnce({
                message: "Validation error",
            });

            const { findByText, queryByText } = setUpForSubmit(
                "test@gmil.com",
                "1234556",
                signUpFunction
            );

            fireEvent.click(signUpButton);
            await findByText("Validation error");
            fireEvent.click(signUpButton);

            await waitFor(() => {
                expect(queryByText("Validation error")).not.toBeInTheDocument();
            });
        });


        test("when is sending request, should show the loading", async () => {
            const signUpFunction = jest.fn().mockImplementation(() => new Promise((resolve, _) => {
                setTimeout(() => {
                    resolve({});
                }, 300);
            }));

            const { findByText } = setUpForSubmit(
                "test@gmil.com",
                "1234556",
                signUpFunction
            );
            fireEvent.click(signUpButton);
            await findByText("Cargando ...");
        });

        test("when the backend return a error, shouldn't show the loading", async () => {
            const signUpFunction = jest.fn().mockRejectedValue({
                message: "Validation error"
            });

            const { queryByText } = setUpForSubmit(
                "test@gmil.com",
                "1234556",
                signUpFunction
            );
            fireEvent.click(signUpButton);
            await waitFor(() => {
                expect(queryByText("Cargando ...")).not.toBeInTheDocument();
            });
        });

        test("when the user registers, should redirect to /user", async () => {
            const signUpFunction = jest.fn().mockResolvedValue({
               
            });

            setUpForSubmit(
                "test@gmil.com",
                "1234556",
                signUpFunction
            );
            fireEvent.click(signUpButton);
            await waitFor(() => {
                 expect(mockNavigate).toHaveBeenCalledWith("/user");
            });
        });
    });
});
