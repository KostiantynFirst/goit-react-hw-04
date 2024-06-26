import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { AppStyled } from "./App.styled";
import { FetchMaterials } from "./services/api";
import Searchbar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal"
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn" 

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [status, setStatus] = useState("idle");
  const [totalHits, setTotalHits] = useState(0);
  const [maxPageNumber, setMaxPageNumber] = useState(0);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      setStatus("pending");
      try {
        const imageData = await FetchMaterials(searchQuery, page);
        const imagesHits = imageData.results;
        const totalImages = imageData.total_pages;
        const totalPages = Math.ceil(totalImages / 12);

        setImages(prevImages => [...prevImages, ...imagesHits]);
        setTotalHits(totalImages);
        setMaxPageNumber(totalPages);
        setStatus("resolved");

        if (totalImages === 0) {
          toast.error("Sorry, there are no images matching your search query.");
        }
      } catch (error) {
        toast.error(`Sorry, something went wrong: ${error.message}`);
        setStatus("rejected");
      }
    };

    fetchData();
  }, [page, searchQuery]);

  useEffect(() => {
    if (page > 1) {
      const CARD_HEIGHT = 300;
      window.scrollBy({
        top: CARD_HEIGHT * 2,
        behavior: "smooth",
      });
    }
  }, [images, page]);

  const handleFormSubmit = query => {
    if (!query.trim()) {
      toast.warning("Please enter a search query");
      return;
    }
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setStatus("pending");
    setAlt(null);
    setSelectedImage(null);
  };

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setAlt(null);
  };

  const showLoadMoreButton = images.length > 0 && page < maxPageNumber;

  return (
    <AppStyled>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      {status === "pending" && <Loader />}
      <ImageGallery images={images} onImageClick={handleSelectedImage} />
      {selectedImage && (
        <ImageModal
          selectedImage={selectedImage}
          tags={alt}
          onClose={closeModal}
        />
      )}
      {showLoadMoreButton && <LoadMoreBtn onClick={loadMore} />}
    </AppStyled>
  );
};

export default App;