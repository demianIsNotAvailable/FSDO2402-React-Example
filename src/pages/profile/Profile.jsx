import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../services/user.services";
import "./Profile.css";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    email: "",
  });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate()

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;
  const email = userData?.decoded.email;

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    const getProfileHandler = async (token) => {
      const data = await getProfile(token);
      setProfileData(data);
    };
    if (!editing) {
      getProfileHandler(token);
    }
  }, [editing]);

  const editInputHandler = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const submitChanges = async (updatedData, token) => {
    const response = await updateProfile(updatedData, token);
    if (response.status === 200) {
      setEditing(false);
    } else {
      console.log("error while updating profile");
    }
  };

  return (
    <div className="profile-design">
      PROFILE
      {profileData ? (
        <>
          <CustomInput
            type="email"
            name="email"
            value={profileData.email}
            handler={editInputHandler}
            isDisabled={!editing}
          />
          <p>{profileData.role}</p>
        </>
      ) : (
        <p>cargando...</p>
      )}
      {editing ? (
        <>
          <button onClick={() => setEditing(false)}>Discard changes</button>
          <button onClick={() => submitChanges(profileData, token)}>
            Save changes
          </button>
        </>
      ) : (
        <button onClick={() => setEditing(true)}>Edit profile</button>
      )}
    </div>
  );
}



// if (dato) 
// Son truthy cualquier número (excepto 0), string con contenido, [], {}, function, true
// Son falsy null, undefined, NaN, "", 0, false