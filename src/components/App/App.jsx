import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { ColorRing } from "react-loader-spinner";
import { getPhotos } from "../images-api";
import { Toaster } from "react-hot-toast";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "../ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [urlModal, setUrlModal] = useState("");
  const [altModal, setAltModal] = useState("");

  const handleSearch = (topic) => {
    setImages([]);
    setItem(topic);
    setPage(1);
  };

  const handleLoadMore = () => {
    // console.log("load more");
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (item === "") return;

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const data = await getPhotos(item, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalImages(data.total);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [page, item]);

  const openModal = (url, alt) => {
    setIsOpen(true);
    setAltModal(alt);
    setUrlModal(url);
  };

  const closeModal = () => {
    setIsOpen(false);
    setAltModal("");
    setUrlModal("");
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={openModal} />
      )}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ColorRing />
        </div>
      )}
      <Toaster />
      {images.length > 0 && images.length < totalImages && (
        <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn>
      )}
      <ImageModal
        modalIsOpen={isOpen}
        closeModal={closeModal}
        url={urlModal}
        alt={altModal}
      />
    </div>
  );
}
