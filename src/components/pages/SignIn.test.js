import {
    fireEvent,
    render,
    waitFor,
} from "@testing-library/react";
import SignIn from "./SignIn";
import * as router from "react-router"


const mockNavigate = jest.fn()

beforeAll(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate)
})

describe("Sign in page tests", () => {
    describe("Layout", () => {
        it("should have a label for email", () => {
            const { getByText } = render(<SignIn />);
            getByText("Correo electrónico");
        });

        it("should have an input for email", () => {
            const { container } = render(<SignIn />);
            const emailInput = container.querySelector("#email");
            expect(emailInput).toBeInTheDocument();
        });

        test("should have a label for password", () => {
            const { getByText } = render(<SignIn />);
            getByText("Contraseña");
        });

        it("should have an input for password", () => {
            const { container } = render(<SignIn />);
            const passwordInput = container.querySelector("#password");
            expect(passwordInput).toBeInTheDocument();
        });

        it("should have a button to send the form", () => {
            const { container } = render(<SignIn />);
            const button = container.querySelector("#btn-register");
            expect(button).toBeInTheDocument();
        });

        it("should have a button title for create account", () => {
            const { container } = render(<SignIn />);
            const title = container.querySelector("h3");
            expect(title.textContent).toBe("Iniciar Sesión");
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

        let emailInput, passwordInput, signInButton;

        const setUpForSubmit = (
            emailVal = "test@gmail.com",
            passwordVal = "P@ssword",
            signInFuntion
        ) => {
            const rendered = render(

                <SignIn signIn={signInFuntion} />);
            const { container } = rendered;
            emailInput = container.querySelector("#email");
            fireEvent.change(emailInput, changeEvent(emailVal));
            passwordInput = container.querySelector("#password");
            fireEvent.change(passwordInput, changeEvent(passwordVal));
            signInButton = container.querySelector("#btn-register");
            return rendered;
        };


        test("the email input should have state value", () => {
            const { container } = render(<SignIn />);
            const value = "oswayon@gmail.com";
            const emailInput = container.querySelector("#email");
            fireEvent.change(emailInput, changeEvent(value));
            expect(emailInput).toHaveValue(value); //compara el value del input
        });

        test("the password input should have state value", () => {
            const { container } = render(<SignIn />);
            const value = "1234567";
            const emailInput = container.querySelector("#password");
            fireEvent.change(emailInput, changeEvent(value));
            expect(emailInput).toHaveValue(value); //compara el value del input
        });

        test("when the signin button is clicked and the email is invalid, it should show the validation error", () => {
            const { getByText } = setUpForSubmit("dss");
            fireEvent.submit(signInButton);
            const messageError = "El correo electrónico no es válido";
            getByText(messageError);
        });

        test("when the signin button is clicked and the password is invalid, it should show the validation error", () => {
            const { getByText } = setUpForSubmit("test@gmil.com", "343");
            fireEvent.submit(signInButton);
            const messageError = "La contraseña debe tener de 6 a 30 caracteres";
            getByText(messageError);
        });

        test("when the signin button is clicked, should clean the errors", () => {
            const signInFunction = jest.fn().mockResolvedValue({});

            const { queryByText } = setUpForSubmit(
                "test@gmil.com",
                "343",
                signInFunction
            );
            fireEvent.click(signInButton);

            fireEvent.change(passwordInput, changeEvent("123456"));

            fireEvent.click(signInButton);

            const messageError = "La contraseña debe tener de 6 a 30 caracteres";
            const error = queryByText(messageError);
            expect(error).not.toBeInTheDocument();
        });

        test("when the signin button is clicked and the fields are valid, should call the signin function", () => {
            const signInFunction = jest.fn().mockResolvedValue({});

            setUpForSubmit("test@gmil.com", "123456", signInFunction);

            fireEvent.click(signInButton);

            expect(signInFunction).toHaveBeenCalledTimes(1);
        });

        test("when the signin button is clicked and the fields are valid, should call the signin function with the same data", () => {
            const signInFunction = jest.fn().mockResolvedValue({});

            setUpForSubmit("test@gmil.com", "123456", signInFunction);

            fireEvent.click(signInButton);

            expect(signInFunction).toHaveBeenCalledWith("test@gmil.com", "123456");
        });

        test("when the signin button is clicked and the email is valid but password is invalid, shouldn't call the signIn function", () => {
            const signInFunction = jest.fn().mockResolvedValue({});

            setUpForSubmit("test@gmil.com", "", signInFunction);

            fireEvent.click(signInButton);

            expect(signInFunction).toHaveBeenCalledTimes(0);
        });

        test("when the backend return a error, should show on the screen", async () => {
            const signInFunction = jest.fn().mockRejectedValue({
                message: "Validation error",
            });

            const { findByText } = setUpForSubmit(
                "test@gmil.com",
                "1234556",
                signInFunction
            );

            fireEvent.click(signInButton);

            await findByText("Validation error"); // testear si se renderizo un elemento de forma asincrona
        });

        test("when there is an error message from the backend and a request is sent again, the error should disappear", async () => {
            const signInFunction = jest.fn().mockRejectedValueOnce({
                message: "Validation error",
            });

            const { findByText, queryByText } = setUpForSubmit(
                "test@gmil.com",
                "1234556",
                signInFunction
            );

            fireEvent.click(signInButton);
            await findByText("Validation error");
            fireEvent.click(signInButton);

            await waitFor(() => {
                expect(queryByText("Validation error")).not.toBeInTheDocument();
            });
        });


        test("when is sending request, should show the loading", async () => {
            const signInFunction = jest.fn().mockImplementation(() => new Promise((resolve, _) => {
                setTimeout(() => {
                    resolve({});
                }, 300);
            }));

            const { findByText } = setUpForSubmit(
                "test@gmil.com",
                "1234556",
                signInFunction
            );
            fireEvent.click(signInButton);
            await findByText("Cargando ...");
        });

        test("when the backend return a error, shouldn't show the loading", async () => {
            const signInFunction = jest.fn().mockRejectedValue({
                message: "Validation error"
            });

            const { queryByText } = setUpForSubmit(
                "test@gmil.com",
                "1234556",
                signInFunction
            );
            fireEvent.click(signInButton);
            await waitFor(() => {
                expect(queryByText("Cargando ...")).not.toBeInTheDocument();
            });
        });

        test("when the user registers, should redirect to /user", async () => {
            const signInFunction = jest.fn().mockResolvedValue({
               
            });

            setUpForSubmit(
                "test@gmil.com",
                "1234556",
                signInFunction
            );
            fireEvent.click(signInButton);
            await waitFor(() => {
                 expect(mockNavigate).toHaveBeenCalledWith("/user");
            });
        });
    });
});
