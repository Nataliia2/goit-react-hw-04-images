import PropTypes from 'prop-types';
import ImageGaleryItem from '../ImageGalleryItem/ImageGalleryItem';
import {Gallery} from './ImageList.style';

export default function ImageList({ items, onClick }) {
    return (
        <Gallery>
            {items.map(item => (
                <ImageGaleryItem 
                    key={item.id}
                    imageURL={item.webformatURL}
                    imageTitle={item.tags}
                    imageUrlLarge={item.largeImageURL}

                    onClickItem={onClick}
                />
            ))}
                </Gallery>
    )
}

ImageList.propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
  };
