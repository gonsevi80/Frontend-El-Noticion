import { useParams } from "react-router-dom";
import FormNewsEdit from "../components/FormNewsEdit";

const NewsEditPage = () => {
  const { newsId } = useParams();

  return (
    <div>
      <h3>Editar Noticia</h3>
      <FormNewsEdit newsId={newsId} />
    </div>
  );
};

export default NewsEditPage;
