import UserService from '../../services/UserService';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles  from "../../styles/cocktail.module.css"

const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [telNr, setTelNr] = useState('');
  const [nameError, setNameError] = useState('');
  const [mailError, setMailError] = useState('');
  const [telNrError, setTelNrError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = (): boolean => {
    let count= 0
    setNameError('');
    setMailError('');
    setTelNrError('');
    setPasswordError('');
    setStatusMessage('');
    if (!username || username.trim() === '') {setNameError('Name cannot be empty'); count +=1;}
    if (!mail) {setMailError('email cannot be empty');count +=1;}
    if (!/^\d{10}$/.test(telNr)) {setTelNrError('This is not a valid phone number, valid phone number contains 10 decimal characters');count +=1;}
    if (!password || password.length<6) {setPasswordError('Password is to short , 6 characters minimum');count +=1;}
    if (count > 0) return false;
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const response = await UserService.addUser({
        name:username,
        password,
        mail,
        telNr
      });
      if(response.status === 200){router.push('/');}  
      else if (response.status === 500){setNameError('Username must be Unique')}    
    } catch (error) {
    }
  };

  return (
    <div className={styles.fifth}>
     <div className={[styles.tablefirst,"row"].join(' ')} >
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" style={{ color: 'black' }}>Username:</label>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            {nameError && <div className="text-danger">{nameError}</div>}
          </div>
          <div>
            <label className="form-label" style={{ color: 'black' }}>Mail:</label>
            <input
              className="form-control"
              type="email"
              value={mail}
              onChange={(event) => setMail(event.target.value)}
            />
            {mailError && <div className="text-danger">{mailError}</div>}
          </div>
          <div>
            <label className="form-label" style={{ color: 'black' }}>Telefoon Nr:</label>
            <input
              className="form-control"
              type="text"
              value={telNr}
              onChange={(event) => setTelNr(event.target.value)}
            />
            {telNrError && <div className="text-danger">{telNrError}</div>}
          </div>
          <div>
            <label className="form-label" style={{ color: 'black' }}>Password:</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError && <div className="text-danger">{passwordError}</div>}
          </div>
          <button className={[styles.button,"btn btn-primary link"].join(' ')} style={{ color: 'white' }} type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
