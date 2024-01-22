import AuthContextProvider from "../context/AuthContextProvider";
import { useContext, useState } from "react";
import newNewsService from "../service/newNewsService";
import { useNavigate } from "react-router-dom";

const FormNewNews = () => {
  const { token } = useContext(AuthContextProvider);

  const [error, setError] = useState("");
  const [prevImage, setprevImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);

      const newNews = await newNewsService({ data, token });

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Headline</label>
        <input type="text" name="headline" />
      </div>
      <div>
        <label>Entrance</label>
        <input type="text" name="entrance" />
      </div>
      <div>
        <label>Paragraphs</label>
        <input type="text" name="paragraphs" />
      </div>
      <div>
        <label>Photo</label>
        <input
          type="file"
          name="photo"
          accept="photo/*"
          onChange={(e) => setPrevPhoto(e.target.files[0])}
        />
      </div>
      <div>
        {prevPhoto ? (
          <img src={URL.createObjectURL(prevPhoto)} alt="photo" />
        ) : null}
      </div>
      <input type="submit" value="Enviar" />
      {error ? <p>{error}</p> : null}
    </form>
  );
};

export default FormNewNews;
