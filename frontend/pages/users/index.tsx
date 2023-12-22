import { Head2 } from "@/components/Head";
import { Header2 } from "@/components/Header";
import { Footer } from "@/components/Footer";
import UserService from "@/services/UserService";
import React, {useState,useEffect } from "react";
import { Users } from "@/types";
import UserOverviewTable from "@/components/users/UserOverviewTable";
import styles  from "../../styles/cocktail.module.css";
import Link from "next/link";


const Users: React.FC = () =>{
    const [users, setUsers] = useState<Array<Users>>()
    const [error, setError] = useState('');

    const getUsers =async() => {
        const response = await UserService.getAllUsers();
        const users= await response.json();
        setUsers(users)
        console.log(users)
    }

    useEffect(() =>{
        console.log(getUsers)
        getUsers()
    }, [])
    const handleUserListChange = (updatedUsers: Array<Users>)=> {
        setUsers(updatedUsers);
    };

    return(
        <>
        <Head2></Head2>
        <Header2></Header2>
        <main>
            <section className="masthead">
            <div className={[styles.bg,"intro-body"].join(' ')} >
                <div className={"container"}>
                    <div className={[styles.first,"row"].join(' ')}>
                        <div className={[styles.second,"col-lg-11 order-2 m-auto"].join(' ')}>
                            <div className={styles.third}>
                                <h1 className={styles.h1style}>Users</h1>
                                <div className={styles.fourth}>
                                    <div className={styles.fifth}> 
                                        <UserOverviewTable users={users} onUserListChange={handleUserListChange} />
                                    </div>
                                    </div>
                                </div><button className={[styles.button,"btn btn-primary"].join(' ')} type="button" ><Link href="/login/register">Add User</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Users
