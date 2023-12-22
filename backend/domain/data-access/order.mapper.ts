import { Order } from "../model/Order"
import { OrderSQLView, UserInput } from "../../types/types"
import { mapToUser } from "./user.mapper"

export const mapToOrders = (OrderInput: (OrderSQLView & {user?: UserInput})[]): Order[] => OrderInput.map(mapToOrder);

export const mapToOrder = ({orderid, userId, deliveryDate, users}: OrderSQLView & {users?: UserInput}): Order =>
    new Order({orderid: orderid, userID:userId, deliveryDate, user: mapToUser(users)});

export default {mapToOrders, mapToOrder}