import { ImageGalleryItemStyled, ImageGalleryItemImg } from "./ImageCard.styled"

const ImageCard = ( {tags, smallImg, onImageClick} ) => {

  return (
    <ImageGalleryItemStyled onClick={onImageClick}>
      <ImageGalleryItemImg src={smallImg} alt={tags} />
    </ImageGalleryItemStyled>
  )
}
 
export default ImageCard;