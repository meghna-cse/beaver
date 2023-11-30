import React from 'react';
import {Container, Image} from 'react-bootstrap';

const HomeCarouselImage = ({ text, imagePath }) => {
    return (
        <>
            <Image
                className="d-block w-100"
                src={imagePath}
                alt={text}
                style={{ height: '500px' }}
            />
        </>
    );
};

export default HomeCarouselImage;
