import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";


export default function Signupn() {
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()

  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
     
    }
    console.log(payload);
    axiosClient.post("/signup", payload)
      
      .catch(err => {
        console.log(err);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      
    </div>
  )
}

