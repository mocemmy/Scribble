import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loading from "../../UtiltyComponents/Loading";
import { thunkGetListDetails } from "../../../store/list";
import ListBookDisplay from "../../ListComponents/ListBookDisplay";
import OpenModalButton from "../../OpenModalButton";
import { thunkDeleteList } from "../../../store/list";
import ConfirmModal from "../../UtiltyComponents/ConfirmModal";
import "./ListDetails.css";

function ListDetails() {
  const { listId } = useParams();
  const list = useSelector((state) => state.lists.SingleList);
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (listId) dispatch(thunkGetListDetails(listId));
  }, [listId, dispatch]);

  if (!list || !user) return <Loading />;
  let type;
  if (list.creator_id === user.id) {
    type = "OWNED";
  }

  const handleEditList = () => {
    history.push(`/app/lists/${list.id}/edit`);
  };

  const handleDeleteList = () => {
    dispatch(thunkDeleteList(list.id));
  };

  return (
    <>
      <div className="list-header-container">
        <div className="list-info-container">
          <h1 className="list-name">{list.list_name}</h1>
          <p className="description">Created by {list.creator.first_name}</p>
          <p>{list.description}</p>
          {!list.books.length && <p>No books on this list yet</p>}
        </div>
        <div className="options-container">
          {type === "OWNED" && (
            <button onClick={handleEditList}>Edit list</button>
          )}
          {type === "OWNED" && (
            <OpenModalButton
              className="button-as-link"
              buttonText={"Delete list"}
              modalComponent={
                <ConfirmModal
                  modalTitle="Are you sure you want to delete your list?"
                  yesHandler={handleDeleteList}
                />
              }
            />
          )}
        </div>
      </div>
      {!!list.books.length &&
        list.books.map((book, idx) => (
          <ListBookDisplay
            key={book.id}
            book={book}
            num={idx}
            type={type}
            listId={listId}
          />
        ))}
    </>
  );
}

export default ListDetails;
