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

// const App = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [images, setImages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [alt, setAlt] = useState(null);
//   const [status, setStatus] = useState("idle");
//   const [totalHits, setTotalHits] = useState(0);
//   const [maxPageNumber, setMaxPageNumber] = useState(0);
//   const [error, setError] = useState(null);

//   const galleryRef = useRef();

//     useEffect(() => {
//     handleScroll();
//     }, [images]);
  
//     const handleScroll = () => {
//     if (!galleryRef.current) {
//       return;
//     }
      
//     if (page > 1) {
//       const dims = galleryRef.current.getBoundingClientRect();
//       const y = dims.height * 3;

//       window.scrollTo({
//         top: y,
//         behavior: 'smooth',
//         block: 'start',
//       });
//     }
//   }; 

//   useEffect(() => {
//     if (!searchQuery) return;

//     const fetchData = async () => {
//       setStatus("pending");
//       try {
//         const imageData = await FetchMaterials(searchQuery, page);
//         const imagesHits = imageData.results;
//         const totalImages = imageData.total_pages;
//         const totalPages = Math.ceil(totalImages / 12);

//         setImages(prevImages => [...prevImages, ...imagesHits]);
//         setTotalHits(totalImages);
//         setMaxPageNumber(totalPages);
//         setStatus("resolved");

//         if (totalImages === 0) {
//           toast.error("Sorry, there are no images matching your search query.");
//         }
//       } catch (error) {
//         toast.error(`Sorry, something went wrong: ${error.message}`);
//         setStatus("rejected");
//       }
//     };

//     fetchData();
//   }, [page, searchQuery]);


//   const handleFormSubmit = query => {
//     if (!query.trim()) {
//       toast.warning("Please enter a search query");
//       return;
//     }
//     setSearchQuery(query);
//     setPage(1);
//     setImages([]);
//     setStatus("pending");
//     setAlt(null);
//     setSelectedImage(null);
//     setError(null);
//   };

//   const handleSelectedImage = (largeImageUrl, tags) => {
//     setSelectedImage(largeImageUrl);
//     setAlt(tags);
//   };

//   const loadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//     setAlt(null);
//   };

//   const showLoadMoreButton = images.length > 0 && page < maxPageNumber;

// return (
//     <AppStyled>
//       <Searchbar onSubmit={handleFormSubmit} />
//       <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
//       {status === "pending" && <Loader />}
//       {status === "rejected" && <ErrorMessage message={error} />}
//       {status === "resolved" && (
//         <>
//           <ImageGallery images={images} onImageClick={handleSelectedImage} />
//           {selectedImage && (
//             <ImageModal
//               selectedImage={selectedImage}
//               tags={alt}
//               onClose={closeModal}
//             />
//           )}
//           {showLoadMoreButton && <LoadMoreBtn onClick={loadMore} />}
//         </>
//       )}
//     </AppStyled>
//   );
// };

// export default App;


const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  // const [status, setStatus] = useState("idle");
  const [totalHits, setTotalHits] = useState(0);
  const [maxPageNumber, setMaxPageNumber] = useState(0);
  const [error, setError] = useState(null);

  const [showBtn, setShowBtn] = useState(false);

  const galleryRef = useRef();

  useEffect(() => {
    handleScroll();
  }, [images]);
  
  const handleScroll = () => {
    if (!galleryRef.current) {
      return;
    }
      
    if (page > 1) {
      const dims = galleryRef.current.getBoundingClientRect();
      const y = dims.height * 3;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      // setStatus("pending");
      try {
        setIsLoading(true);
        setError(false);
        const { data, totalPages } = await FetchMaterials(searchQuery, page);
        // const imagesHits = imageData.results;
        // const totalImages = imageData.total_pages;
        // const totalPages = Math.ceil(totalImages / 12);

        setImages(prevImages => [...prevImages, ...data]);
        // setTotalHits(totalImages);
        setMaxPageNumber(totalPages);
        // setStatus("resolved");

        if (totalPages === 0) {
          toast.error("Sorry, there are no images matching your search query.");
        }
      } catch (error) {
        toast.error(`Sorry, something went wrong: ${error.message}`);
        // setStatus("rejected");
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
    // setStatus("pending");
    setAlt(null);
    setSelectedImage(null);
    setError(null);
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
      <ImageGallery
        ref={galleryRef}
        images={images}
        onImageClick={handleSelectedImage} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {showBtn && <LoadMoreBtn onLoadMoreBtn={handleLoadMore} />}
      {selectedImage && (
        <ImageModal
          selectedImage={selectedImage}
          tags={alt}
          onClose={closeModal}
        />
      )}
      {showLoadMoreButton && <LoadMoreBtn onClick={loadMore} />}
    </AppStyled>
  )
  
}

export default App;