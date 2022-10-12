import { fireEvent, prettyDOM, render } from "@testing-library/react";
import InputComponent from "./InputComponent";

describe("InputComponent tests", () => {
  describe("Layout", () => {
    it("should have the label", () => {
      const { container } = render(<InputComponent />);
      const label = container.querySelector("label");
      expect(label).toBeInTheDocument(); //sirve para revisar si existe
    });

    it("should have the input", () => {
      const { container } = render(<InputComponent />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Funcionality", () => {
    it("should accept the type property", () => {
      const type = "email";
      const { container } = render(<InputComponent type={type} />);
      const input = container.querySelector("input");
      expect(input.type).toBe(type); // compara el valor de la propiedad
    });

    it("should accept the labelText property", () => {
      const labelText = "Correo electrónico";
      const { getByText } = render(<InputComponent labelText={labelText} />);
      getByText(labelText);
    });

    it("should accept the id property", () => {
      const id = "id-de-prueba";
      const { container } = render(<InputComponent id={id} />);
      const input = container.querySelector(`#${id}`);
      expect(input).toBeInTheDocument(); // compara el valor de la propiedad
    });

    it("should accept the value property", () => {
      const value = "prueba";
      const { getByDisplayValue } = render(
        <InputComponent value={value} onChange={jest.fn()} />
      );
      getByDisplayValue(value);
    });

    it("should accept the onChange Callback", () => {
      const onChangeCallBack = jest.fn();
      const value = "prueba";
      const { getByDisplayValue } = render(
        <InputComponent value={value} onChange={onChangeCallBack} />
      );
      const input = getByDisplayValue(value);
      fireEvent.change(input, {
        target: {
          value: "testing"
        }
      });
      expect(onChangeCallBack).toHaveBeenCalledTimes(1);
    });

    it("should use the default property of type", () => {
      const type = "text";
      const { container } = render(<InputComponent  />);
      const input = container.querySelector("input");
      expect(input.type).toBe(type); // compara el valor de la propiedad
    });
  });

  it("should accept the error property", () => {
    const errorMessage = "Email Incorrecto";
    const { getByText } = render(<InputComponent error={errorMessage} />);
    getByText(errorMessage);
  });
});
