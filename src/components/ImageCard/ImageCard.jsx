import { ImageGalleryItemStyled, ImageGalleryItemImg } from "./ImageCard.styled"

const ImageCard = ( { photo, onImageClick } ) => {

  return (
    <ImageGalleryItemStyled key={photo.id} onClick={onImageClick}>
      <ImageGalleryItemImg src={photo.urls.small} alt={photo.alt_description} />
    </ImageGalleryItemStyled>
  )
}
 
export default ImageCard;