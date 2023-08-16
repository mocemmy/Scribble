import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateList, thunkEditList, thunkGetListDetails } from "../../store/list";

function ListForm({ type }) {
  const user = useSelector((state) => state.session.user);
  const { listId } = useParams();
  const list = useSelector((state) => state.lists.SingleList);
  const [list_name, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [charactersLeft, setCharactersLeft] = useState(255);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (listId) dispatch(thunkGetListDetails(listId));
  }, [dispatch, listId]);

  useEffect(() => {
    if (listId && list) {
      setListName(list.list_name);
      setDescription(list.description);
    }
  }, [list]);

  useEffect(() => {
    const validationErrors = {};
    if (!list_name.length) validationErrors.list_name = "List name is required";
    if (list_name.length > 50)
      validationErrors.list_name =
        "List name must be shorter than 50 characters";
    if (description.length > 255)
      validationErrors.description =
        "List description must be shorter than 255 characters";

    setErrors(validationErrors);
  }, [description, list_name]);

  const handleCancel = () => {
    history.push("/app/user");
  };

  const handleText = (e) => {
    const currDescription = e.target.value;
    const characterCount = currDescription.length;
    setCharactersLeft(255 - characterCount);
    setDescription(currDescription);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (!Object.keys(errors).length) {
      const data = {
        creator_id: user.id,
        list_name,
        description,
      };
      let response;
      if (type === "CREATE") {
        response = await dispatch(thunkCreateList(data));
      } else {
        response = await dispatch(thunkEditList(data, listId))
      }
      if (response.id) {
        history.push("/app/user");
      } else {
        setErrors({ serverErrors: response });
      }
    }
  };

  let title, buttonText;
  if (type === "CREATE") {
    title = "Create a List";
    buttonText = "Create List";
  } else {
    title = "Edit List";
    buttonText = "Save";
  }
  return (
    <div className="book-form-container">
      <form className="book-form">
        <h1 className="form-label">{title}</h1>
        {errors.serverErrors && <p className="errors">{errors.serverErrors}</p>}
        <label htmlFor="list-name">List name</label>
        {hasSubmitted && errors.list_name && (
          <p className="errors">{errors.list_name}</p>
        )}
        <input
          name="list-name"
          type="text"
          value={list_name}
          onChange={(e) => setListName(e.target.value)}
        />
        <label htmlFor="description">
          List description{" "}
          {charactersLeft >= 0 && charactersLeft < 255 && (
            <span className="character-count">{charactersLeft}</span>
          )}
          {charactersLeft < 0 && (
            <span className="character-count-errors">{charactersLeft}</span>
          )}
        </label>
        {hasSubmitted && errors.description && (
          <p className="errors">{errors.description}</p>
        )}
        <textarea
          name="description"
          value={description}
          onChange={handleText}
        />
        <div className="button-container">
          <button
            className="submit-button cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="submit-button"
            type="submit"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListForm;
