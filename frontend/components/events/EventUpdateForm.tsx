import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EventService from '../../services/EventService';
import styles  from "../../styles/events.module.css"

const UpdateEventForm: React.FC = () => {
  const router = useRouter();
  const eventId = sessionStorage.getItem('eventId');
  console.log(eventId)
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [maxUsers, setMaxUsers] = useState('');
  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dateError, setDateError] = useState('');
  const [maxUsersError, setMaxUsersError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = (): boolean => {
    let count = 0
    setNameError('');
    setAddressError('');
    setDescriptionError('');
    setDateError('');
    setStatusMessage('');
    setMaxUsersError('');
    setDurationError('');
    if (!name || name.trim() === '') {setNameError('Name cannot be empty');count +=1;}
    if (!address) {setAddressError('Address cannot be empty');count +=1;}
    if (!description) {setDescriptionError('Description cannot be empty');count +=1;}
    if (!date) {setDateError('Date not valid');count +=1;}
    if (!duration || (!/^[0-9]+[ ]{1}[hours]{5}$/.test(duration))) {setDurationError('duration has format (X hours)');count +=1;}
    if (!maxUsers) {setMaxUsersError('Maximum participants cannot be empty');count +=1;}
    if(count > 0) return false;
    return true;
  };

  useEffect(() => {
    if (eventId) {
      // Fetch event data and populate the form
      EventService.getEventByID(eventId.toString())
        .then((res) => res.json())
        .then((event) => {
          setName(event.name);
          setAddress(event.address);
          setDate(event.date);
          setDuration(event.duration);
          setDescription(event.descirption);
          setMaxUsers(event.maxPart);
          console.log(event);
          console.log(event.name);
        })
        .catch((error) => {
          // Handle error
        });
    }
  }, [eventId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
        const response = await EventService.updateEvent({
        eventid:parseInt(eventId?.toString() ?? ''),
        name,
        address,
        date,
        duration,
        description,
        maxUsers: parseInt(maxUsers),
      });

      router.push(`/events`);
      sessionStorage.removeItem('eventId')
      // Process the response data or handle success/error cases
    } catch (error) {
      // Handle any errors that occurred during the request
    }
  };

  return (
    <div className={styles.fifth}>
      <div className={[styles.tablefirst,"row"].join(' ')} >
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className="form-label" style={{ color: 'black' }}>Name:</label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {nameError && <div className="text-danger">{nameError}</div>}
          </div>
          <div className='mb-3'>
            <label className="form-label" style={{ color: 'black' }}>Address:</label>
            <input
              className="form-control"
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            {addressError && <div className="text-danger">{addressError}</div>}
          </div>
          <div className='mb-3'>
            <label className="form-label" style={{ color: 'black' }}>date:</label>
            <input
              className="form-control"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            {dateError && <div className="text-danger">{dateError}</div>}
          </div>
          <div className='mb-3'>
            <label className="form-label" style={{ color: 'black' }}>description:</label>
            <input
              className="form-control"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            {descriptionError && <div className="text-danger">{descriptionError}</div>}
          </div>
          <div className='mb-3'>
            <label className="form-label" style={{ color: 'black' }}>duration:</label>
            <input
              className="form-control"
              type="text"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            />
            {durationError && <div className="text-danger">{durationError}</div>}
          </div>
          <div className='mb-3'>
            <label className="form-label" style={{ color: 'black' }}>Maximum participants:</label>
            <input
              className="form-control"
              type="number"
              value={maxUsers}
              onChange={(event) => setMaxUsers(event.target.value)}
            />
            { maxUsers && <div className="text-danger">{maxUsersError}</div>}
          </div>
          <button className={[styles.button,"btn btn-primary link"].join(' ')} style={{ color: 'white' }} type="submit">Update Event</button>
        </form>
      </div>
    </div>

    
  );
};

export default UpdateEventForm;
