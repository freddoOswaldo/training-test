import { useState } from "react";
import { signInFirebase } from "../../firebase/auth/functions";
import { SignUpValidation } from "../../utils/validations/validation";
import ButtonComponent from "../ButtonComponent";
import InputComponent from "../InputComponent";
import { useNavigate } from "react-router-dom";
const SignIn = ({ signIn = signInFirebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    isValid: true,
  });
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const createAccount = async (e) => {
    e.preventDefault();
    setApiError("");
    setErrors({ isValid: true });
    try {
      const validation = SignUpValidation(email, password);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
      setLoading(true);
      await signIn(email, password);
      navigate("/user");
    } catch ({ message }) {
      setApiError(message);
      setLoading(false);
    } 
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto">
          <div className="card">
            <div className="card-body">
              <h3>Iniciar Sesión</h3>
              <hr />
              <form onSubmit={createAccount}>
                <InputComponent
                  id="email"
                  type="email"
                  labelText="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />

                <InputComponent
                  id="password"
                  type="password"
                  labelText="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />

                <div className="mb-3 mt-3">
                  <ButtonComponent
                    color="primary"
                    label="Iniciar Sesión"
                    id="btn-register"
                    type="submit"
                    isLoading={isLoading}
                  />
                </div>
              </form>
              {apiError && (
                <div className="alert alert-danger mt-4" role="alert">
                  {apiError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
