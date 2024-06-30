import { ImageGalleryItemStyled, ImageGalleryItemImg } from "./ImageCard.styled"

const ImageCard = ( { photo, onImageClick } ) => {

  return (
    <ImageGalleryItemStyled key={photo.id}>
      <ImageGalleryItemImg src={photo.urls.small} alt={photo.alt_description} onClick={onImageClick} />
    </ImageGalleryItemStyled>
  )
}
 
export default ImageCard;