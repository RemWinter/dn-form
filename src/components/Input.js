import { useRef, useState } from "react"


const Input = ({formData, handleChange, handleFocusOut}) => {

  // const [input, setInput] = useState(
  //   formData.name = useRef('')
  // ) 

  return (
    <>
      {formData.map((input) => (
        <div className={`${input.inputType} form-validation`}>
          <label htmlFor= {input.id}>{input.inputName}:</label>
          <input onBlur={handleFocusOut} onChange={handleChange} type={input.inputType} name={input.name} id={input.id} placeholder={input.placeholder}/>
          <p>Error</p>
        </div>
      ))}
    </>
  )
}

export default Input