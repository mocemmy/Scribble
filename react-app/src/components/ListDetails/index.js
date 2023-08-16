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
  const user = useSelector((state) => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    if (listId) dispatch(thunkGetListDetails(listId));
  }, [listId, dispatch]);

  if (!list || !user) return <Loading />;
  let type;
  if(list.creator_id == user.id){
    type = 'OWNED'
  }

  return (
    <>
      <div className="list-info-container">
        <h1 className="list-name">{list.list_name}</h1>
        <p className="description">Created by {list.creator.first_name}</p>
        <p>{list.description}</p>
        {!list.books.length && <p>No books on this list yet</p>}
      </div>
      {!!list.books.length && list.books.map((book, idx) => (
        <ListBookDisplay key={book.id} book={book} num={idx} type={type} listId={listId} />
      ))}
    </>
  );
}

export default ListDetails;
