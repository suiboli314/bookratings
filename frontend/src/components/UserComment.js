import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context.js";
import UserService from "../services/user.service.js";
import Alert from "./Alert.js";
import List from "./List.js";
import ListItem from "./ListItem.js";

const UserComment = () => {
  const [UserCommentvalue, setUserComment] = useState([]);
  const [timestamp, setTime] = useState(new Date());
  const { state } = useContext(Context);

  const [alertHidden, setAlertHidden] = useState(true);
  const [alertState, setAlertState] = useState({
    color: "pink-400",
    msg: "",
  });

  useEffect(() => {
    try {
      UserService.getuserallreview(state.user.userName, setUserComment);
    } catch (err) {
      console.log(err.message);
      setAlertHidden(false);
      setAlertState({
        color: "pink-500",
        msg: err.message || "Failed to load reviews",
      });
    }
  }, [state.user.userName, timestamp]);

  return (
    <>
      <div className="left-1 divide-y divide-slate-100">
        {!alertHidden ? (
          <Alert
            color={alertState.color}
            msg={alertState.msg}
            alertHidden={alertHidden}
            setAlertHidden={setAlertHidden}
          />
        ) : null}
        <List>
          {UserCommentvalue.map((book) => (
            <ListItem
              key={book._id}
              book={book}
              userName={state.user.userName}
              setTime={setTime}
            />
          ))}
        </List>
      </div>
    </>
  );
};

UserComment.propTypes = {};

export default UserComment;
