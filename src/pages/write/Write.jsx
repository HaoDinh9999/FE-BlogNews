import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import imgur from "imgur";
import { storage } from "../../firebase";
import { nextTick } from "process";
export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [urlImage, setUrlImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      email: user.email,
      title,
      desc,
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
              newPost.photo = url;
              console.log(url);
              setUrlImage(url);
              setFile("");
              console.log(newPost);
              try {
                const res = await axios.post("/posts", newPost);
                window.location.replace("/post/" + res.data._id);
              } catch (err) {
                alert("Error, please try again");
              }
            })
            .catch((err) => console.log(err));
        }
      );
      console.log("chay cham thoi");

      // const data = new FormData();
      // const filename = file.name;
      // data.append("name", filename);
      // data.append("file", file);
      // newPost.photo = filename;
      // console.log(filename);
      // try {
      //   const res = await axios({
      //     method: "POST",
      //     url: "http://localhost:3001/api/upload/",
      //     data: { filename },
      //   });
      //   console.log(res.response.message);
      // } catch (err) {
      //   console.log("fail", err);
      // }
    } else {
      try {
        const res = await axios.post("/posts", newPost);
        window.location.replace("/post/" + res.data._id);
      } catch (err) {
        alert("Error, please try again");
      }
    }
    // try {
    //   const res = await axios.post("/posts", newPost);
    //   window.location.replace("/post/" + res.data._id);
    // } catch (err) {
    //   alert("Error, please try again");
    // }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form
        className="writeForm"
        action="/api/upload"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            name="image"
            action="/api/uplaod"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
