import PropTypes from "prop-types";

export default function List({ children }) {
  return <ul className="left-1 divide-y divide-slate-100">{children}</ul>;
}

List.propTypes = {
  children: PropTypes.object.isRequired,
};
