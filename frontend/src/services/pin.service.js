export const getAllBooks = async (setBookList) => {
  const res = await fetch("/api/getallbooks", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    // show empty
    return { "respons": res.ok };
  }
  let books = await res.json();
  setBookList(books);
};
