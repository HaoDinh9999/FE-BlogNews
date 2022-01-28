import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { storage } from "../../firebase";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email: user.email,
      //  password,
    };
    if (file) {
      console.log(file);
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "state changed",
        (snapshot) => {},
        (error) => {
          setFile("");

          console.log("err firebase:", error);
        },
        async () => {
          await storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then(async (url) => {
              updatedUser.profilePic = url;
              console.log(url);
              setFile("");
              setUrl(url);
              console.log(updatedUser);
              try {
                const res = await axios.patch(
                  "https://testappduocchua.herokuapp.com/api/users/" + user._id,
                  updatedUser
                );
                setSuccess(true);
                dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
                console.log(res.response.data);
              } catch (err) {
                alert("Error, please try again");
              }
            })
            .catch((err) => console.log(err));
        }
      );
    } else {
      try {
        const res = await axios.patch(
          "https://testappduocchua.herokuapp.com/api/users/" + user._id,
          updatedUser
        );
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        console.log(res);
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Name</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            className="inputEmail"
            disabled="flase"
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            value={user.email}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
