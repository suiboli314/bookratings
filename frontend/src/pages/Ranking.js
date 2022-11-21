import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Gallery from "../components/Gallery.jsx";
import { getAllBooks } from "../services/pin.service.js";
import BasePage from "./BasePage.js";

function Ranking() {
  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);
  const [books, setBookList] = useState([]);

  window.document.title = "Book Ranking";

  useEffect(() => {
    window.addEventListener("resize", setDeviceWidth(window.screen.width));
  }, []);

  useEffect(() => {
    getAllBooks(setBookList);
  }, []);

  function setPinDimension(width, height) {
    let cardWidth = 250;
    if (deviceWidth <= 650) cardWidth = deviceWidth / 2 - 16;
    let cardWidthPerc = (cardWidth * 100) / width;
    let cardHeight = (height * cardWidthPerc) / 100;

    cardWidth = cardWidth + "px";
    cardHeight = cardHeight + "px";
    return [cardWidth, cardHeight];
  }

  const allPins = //<></>;
    books.map((card) => {
      const href =
        window.location.pathname.slice(0, 5) === "/card"
          ? card.id
          : "card/" + card.id;

      const [cardWidth, cardHeight] = setPinDimension(card.width, card.height);

      const imgAltText =
        card.bookName + " | " + card.userName + "'s card - " + card.id;
      return (

          <div key={card.bookName} style={{ width: cardWidth }}>
            {/* <NavLink to={"" + href} title={card.userName + "'s card"}> */}
            {/* <img
              src={card.fileURL}
              alt={imgAltText}
              style={{ minHeight: cardHeight, minWidth: cardWidth }}
            /> */}
            <div>
              {/* <img src={card.infoPhotoURL} alt={ imgAltText} /> */}
              <p>{card.bookName}</p>
            </div>
            {/* </NavLink> */}
          </div>

      );
    });

  console.log(allPins);
  return (
    <BasePage>
      <Gallery allPins={allPins}></Gallery>
    </BasePage>
  );
}

export default Ranking;
