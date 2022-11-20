import React from "react";
import NotFound from "./NotFound";

const PinInfo = ({ pinInfo, pinUserInfo }) => {
  if (!pinInfo) return <NotFound />;

  let description = pinInfo.infoDescription;
  let title = pinInfo.infoTitle;

  description = description.length !== 0 ? <p>{description}</p> : <></>;
  title = title.length !== 0 ? <p>{title}</p> : <></>;

  const time =
    pinInfo.infoDate === "Loading..."
      ? "Loading"
      : new Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(pinInfo.infoDate));

  let userProfile = <></>;
  // if (pinUserInfo.userName === undefined || pinUserInfo.userName === "") {
  //   userProfile = (
  //     <NavLink
  //       to={"/profile/" + pinUserInfo.uid}
  //       tabIndex="20"
  //       title={pinUserInfo.infoUsername + "'s profile"}
  //     >
  //       <img
  //         src={pinUserInfo.infoPhotoURL}
  //         alt={pinUserInfo.infoUsername + "'s profile"}
  //       ></img>
  //       <p>{pinUserInfo.infoUsername}</p>
  //     </NavLink>
  //   );
  // }

  const pinTags = pinInfo.tags.map((tag, index) => {
    return (
      <div key={index}>
        <p>{tag}</p>
      </div>
    );
  });

  return (
    <div>
      {title}
      {description}
      <div>
        {userProfile}
        <p>{time}</p>
      </div>
      <div>{pinTags}</div>
    </div>
  );
};

export default PinInfo;
