import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context.js";
import UserService from "../services/user.service.js";
import List from "./List.js";
import ListItem from "./ListItem.js";
const UserComment = () => {
  const [UserCommentvalue, setUserComment] = useState([]);
  const { state } = useContext(Context);

  useEffect(() => {
    try {
      UserService.getuserallreview(state.user.userName, setUserComment);
    } catch (err) {
      console.log(err);
    }
  }, [state.user.userName]);

  return (
    <>
      <div className="left-1 divide-y divide-slate-100">
        <List>
          {UserCommentvalue.map((book) => (
            <ListItem key={book._id} book={book} />
          ))}
        </List>
      </div>
    </>
  );
};
export default UserComment;
