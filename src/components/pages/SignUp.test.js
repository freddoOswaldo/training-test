import { render } from "@testing-library/react"
import SignUp from "./SignUp"

describe('Sign up page tests', () => {

    describe('Layout', () => {

        it ('should have a label for email', () => {
            const { queryByText } = render(<SignUp></SignUp>);           
            const labelEmail = queryByText("Correo electrónico");
            expect(labelEmail).toBeInTheDocument();
        })

        it ('should have an input for email', () => {
            const { container } = render(<SignUp></SignUp>);             
            const emailInput = container.querySelector('#email');
            expect(emailInput).toBeInTheDocument();
        })

        test ('should have a label for password', () => {
            const { queryByText } = render(<SignUp></SignUp>);            
            const labelPassword = queryByText("Contraseña");
            expect(labelPassword).toBeInTheDocument();
        })

        it ('should have an input for password', () => {
            const { container } = render(<SignUp></SignUp>);
            const passwordInput = container.querySelector('#password');
            expect(passwordInput).toBeInTheDocument();
        })

        it ('should have a button to send the form', () => {
            const { container } = render(<SignUp></SignUp>);
            const button = container.querySelector('#btn-register');
            expect(button).toBeInTheDocument();
        })

        it ('should have a button title for create account', () => {
            const { container } = render(<SignUp></SignUp>);            
            const title = container.querySelector("h3");
            expect(title.textContent).toBe("Crear Cuenta");
        })
    })

    describe('Functionality', () => {
                
    })

})