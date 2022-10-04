import { render } from "@testing-library/react";
import InputComponent from "./InputComponent";

describe("InputComponent tests",()=>{

    describe('Layout', () => { 
        it('should have the label', () => {
          const { container }  = render(<InputComponent />)
          const label = container.querySelector("label")
          expect(label).toBeInTheDocument() //sirve para revisar si existe
        });

        it('should have the input', () => {
            const { container }  = render(<InputComponent />)
            const input = container.querySelector("input")
            expect(input).toBeInTheDocument()
          });
     })

    describe('Funcionality', () => { 

      it('should accept the type property', () => {
        const type = "email";
        const { container }  = render(<InputComponent type={type} />)
        const input = container.querySelector("input")
        expect(input.type).toBe(type) // compara el valor de la propiedad
      });

      it('should accept the labelText property', () => {
        const labelText = "Correo electrónico";
        const { container }  = render(<InputComponent labelText={labelText} />)
        const label = container.querySelector("label")
        expect(label.textContent).toBe(labelText)
      });

    })

})