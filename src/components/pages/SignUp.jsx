import { useState } from "react";
import InputComponent from "../InputComponent";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = (e) => {
    e.preventDefault();
    console.log(email,password);
  }

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto">
          <div className="card">
            <div className="card-body">
              <h3>Crear Cuenta</h3>
              <hr />
              <form onSubmit={createAccount}>
                <InputComponent
                  id="email"
                  type="email"
                  labelText="Correo electrónico"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <InputComponent
                  id="password"
                  type="password"
                  labelText="Contraseña"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />

                <div className="mb-3">
                  <button type="submit" id="btn-register" className="btn btn-primary">
                    Crear cuenta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
