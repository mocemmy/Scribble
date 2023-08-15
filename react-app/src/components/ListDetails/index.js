import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { useEffect } from "react";
import { thunkGetListDetails } from "../../store/list";
import ListBookDisplay from "../ListBookDisplay";
import "./ListDetails.css";

function ListDetails() {
  const { listId } = useParams();
  const list = useSelector((state) => state.lists.SingleList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (listId) dispatch(thunkGetListDetails(listId));
  }, [listId, dispatch]);

  if (!list) return <Loading />;
  console.log(list)
  return (
    <>
      <div className="list-info-container">
        <h1 className="list-name">{list.list_name}</h1>
        <p className="description">Created by {list.creator.first_name}</p>
        <p>{list.description}</p>
      </div>
      {list.books.map((book, idx) => (
        <ListBookDisplay key={book.id} book={book} num={idx} />
      ))}
    </>
  );
}

export default ListDetails;
