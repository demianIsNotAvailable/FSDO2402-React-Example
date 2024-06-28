import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/user.services"

export default function Admin () {
    const [users, setUsers] = useState([])
    const [usersFound, setUsersFound] = useState([])
    const [filter, setFilter] = useState("")

    const userData = JSON.parse(localStorage.getItem("userData"))
    const token = userData?.token

    useEffect(() => {
        console.log(users)
    }, [users])

    useEffect(() => {
        const filteredUsers = users.filter((user) => {
            if (user.email.includes(filter)) {
                return user
            }
        }) 
        setUsersFound(filteredUsers)
        console.log(filteredUsers, usersFound)
    }, [filter])

    const bringAllUsers = async () => {

       const allUsers = await getAllUsers(token)
       setUsers(allUsers)
    }

    const filterInputHandler = (e) => {
        setFilter(e.target.value)
    }

/* Ver todos los usuarios, Filtrar usuarios por email, eliminar usuarios, cambiar roles, CRUD servicios, ver citas */
    return (
        <div className="admin-design">
            <button onClick={bringAllUsers}>ADMIN</button>
            <input name="filter" onChange={(e) => filterInputHandler(e)} />
            { filter && !usersFound.length ? (
                <p>No hay usuarios con ese email</p>
            ) : filter ? (
                <p>Sí coinciden!</p>
            ) : <p>Aquí estarán todos los usuarios</p>

            }
        </div>
    )
}