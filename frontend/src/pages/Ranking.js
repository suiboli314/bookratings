import { useState, useEffect } from "react";

import logo from "../assets/logo.png";

import Gallery from "../components/Gallery/Gallery.jsx";
import Pin from "../components/Pin/Pin.js";
import BasePage from "./BasePage.js";

import { getAllBooks } from "../services/pin.service.js";

function Ranking() {
  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);
  const [books, setBookList] = useState([]);

  window.document.title = "Book Ranking";

  useEffect(() => {
    window.addEventListener("resize", setDevice);

    function setDevice() {
      setDeviceWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    getAllBooks(setBookList);
  }, []);

  function setPinDimension(width = 200, height) {
    let pinWidth = 250;
    if (deviceWidth <= 650) pinWidth = deviceWidth / 2 - 20;
    let pinWidthPerc = (pinWidth * 100) / width;
    let pinHeight = (height * pinWidthPerc) / 100;
    pinWidth = pinWidth + "px";
    pinHeight = pinHeight + "px";
    return [pinWidth, pinHeight];
  }

  const allPins = books.map((pin, index) => {
    const [pinWidth, pinHeight] = setPinDimension(pin.width, pin.height);

    return <Pin pin={pin} width={pinWidth} height={pinHeight} key={index} />;
  });

  return (
    <BasePage>
      <div className="grid justify-center">
        <h1>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Logo" />
        </h1>
        <Gallery allPins={allPins}></Gallery>
      </div>
    </BasePage>
  );
}

Ranking.propTypes = {};

export default Ranking;
