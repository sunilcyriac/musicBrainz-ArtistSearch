import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  title,
}) => {
  return (
    <ContentModal id={id}>
      <b className="title">{title}</b>
    </ContentModal>
  );
};

export default SingleContent;
