import PropTypes from "prop-types";
import NavBar from "../components/Navbar.js";

function BasePage({ children }) {
  return (
    <div className="BasePage">
      <NavBar></NavBar>
      <main>{children}</main>
      {/* <Footer></Footer> */}
    </div>
  );
}

// BasePage.propTypes = {
//   // https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };

export default BasePage;
