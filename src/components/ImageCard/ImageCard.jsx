import css from "./ImageCard.module.css";

export default function ImageCard({ urls, alt_description, onImageClick }) {
  return (
    <div>
      <img
        src={urls.small}
        alt={alt_description}
        className={css.img}
        onClick={() => onImageClick(urls.regular, alt_description)}
      />
    </div>
  );
}
