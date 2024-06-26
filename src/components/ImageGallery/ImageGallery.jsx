import { ImageGalleryStyled } from "./ImageGallery.styled";
import ImageCard from "../ImageCard/ImageCard" 

const ImageGallery = ({images, onImageClick }) => {
    return (
        <ImageGalleryStyled>
            {images.map((photo) => (
                <ImageCard
                    photo={photo}
                    onImageClick={() => onImageClick(photo.urls.regular, photo.alt_description)}
                />
                
            ))}
        </ImageGalleryStyled>
    )
}

export default ImageGallery;