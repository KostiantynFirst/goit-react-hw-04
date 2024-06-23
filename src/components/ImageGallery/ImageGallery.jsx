import { ImageGalleryStyled } from "./ImageGallery.styled";
import ImageCard from "../ImageCard/ImageCard" 

const ImageGallery = ({images, onImageClick }) => {
    return (
        <ImageGalleryStyled>
            {images.map(({id, webformatURL, tags, largeImageURL}) => (
                <ImageCard
                    key={id}
                    smallImg={webformatURL}
                    tags={tags}
                    onImageClick={() => onImageClick(largeImageURL, tags)}
                />
                
                
            ))}
        </ImageGalleryStyled>
    )
}

export default ImageGallery;