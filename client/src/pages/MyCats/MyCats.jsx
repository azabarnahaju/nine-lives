import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import "./MyCats.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Logout from "../../components/LogoutBtn/Logout";
import PageTitle from "../../components/PageTitle/PageTitle";
import ProfileLogo from "../../components/ProfileLogo/ProfileLogo";
import AddACatBtn from "../../components/AddACatBtn/AddACatBtn";

export default function MyCats() {
  // eslint-disable-next-line no-unused-vars
  const { currUser, setCurrUser } = useUserContext();
  const [userCats, setUserCats] = useState(false);
  const [isNewCatAdded, setIsNewCatAdded] = useState(false);
  useEffect(() => {
    const getCats = async () => {
      try {
        const response = await fetch(`/api/v1/users/${currUser._id}`)
        const userData = await response.json()
        console.log(userData);
        // const catData = await fetch("http://localhost:4000/api/v1/cats");
        const cats = userData.cats;
        setUserCats(cats);
      } catch (err) {
        toast.error(err, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };
    getCats();
  }, [isNewCatAdded]);
  return (
    <div className="cats-parent-container">
      <Navbar />
      <AddACatBtn isNewCatAdded={isNewCatAdded} setIsNewCatAdded={setIsNewCatAdded} />
      <Logout />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="home-text-container">
        <ProfileLogo />
        <PageTitle title={"my cats"} />
      </div>

      {userCats ? (
        <div className="cats-container">
          {userCats.map((cat) => (
            <div key={cat._id} className="cat-modal">
              <h1>{cat.name}</h1>
              {cat.images ? <img className="cat-avatar" src={cat.images[0]} width='200' /> : ""}
              <span>
                {Math.floor(
                  (Date.now() - new Date(cat.birth)) /
                    (1000 * 60 * 60 * 24 * 365)
                )}{" "}
                years old
              </span>
              <hr></hr>
              <Link to={`/mycats/${cat._id}`}>Show Cat Profile</Link>
              <Link to={`/mycats/newvetvisit/${cat._id}`}>Log Vet Visit</Link>
              <Link to={`/newhealthrecord/${cat._id}`}>Log Health Record</Link>
            </div>
          ))}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}