import PropTypes from "prop-types";
import "./pin.css";

const Pin = ({ pin, width, height }) => {
  let title = pin.bookName;
  let authors = pin.authors;
  let description = pin.infoDescription;

  title = title ? <p>{title}</p> : <></>;
  authors = authors ? (
    <p>
      Author: <br /> {authors}
    </p>
  ) : (
    <></>
  );
  description = description ? <p>{description}</p> : <></>;

  return (
    <div
      className="pin-p pin-gutter"
      key={title + " by " + authors}
      style={{
        minHeight: pin.fileURL ? "auto" : height,
        width: width,
      }}
    >
      <div className="pin-link">
        <span className="pin-p-desc">
          {title}
          {description}
        </span>
      </div>
      <div className="pin-link">
        <div className="pin-p-desc text-sky-400">{authors}</div>
      </div>
    </div>
  );
};

Pin.propTypes = {
  pin: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default Pin;
