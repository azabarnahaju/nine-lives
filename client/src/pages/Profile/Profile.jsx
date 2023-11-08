import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Logout from "../../components/LogoutBtn/Logout";
import ProfileLogo from "../../components/ProfileLogo/ProfileLogo";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./Profile.css";

const patchUserProf = async (userID, body) => {
  try {
    console.log(userID);
    const response = await fetch(
      `http://localhost:4000/api/v1/users/${userID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      alert("Your profile was successfully updated!");
    } else {
      console.log("Updating user profile failed.");
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteUserProf = async (userID, navigate) => {
  try {
    console.log(userID)
    const response = await fetch(
      `http://localhost:4000/api/v1/users/${userID}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      alert("Your profile was successfully deleted");
      setTimeout(() => navigate("/home"), 4000);
    } else {
      alert("Deleting user profile has failed.");
    }
  } catch (err) {
    console.log(err);
  }
};

export default function Profile() {
  const { userID } = useParams();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleProfInput = (e) => {
    e.target.setAttribute("value", e.target.value);
    e.target.setAttribute("hasChanged", true);
  };

  const handleProfSubmit = (e) => {
    const userProfForm = document.querySelector(".user-profile-container");
    const userFormInputs = userProfForm.querySelectorAll("input");
    const body = {};
    userFormInputs.forEach((i) => {
      if (i.getAttribute("hasChanged")) {
        body[i.getAttribute("name")] = i.value;
        i.setAttribute("hasChanged", false);
      }
    });

    if (body.password === body["password-confirm"]) {
      delete body["password-confirm"];
      console.log(body);
      patchUserProf(userID, body);
      setIsEditing(false);
    } else {
      alert("Wrong password confirmation. Try again!");
    }
  };

  const handleProfDel = () => {
    deleteUserProf(userID, navigate);
  };

  useEffect(() => {
    async function fetchUserData(userID) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/users/${userID}`
        );
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoading(true);
    fetchUserData(userID);
    setIsLoading(false);
  }, [isLoading, isEditing]);

  return userData ? (
    <div>
      <Navbar />
      <ProfileLogo />
      <PageTitle title={"my profile"} />
      <Logout />
      <div className="user-profile-container">
        <div className="user-prof user-prof-username">
          <p className="field-title">username</p>
          {isEditing ? (
            <input
              type="text"
              name="username"
              defaultValue={userData.username}
              onChange={handleProfInput}
            />
          ) : (
            <p>{userData.username}</p>
          )}
        </div>
        <div className="user-prof user-prof-password">
          <p className="field-title">password</p>
          {isEditing ? (
            <>
              <input
                type="password"
                name="password"
                id="user-prof-pw-input"
                defaultValue={userData.password}
                onChange={handleProfInput}
              />
              <p className="field-title">Confirm your password</p>
              <input
                type="password"
                name="password-confirm"
                id="user-prof-pw-condirm-input"
                defaultValue={userData.password}
                onChange={handleProfInput}
              />
            </>
          ) : (
            <p>{userData.password}</p>
          )}
        </div>
        <div className="user-prof user-prof-email">
          <p className="field-title">email</p>
          {isEditing ? (
            <input
              type="email"
              name="email"
              defaultValue={userData.email}
              onChange={handleProfInput}
            />
          ) : (
            <p>{userData.email}</p>
          )}
        </div>
        {isEditing ? (
          <div className="edit-buttons-container">
            <button className="user-prof-save-btn" onClick={handleProfSubmit}>
              Save
            </button>
            <button
              className="user-prof-cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              CANCEL
            </button>
          </div>
        ) : (
          <button
            className="user-prof-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            EDIT PROFILE
          </button>
        )}
        <button className="user-prof-delete-btn" onClick={handleProfDel}>
          DELETE PROFILE
        </button>
      </div>
    </div>
  ) : (
    <h2>Loading</h2>
  );
}
