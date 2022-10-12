import { fireEvent, render } from "@testing-library/react";
import ButtonComponent from "./ButtonComponent";

describe('Button component test', () => {
    
    describe('Layout', () => {

        it('should have the button', () => {
            const { container } = render(<ButtonComponent  />);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        });


        it('should have the spinner', () => {
            const { getByText } = render(<ButtonComponent isLoading={true}  />);
            getByText('Cargando ...');
        });

        
        
    });
    

    describe('Funcionality', () => {
        
        test('receive the id by parameter', () => {
            const { container } = render(<ButtonComponent id="btn" />);
            
            const { id } = container.querySelector('button');

            expect(id).toBe('btn')
        });


        test('receive the label by parameter', () => {
            const { getByText } = render(<ButtonComponent label="Test" />);
            getByText('Test');
        });


        test('receive the color by parameter', () => {
            const { container } = render(<ButtonComponent color="danger" />);
            const { classList } = container.querySelector("button");
            expect(classList).toContain("btn-danger")
        });


        test('receive the isLoading by parameter', () => {
            const { getByText } = render(<ButtonComponent isLoading={true}  />);
            getByText('Cargando ...');
        });

        test('receive the type by parameter', () => {
            const { container } = render(<ButtonComponent type="submit" />);
            const { type } = container.querySelector("button");
            expect(type).toBe("submit")
        });

        test('receive the onClick function by parameter', () => {
            const handleclick = jest.fn();
            const { container } = render(<ButtonComponent onClick={handleclick} />);
            const button = container.querySelector("button");
            fireEvent.click(button)
            expect(handleclick).toHaveBeenCalledTimes(1);
        });

        test('the type is button for default', () => {
            const { container } = render(<ButtonComponent  />);
            const { type } = container.querySelector("button");
            expect(type).toBe("button")
        });


        test('the color is primary for default', () => {
            const { container } = render(<ButtonComponent  />);
            const { classList } = container.querySelector("button");
            expect(classList).toContain("btn-primary")
        });


        test('the isLoading is false for default', () => {
            const { queryByText } = render(<ButtonComponent  />);
            const  spinner = queryByText('Cargando ...');
            expect(spinner).not.toBeInTheDocument();
        });


    });
    

});
