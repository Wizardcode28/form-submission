import React from 'react'
import MapView from './MapView'
import { useRef } from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import { useState } from 'react'
import {ToastContainer,toast} from 'react-toastify'
import { useForm} from "react-hook-form"


const Home = () => {
    const recaptchaRef = useRef()
    const [form, setForm] = useState({ name: "", email: "" });
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false)
    const {register,handleSubmit,watch,formState:{errors,isSubmitting},} = useForm()
    // const handleChange = (e) => {
    //   setForm({ ...form, [e.target.name]: e.target.value });
    // };
    // const handletoast=()=>{
    //   toast.success("wow toast is working",{theme:"light"})
    //   // toast.error("wow toast is working",{theme:'dark'})
    //   // toast.info("wow toast is working",{theme:'colored'})
    //   // toast.warn("wow toast is working")
    //   // toast("auto-close",{autoClose:1000})
    //   // toast("custom-position",{position:"top-center"})
    //   // (top,bottom)-(left,right,center)
    //   // toast("click me",{onClick:()=>{alert("Toast-Clicked")}})
    //   // toast("No close button",{closeButton:false})
    //   // toast.dismiss()-all 
    //   //dismisses current toast
    //   // toast("Unique Toast",{toastId:"unique"}) //avoid duplicate
    //   // toast( custom toast component inside
    //   // <div>
    //   //   <h4>Custom Message</h4>
    //   //   <button onClick={()=>{alert("got clicked")}}>click me for message</button>
    //   // </div>)
    // }
  
    const onSubmit = async (content) => {
      // e.preventDefault();
      setLoading(true)
      const token=recaptchaRef.current.getValue()
      if (!token) {
        alert("Please verify reCAPTCHA before submitting.");
        return;
      }
      content.captchaToken=token
      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });
    
      const data = await res.json();
      console.log("Backend response:", data);
      setResponse(data.message);
      setLoading(false)
      // reset()
      recaptchaRef.current.reset()
    };
    return (
      <div className='container'>
        <div className='headform'>
        <h1>Form</h1>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <input
            className={errors.name? "input-error" : ""}
            type="text"
            autoComplete='name'
            placeholder="Enter name"
            {...register("name",{
              required:"Name is required",
              minLength:{value:3,message:"min len atleast 3"},
              maxLength:{value:15,message:"max len atmost 15"}
            })}
          />
          {errors.name && <p className='err-msg'>{errors.name.message}</p>}
          <input
            className={errors.email?"input-error":""}
            type="email"
            autoComplete='email'
            placeholder="Enter email"
            {...register("email",
              {required:"Email is required",
               pattern:{
                value:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message:"email is not valid"
               }
              })}
          />
          {errors.email && <p className='err-msg'>{errors.email.message}</p>}
          <input 
          className={errors.Password?"input-error":""}
          type="text"
          placeholder='Enter your Password'
          {...register("Password",{
            required:"Please enter Password",
            minLength:{
              value:2,
              message:"Password should contain 2-5 letters"
            },  
            maxLength:{
            value:5,
            message:"Password should contain 2-5 letters"
            }
          })}
          />
          {errors.Password && <p className='err-msg'>{errors.Password.message}</p>}
          <input 
          type="text"
          placeholder='Enter your Country name'
          {...register("country")}
          />
          <select name='field' defaultValue={"default"}>
          <option disabled value="default" >Choose your field of interest</option>
          <option value="AI/ML Enginner">AI/ML Enginner</option>  
          <option value="Data Scientist">Data Scientist</option>  
          <option value="Web Developer">Web Developer</option>  
          <option value="Data Analyst">Data Analyst</option>  
          </select>
  
          <label className='checkbox'>
          <input
          type="checkbox"
          {...register("checkbox")}
          />
          Accept Terms and Conditions 
          </label>
          <div className='genderop'>
          <label className='radio'>
          <input
          type="radio"
          {...register("gender")}
          />
          Male 
          </label>
  
          <label className='radio'>
          <input
          type="radio"
          {...register("gender")}
          />
          Female 
          </label>
          </div>
  
          <ReCAPTCHA
            sitekey="6Ldo9wwrAAAAAIg_WjybJHV5hQqHM4aT8XBKX8nz"
            ref={recaptchaRef}
          />
          <button autoFocus type='submit' disabled={isSubmitting}>{isSubmitting?"🚀 Submitting...":"✅ Submit"}</button>
          <p>{isSubmitting?"":response}</p>
          
          {/* <button onClick={handletoast}>Submit for toast</button> */}
          {/* <ToastContainer
          position="top-left"
          autoclose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
           /> */}
           
        </form>
        </div>
        <MapView
        />
      </div>
    )
}

export default Home
