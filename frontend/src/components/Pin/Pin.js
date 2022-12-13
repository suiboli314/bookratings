import PropTypes from "prop-types";
import "./pin.css";

const Pin = ({ pin, width, height }) => {
  let title = pin.bookName;
  const authors = pin.authors;
  let description = pin.infoDescription;

  title = title ? <p className="font-medium">{title}</p> : <></>;

  const authorshtml = authors ? (
    <p className="text-sky-700 font-light text-sm">
      Author:{" "}
      <span className="font-serif text-sky-900 text-base">{authors}</span>
    </p>
  ) : (
    <></>
  );
  description = description ? (
    <p className="font-light">{description}</p>
  ) : (
    <></>
  );

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
        <div className="pin-p-desc">{authorshtml}</div>
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
