import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import makeRequestAuth from '../../utils/makeRequestAuth';
import './SignUpForm.css'
const SignUpForm = () => {
  const navigate = useNavigate();
  const [ signupData, setSignupData ] = useState({
    email: '',
    password: '',
  });
    
  const handleChange = (event) => {
    switch(event.target.name) {
    case 'email': setSignupData({ ...signupData, email: event.target.value }); break;
    case 'password': setSignupData({ ...signupData, password: event.target.value }); break;
    default: 
    }
  };
    
  const handleSubmit = async() => {
    try {
      const response= await axios.post('http://localhost:3004/auth/user/register',signupData)
      if(response){
        navigate('/login');
      }
    } catch (e) {
      const errorStatus = e.response?.status;
      if (errorStatus) {
        navigate(`error/${errorStatus}`);
      } else {
        navigate('error');
      }
    }
  };
  return (
    <div className='row'>
      <div className='left-side'>
        <div className='text'>
          Design APIs fast, <br /> Manage Content Easily
        </div>
      </div>
      <div className='right-side'>
        <div >
        <p className='heading'>Sign Up to your CMS+ account</p>
          <div className='signup-form'>
            <div>
              <div>
                <p>Email</p>
                <input type='email' value={signupData.email} name='email' onChange={(e) => handleChange(e)} />
              </div>
              <div>
                <p>Password</p>
                <input type='password' value={signupData.password} name='password' onChange={(e) => handleChange(e)} />
              </div>
              <button onClick={handleSubmit} >Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default SignUpForm;