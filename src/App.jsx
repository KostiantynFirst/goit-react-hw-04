import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, useRef } from "react";
import { AppStyled } from "./App.styled";
import { FetchMaterials } from "./services/api";
import Searchbar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal"
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Modal from 'react-modal'

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [maxPageNumber, setMaxPageNumber] = useState(0);
  const [error, setError] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);


  const galleryRef = useRef();

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    handleScroll();
  }, [images]);
  
  const handleScroll = () => {
    if (!galleryRef.current) {
      return;
    }
      
    if (page > 1) {
      const dims = galleryRef.current.getBoundingClientRect();
      const height = dims.height * 3;

      window.scrollTo({
        top: height,
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { data, totalPages } = await FetchMaterials(searchQuery, page);
        setImages(prevImages => [...prevImages, ...data]);
        setMaxPageNumber(totalPages);

        if (totalPages === 0) {
          toast.error("Sorry, there are no images matching your search query.");
        }
      } catch (error) {
        toast.error(`Sorry, something went wrong: ${error.message}`);
      }  finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, searchQuery]);


  const handleFormSubmit = query => {
    if (!query.trim()) {
      toast.warning("Please enter a search query");
      return;
    }
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setAlt(null);
    setSelectedImage(null);
    setError(null);
  };


  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    // setSelectedImage(null);
    setAlt(null);
  };

  

  const showLoadMoreButton = images.length > 0 && page < maxPageNumber;

  return (
    <AppStyled>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      <ImageGallery
        ref={galleryRef}
        images={images}
        onImageClick={handleSelectedImage} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {selectedImage && (
        <ImageModal 
          selectedImage={selectedImage}
          tags={alt}
          isOpen={modalIsOpen}
          onRequestClose={onCloseModal}
        />
      )}
      {showLoadMoreButton && <LoadMoreBtn onClick={loadMore} />}
    </AppStyled>
  )
  
}

export default App;