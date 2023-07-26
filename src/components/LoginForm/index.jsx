import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
    const navigate = useNavigate();
  const [ loginData, setloginData ] = useState({
    email: '',
    password: '',
  });
    
  const handleChange = (event) => {
    switch(event.target.name) {
    case 'email': setloginData({ ...loginData, email: event.target.value }); break;
    case 'password': setloginData({ ...loginData, password: event.target.value }); break;
    default: 
    }
  };
    
  const handleSubmit = async() => {
    try {
      const response = await axios.post('http://localhost:3004/auth/user/login', loginData)
       localStorage.setItem('jwt_token', response.data.token);
      if(response){
        navigate('/');
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
        <p className='heading'>Login to your CMS+ account</p>
          <div className='login-form'>
            <div>
              <div>
                <p>Email</p>
                <input type='email' value={loginData.email} name='email' onChange={(e) => handleChange(e)} />
              </div>
              <div>
                <p>Password</p>
                <input type='password' value={loginData.password} name='password' onChange={(e) => handleChange(e)} />
              </div>
              <button onClick={handleSubmit} >Log In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;