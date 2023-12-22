import { User } from "../model/User"
import {UserInput} from "../../types/types"


const mapToUsers = (userSQLView: UserInput[] ): User[] => userSQLView?.map(mapToUser);

const mapToUser = ({userid, name, telNr, mail, password, role}: UserInput): User =>
    new User({name, telNr, mail, password, id: userid, role});

export {mapToUser, mapToUsers}