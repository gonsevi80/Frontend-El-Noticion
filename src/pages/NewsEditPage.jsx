import { useParams } from "react-router-dom";
import FormNewsEdit from "../components/FormNewsEdit";

const NewsEditPage = () => {
  const { newsId } = useParams();

  return (
    <div>
      <h2>Editar Noticia</h2>
      <FormNewsEdit newsId={newsId} />
    </div>
  );
};

export default NewsEditPage;
