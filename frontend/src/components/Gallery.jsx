import Masonry from "react-masonry-component";

export default function Gallery({ allPins }) {
  const masonryOptions = {
    transitionDuration: "0.25s",
    fitWidth: true,
  };

  return (
    <>
      <Masonry
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
      >
        {allPins}
      </Masonry>
    </>
  );
}
