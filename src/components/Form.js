import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'

const FormNew = () => {

  const [formData, setFormData] = useState(
    [
      {
      inputType: "text",
      inputName: "Name",
      id: "name",
      name: "name",
      placeholder:"Enter your name",
      inputData: "Name"
      },
      {
      inputType: "email",
      inputName: "Email",
      id: "email",
      name: "email",
      placeholder:"Enter your email",
      inputData: "Email"
      },
      {
        inputType: "number",
        inputName: "Card Number",
        id: "card",
        name: "cardNumber",
        placeholder:"Enter your card number",
        inputData: "Card"
        },
      // {
      // inputType: "password",
      // inputName: "Password",
      // id: "password",
      // name: "password",
      // placeholder:"Enter a password",
      // inputData: "Password"
      // },
      // {
      // inputType: "password",
      // inputName: "Confirm Password",
      // id: "confirm",
      // name: "confirmPassword",
      // placeholder:"Confirm your password",
      // inputData: "Password"
      // },
      // {
      // inputType: "date",
      // inputName: "Date Of Birth",
      // id: "dob",
      // name: "dob",
      // placeholderSuffix:"Date Of Birth",
      // inputData: "Date"
      // },
      // {
      // inputType: "file",
      // inputName: "Upload File",
      // id: "file",
      // name: "file",
      // placeholderSuffix:"File",
      // inputData: "File"
      // }
    ]
  )

  let currentInput

  const form = useRef()

  let isFieldValid = [
    {field: 'name', isValid: false},
    {field: 'email', isValid: false},
    {field: 'cardNumber', isValid: false},
    // {field: 'password', isValid: false},
    // {field: 'confirmPassword', isValid: false},
    // {field: 'dob', isValid: false},
    // {field: 'file', isValid: false},
  ]

  const initialValues = {
    name: "",
    email: "",
    cardNumber: -1
    // password: "",
    // confirmPassword: "",
    // dob: ""
  }

  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (e) => {
    currentInput = e.target;
    const {name, value} = e.target;
    setFormValues({...formValues, [name]:value})
    validate(e.target)
  }

  const luhnCheck = val => {
    let checksum = 0; 
    let j = 1; 


    if (val<11) {
      return false
    }
    
    for (let i = val.length - 1; i >= 0; i--) {
      let calc = 0;
      
      calc = Number(val.charAt(i)) * j;

      
      if (calc > 9) {
        checksum = checksum + 1;
        calc = calc - 10;
      }

      
      checksum = checksum + calc;

      
      if (j == 1) {
        j = 2;
      } else {
        j = 1;
      }
    }
  
    
    return (checksum % 10) == 0;
}

    const validate = (field) => {
      const password = form.current[2];
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const regexPrintable = /^[\x00-\x7F]*$/;
      let obj = isFieldValid.find(f => f.field===field.name);
    
      if (!field.value) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `${field.previousElementSibling.innerHTML.replace(':','')} is required`;
        obj.isValid = false;
      }
  
      else if (field.name ==='name' && !/^[A-Za-z][a-z\s]*$/.test(field.value)) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `Enter a valid Name`;
        obj.isValid = false;
      }
      else if (!regexPrintable.test(field.value)) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `${field.name} can't contain special charcters`;
        obj.isValid = false;
      }
      else if (field.name === 'cardNumber' && !luhnCheck(field.value)) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `Please enter a valid Card Number`;
        obj.isValid = false;
      }

      else if (field.name === 'confirmPassword' && field.value !== password.value) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `Passwords do not match`;
        obj.isValid = false;
      }
     
      else if (field.value.length < 4 && field.value.length > 0 && field.name !== 'email' && field.name !== 'name') {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `${field.previousElementSibling.innerHTML.replace(':','')} must contain at least 4 characters`;
        obj.isValid = false;
      }
    
      else if (field.name === 'email' && !regex.test(field.value)) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `Please enter a valid email`;
        obj.isValid = false;
      }
    
      else {
        field.parentElement.classList.add('valid');
        field.parentElement.classList.remove('error');
        obj.isValid = true;
      }
    }

  
  const handleFocusOut = (e) => {
    validate(e.target);
  }

  const isValid = (arr, valid) => {
    return arr.some(arrVal => valid === arrVal.isValid)
  }

  const handleSubmit = (e) => {

  
    for (let i=0; i<3; i++) {
      const input = form.current.childNodes[i].childNodes[1]
      validate(input)
    }
    if (isFieldValid.some(x => x.isValid == false) ) {
      e.preventDefault();
    }
  
    if(!(isValid(isFieldValid, false))) {
      console.log(formValues);
      setFormValues(initialValues);
      // form.current.reset()
  
      const forms = form.current.childNodes
      for (let i=0; i<forms.length; i++){
        forms[i].classList.remove('valid');
      }
    }
  }

  return (
    <div className="form-content">
      <h1>Sign Up</h1>
      <form action="mailto:test@dn-uk.com" method="post" enctype="text/plain" ref={form} onSubmit={handleSubmit}>
        <Input formData={formData} handleChange={handleChange} handleFocusOut={handleFocusOut}/>
        <input className="submit-btn btn" type="submit" value="Sign Up"/>

      </form>
    </div>
  )
}

export default FormNew