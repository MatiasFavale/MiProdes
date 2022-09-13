import React from "react";
import PropTypes from "prop-types";
import FormTextInput from "../common/FormTextInput";

const RegisterForm = ({
  user,
  onSave,
  onChange,
  onChangeCodeAuth,
  saving = false,
  errors = {}
}) => {
  return (
    <>
    <button className="btn btn-outline-warning" onClick={() => onChangeCodeAuth(user)}>
      Tengo Codigo!
    </button>
    <form onSubmit={onSave}>
      <h2>Registro Usuario</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <FormTextInput
        className="letraNegra"
        name="name"
        label="Nombre"
        value={user.name}
        onChange={onChange}
        error={errors.title}
      />
      <FormTextInput
        name="email"
        label="Email"
        value={user.email}
        onChange={onChange}
        error={errors.title}
      />
      <FormTextInput
        name="password"
        label="Password"
        value={user.password}
        onChange={onChange}
        error={errors.title}
      />
      <FormTextInput
        name="codeAuth"
        value={user.codeAuth}
        label="Codigo Autorizacion"
        onChange={onChange}
        error={errors.title}
        disabled={!user.habilitado}
      />  
      <br></br>
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Registrando..." : "Registrese"}
      </button>
    </form>
    </>
  );
};

RegisterForm.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeCodeAuth: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default RegisterForm;
