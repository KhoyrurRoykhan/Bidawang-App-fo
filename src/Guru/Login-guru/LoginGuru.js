import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginGuru = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const AuthGuru = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login-guru', {
        email: email,
        password: password
      });
      navigate("/guru/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className='columns is-centered'>
            <div className='column is-4-desktop'>
              <form onSubmit={AuthGuru} className='box'>
                <p className="has-text-centered has-text-danger">{msg}</p>
                <div className='field mt-5'>
                  <label className='label'>Email</label>
                  <div className='controls'>
                    <input 
                      type='email' 
                      className='input' 
                      placeholder='Email Guru' 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <div className='field mt-5'>
                  <label className='label'>Password</label>
                  <div className='controls'>
                    <input 
                      type='password' 
                      className='input' 
                      placeholder='********' 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <div className='field mt-5'>
                  <button className='button is-info is-fullwidth'>Login Guru</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginGuru;
