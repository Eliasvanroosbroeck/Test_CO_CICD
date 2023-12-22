import { error } from 'console';
import CocktailService from '../../services/CocktailService';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import styles  from "../../styles/cocktail.module.css"


const UpdateCocktailForm: React.FC = () => {
  const router = useRouter();
  const cocktailId = sessionStorage.getItem('cocktailId');
  console.log(cocktailId)

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [price , setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [ingredientsError, setIngredientsError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = (): boolean => {
    let count = 0
    setNameError('');
    setIngredientsError('');
    setDescriptionError('');
    setPriceError('');
    setStatusMessage('');
    if (!name || name.trim() === '') {setNameError('Name cannot be empty');count +=1;}
    if (!ingredients) {setIngredients('Ingredients cannot be empty');count +=1;}
    if (!description) {setDescriptionError('Description cannot be empty');count +=1;}
    if (!price) {setPriceError('Price must be higher than 0');count +=1;}
    if(count > 0) return false;
    return true;
  };

  useEffect(() => {
    if (cocktailId) {
      // Fetch event data and populate the form
      CocktailService.getCocktailByID(cocktailId.toString())
        .then((res) => res.json())
        .then((cocktail) => {
          setName(cocktail.name);
          setIngredients(cocktail.ingredients);
          setDescription(cocktail.description);
          setPrice(cocktail.price);
          console.log(cocktail);
          console.log(cocktail.name);
        })
        .catch((error) => {
          // Handle error
        });
    }
  }, [cocktailId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    
    try {
      const response = await CocktailService.updateCocktail({
        cocktailid:parseInt(cocktailId?.toString() ?? ''),
        name,
        ingredients,
        description,
        price: parseInt(price),
      });
      // Redirect to /cocktails page
      
      router.push('/cocktails');
      sessionStorage.removeItem('cocktailId');
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
            <label className="form-label" style={{ color: 'black' }}>Description:</label>
            <input
              className="form-control"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            {descriptionError && <div className="text-danger">{descriptionError}</div>}
          </div>
          <div className='mb-3'>
            <label className="form-label" style={{ color: 'black' }}>Ingredients:</label>
            <input
              className="form-control"
              type="text"
              value={ingredients}
              onChange={(event) => setIngredients(event.target.value)}
            />
            {ingredientsError && <div className="text-danger">{ingredientsError}</div>}
          </div>
          <div className='mb-3'>
            <label className="form-label" style={{ color: 'black' }}>Price:</label>
            <input
              className="form-control"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            {priceError && <div className="text-danger">{priceError}</div>}
          </div>
          <button className={[styles.button,"btn btn-primary link"].join(' ')} style={{ color: 'white' }} type="submit">Update Cocktail</button>
        </form>
      </div>
    </div>


  );
};

export default UpdateCocktailForm;
