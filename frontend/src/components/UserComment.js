import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context.js";
import UserService from "../services/user.service.js";
import List from "./List.js";
import ListItem from "./ListItem.js";
const UserComment = () => {
  const [UserCommentvalue, setUserComment] = useState([]);
  const { state } = useContext(Context);
  useEffect(() => {
    UserService.getuserallreview(state.user.userName)
      .then((res) => {
        console.log(res);
        setUserComment(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  console.log(UserCommentvalue);
  return (
    <>
      <section>
        <div className="left-1 divide-y divide-slate-100">
          <List>
            {UserCommentvalue.map((book) => (
              <ListItem
                key={book._id}
                book={book}
                userName={state.user.userName}
              />
            ))}
          </List>
        </div>
      </section>
    </>
  );
};

UserComment.propTypes = {};

export default UserComment;
