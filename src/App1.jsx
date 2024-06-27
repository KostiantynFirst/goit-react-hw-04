export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState({});
  const [showBtn, setShowBtn] = useState(false);

  const galleryRef = useRef();

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    handleScroll();
  }, [images]);

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const { data, totalPages } = await fetchImages(query, page);

        setImages(prevImages => {
          return [...prevImages, ...data];
        });
        setShowBtn(totalPages && totalPages !== page);
      } catch (e) {
        setError(true);
        setShowBtn(false);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [page, query]);

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

  const handleSearch = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
    if (value.trim() === '') {
      setShowBtn(false);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = data => {
    setIsOpen(true);
    setSelectedImg(data);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery
          ref={galleryRef}
          handleClick={openModal}
          images={images}
        />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {showBtn && <LoadMoreBtn onLoadMoreBtn={handleLoadMore} />}
      {selectedImg.urls && (
        <ImageModal
          imageData={selectedImg}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}