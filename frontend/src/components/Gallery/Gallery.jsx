import Masonry from "react-masonry-component";
import PropTypes from "prop-types";

export default function Gallery({ allPins }) {
  const masonryOptions = {
    transitionDuration: "0.25s",
    fitWidth: true,
  };

  return (
    <Masonry
      options={masonryOptions}
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}
      className="relative flex flex-col items-center w-full"
    >
      {allPins}
    </Masonry>
  );
}

Gallery.propTypes = {
  allPins: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
