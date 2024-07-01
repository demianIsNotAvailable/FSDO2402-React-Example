import "./Admin.css";
import { useEffect, useState } from "react";
import { getAllUsers, updateUserById } from "../../services/user.services";
import { BsBrush } from "react-icons/bs";
import { CustomInput } from "../../components/custom-input/CustomInput";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [usersFound, setUsersFound] = useState([]);
  const [filter, setFilter] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [editUserData, setEditUserData] = useState({});

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;

//   useEffect(() => {
//     console.log(editUserData);
//     console.log(editUser);
//   }, [editUserData, editUser]);

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      if (user.email.includes(filter)) {
        return user;
      }
    });
    setUsersFound(filteredUsers);
  }, [filter]);

  const bringAllUsers = async () => {
    const allUsers = await getAllUsers(token);
    setUsers(allUsers);
  };

  const filterInputHandler = (e) => {
    setFilter(e.target.value);
  };

  const editInputHandler = (e) => {
    setEditUserData({
      ...editUserData,
      [e.target.name]: e.target.value,
    });
  };

  const editUserHandler = (user) => {
    setEditUser(user._id);
    setEditUserData(user);
  };

  const submitChanges = (updatedUser, token) => {
    updateUserById(updatedUser, token)
  }

  /* Ver todos los usuarios, Filtrar usuarios por email, eliminar usuarios, cambiar roles, CRUD servicios, ver citas */
  return (
    <div className="admin-design">
      <button onClick={bringAllUsers}>ADMIN</button>
      <input name="filter" onChange={(e) => filterInputHandler(e)} />
      {filter && !usersFound.length ? (
        <p>No hay usuarios con ese email</p>
      ) : filter ? (
        <div className="user-table-design">
          <div className="user-table-data">
            <p>Name </p>
            <p>Email </p>
            <p>Rol </p>
          </div>
          {usersFound.map((user) => {
            return (
              <div className="user-table-data-container" key={user._id}>
                <div className="user-table-data">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.role}</p>
                  <BsBrush
                    className="cursor-pointer"
                    onClick={() =>
                      editUser === user._id
                        ? setEditUser(null)
                        : editUserHandler(user)
                    }
                  />
                </div>
                <div className="user-table-edit">
                  {editUser === user._id && (
                    <>
                      <CustomInput
                        type="text"
                        name="name"
                        value={editUserData.name}
                        handler={editInputHandler}
                      />
                      <CustomInput
                        type="email"
                        name="email"
                        value={editUserData.email}
                        handler={editInputHandler}
                      />
                      <CustomInput
                        type="text"
                        name="role"
                        value={editUserData.role}
                        handler={editInputHandler}
                      />
                      <button onClick={() => submitChanges(editUserData, token)}>
                        Save changes
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Aquí estarán todos los usuarios</p>
      )}
    </div>
  );
}
