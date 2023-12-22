import React from "react";
import { Users } from "@/types";
import styles from "../../styles/users.module.css"
import { useRouter } from "next/router";
import UserService from "../../services/UserService";

type Props = {
    users: Array<Users> | undefined
    onUserListChange: (updatedUsers : Array<Users>) => void;
};


const UsersOverviewTable: React.FC<Props> = ({users, onUserListChange}: Props) => {
    const router = useRouter();

    const handleUpdate = (userId: number | undefined) =>{
        if (userId){
        sessionStorage.setItem('userId', userId.toString());}
        router.push(`/users/updateUser`)
    }

    const handleDelete =async (userId:number | undefined) => {
        try{
            if (userId){
            await UserService.deleteUser(userId);}
            const updatedUserList = users?.filter((user) => user.userid !== userId) || [];
            onUserListChange(updatedUserList)
        } catch(error){

        }
    }
    if(users?.length===0){
        return <p style={{position: 'static',display: 'grid',textAlign: 'left',color: 'rgb(0,0,0)'}}> No users registered</p>}
    else{
        return(
            <>
                {users &&
                    users.map((user, key) =>(
                        <div className={[styles.tablefirst, "row"].join(" ")} key={user.userid}>
                         <div className={[styles.tablesecond].join(' ')}>
                        <h1 className={styles.tableH1} >{user.name}</h1>
                        <button className={[styles.tablebutton1,"btn btn-primary"].join(' ')} type="button" onClick={() => handleUpdate(user.userid)} >Update</button>
                        <button className={[styles.tablebutton2,"btn btn-primary"].join(' ')} type="button" onClick={() => handleDelete(user.userid)}>Delete</button>
                        <p className={styles.tablep1}>Role: {user.role}</p>
                    </div>
                    <div className={[styles.tablethird,"col mb-auto"].join(' ')}>
                        <p className={styles.tablep2}>
                           mail: {user.mail}
                           <br />
                           Tel nr: {user.telNr}
                           </p>
                    </div>
                </div>
                    ))}
            </>
        )
    }
}

export default UsersOverviewTable