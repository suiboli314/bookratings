const getuserallreview = async (userName, setUserComment) => {
  const res = await fetch(`/api/getuserallreview`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: userName }),
  });
  if (!res.ok)
    // show empty
    return { response: res.ok };

  let comments = await res.json();
  setUserComment(comments);
};

const UserService = { getuserallreview };

export default UserService;
