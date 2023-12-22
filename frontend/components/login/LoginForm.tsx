import React, { useState } from 'react';
import Link from 'next/link';
import UserService from '@/services/UserService';
import { useRouter } from 'next/router';
import styles  from "../../styles/cocktail.module.css"

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [wrongCombError, setWrongCombError] = useState('');
  //const [statusMessage, setStatusMessage] = useState({message:'', type:''});

  const validate = (): boolean => {
    let count = 0
    setNameError('');
    setPasswordError('');
    setWrongCombError('');
    if (!username || username.trim() === '') {setNameError('Username is required'); count+=1}
    if (!password) {setPasswordError('Password is empty'); count+=1}
    if(count >0) return false;
    return true;
  };

const handleSubmit = async (event: any) => {
  event.preventDefault();
  if (!validate()) {return;}

  const user = {
    name:username,
    password,
  }

    const response = await UserService.loginUser(user); 
    if (response.status === 200) {
      const {token} = await response.json();
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('token', token);
      router.push('/')
    } else if (response.status === 401) {
      setWrongCombError('Wrong username password combination provided')
      console.log('status 404');
    }
};

  return (
  <div className={styles.fifth}>
    <div className={[styles.tablefirst,"row"].join(' ')} >
    {wrongCombError && <div className="text-danger">{wrongCombError}</div>}
      <form onSubmit={handleSubmit}>
        <label className="form-label" style={{ color: 'black' }}>username:</label >
          <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {nameError && <div className="text-danger">{nameError}</div>}
        <br />
        <label className="form-label" style={{ color: 'black' }}> Password:</label>
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordError && <div className="text-danger">{passwordError}</div>}
        <label>
          <Link style={{ color: 'black' }} href="/login/register">Don't have an account yet?</Link>
        </label>
        <button className={[styles.button,"btn btn-primary link"].join(' ')} style={{ color: 'white' }} type="submit">Login</button>
      </form>
    </div>
  </div>

  );
};

export default Login;
