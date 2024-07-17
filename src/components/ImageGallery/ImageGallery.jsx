import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items, onImageClick }) {
  return (
    <ul className={css.list}>
      {items.map(({ id, urls, alt_description }) => (
        <li key={id} className={css.listItem}>
          <ImageCard
            urls={urls}
            alt={alt_description}
            onImageClick={onImageClick}
          />
        </li>
      ))}
    </ul>
  );
}
