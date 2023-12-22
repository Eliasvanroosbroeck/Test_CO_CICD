const getAllCocktails = async () => {
    console.log(process.env.REACT_APP_URL+'cocktails')
    return await fetch(process.env.NEXT_PUBLIC_API_URL+'cocktails');
}


const getCocktailByID = async (cocktailId: string) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL+'cocktails/'+cocktailId);
}

const addCocktail = async (cocktailData: any) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'cocktails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(cocktailData),
      });
      console.log(cocktailData)
      console.log(response)
      return response;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error registering cocktail:', error);
      throw error;
    }
  };

const updateCocktail = async (cocktailData: any) => {
  try {
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'cocktails', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cocktailData), // Pass the cocktailData directly as the request body
    });
    const updatedData = await response.json();
    console.log(updatedData)
    return updatedData;
  } catch (error) {
    console.error('Error updating cocktail:', error);
    throw error;
  }
};

const deleteCocktail = async (cocktailId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}cocktails/${cocktailId}`,
      {
        method: 'DELETE',
      }
    );
    if (response.ok) {
      // cocktail deleted successfully
      return;
    } else {
      throw new Error('Failed to delete cocktail');
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error deleting cocktail:', error);
    throw error;
  }
};

const CocktailService = {
    getAllCocktails,
    getCocktailByID,
    addCocktail,
    updateCocktail,
    deleteCocktail,
}

export default CocktailService