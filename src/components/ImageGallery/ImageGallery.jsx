import { ImageGalleryStyled } from "./ImageGallery.styled";
import ImageCard from "../ImageCard/ImageCard";
import { forwardRef } from 'react';

const ImageGallery = forwardRef(({ images, onImageClick }, ref) => {
    return (
        <ImageGalleryStyled ref={ref}>
            {images.map((photo) => (
                <ImageCard
                    key={photo.id}
                    photo={photo}
                    onImageClick={() => onImageClick(photo.urls.regular, photo.alt_description)}
                />
                
            ))}
        </ImageGalleryStyled>
    )
});

export default ImageGallery;