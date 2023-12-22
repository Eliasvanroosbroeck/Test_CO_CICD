const getAllCocktails = async () => {
    console.log(process.env.REACT_APP_URL+'cocktails')
    return await fetch(process.env.NEXT_PUBLIC_API_URL+'cocktails');
}

const OrdersService = {
    getAllCocktails
}

export default OrdersService