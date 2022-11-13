import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as registerActions from "../../redux/actions/login/registerActions";
import PropTypes from "prop-types";
import LoginForm  from "./LoginForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function LoginPage({userLogin, onLogin, history, ...props}) {
  const [user, setUser] = useState({...props.user});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if(userLogin.message === "Success"){
      debugger;
      localStorage.setItem('userLogin', JSON.stringify(userLogin));
      console.log(userLogin);
    }else{
      setUser({...props.user});
    }
  }, [props.user]);

  function handleChange(event){
    debugger;
    const {name, value} = event.target;
    setUser(prevRegister => ({
        ...prevRegister,
        [name]: name === "authorId" ? parseInt(value,10) : value
    })) 
  }
  function formIsValid() {
    const {  email, password } = user;
    const errors = {};

    if (!email) errors.email = "email is required";
    if (!password) errors.password = "password is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function closeAlert() {    
    setErrors({});
  }

  function handleSave(event){
    event.preventDefault();
    setErrors({});
    if(!formIsValid()) return;
    setSaving(true);
    onLogin(user).then((data) => {
      debugger;
      console.log(data);
      toast.success("User Success.");
      history.push("/");
    }).catch(error => {
        setSaving(false);
        setErrors({onLogin:JSON.parse(error.message).error});
        toast.error(JSON.parse(error.message).error);
        
    });
  }
  return (
    <>
      {saving ? (
        <Spinner/>
      ) : (
        <LoginForm 
          user={user} 
          errors={errors} 
          onChange={handleChange}
          onLogin={handleSave}
          onCloseAlert={closeAlert}
          saving={saving}/>
      )}
    </>
  )
  
}

//this.props
LoginPage.propTypes = {
  userLogin: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getUserBySlug(register, slug){
    return register.find(user => user.slug === slug) || null
}

function mapStateToProps(state, ownProps){
  const slug = ownProps.match.params.slug;
  
  return {
    user: {email: "", password:"", data:{}},
    userLogin:state.userLogin,
    register: state.register
  };
}

const mapDispatchToProps = {  
    onLogin: registerActions.loginUser 
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);