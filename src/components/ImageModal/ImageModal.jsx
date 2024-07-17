// export default function ImageModal({ image, onRequestClose }) {
//   if (!image) {
//     return null;
//   }
//   const { urls, alt_description } = image;

//   return (
//     <div>
//       <button onClick={onRequestClose}>Close</button>
//       <img src={urls.regular} alt={alt_description} />
//     </div>
//   );
// }
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

Modal.setAppElement("#root");

export const ImageModal = ({ modalIsOpen, closeModal, url, alt }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img src={url} alt={alt} />
    </Modal>
  );
};
