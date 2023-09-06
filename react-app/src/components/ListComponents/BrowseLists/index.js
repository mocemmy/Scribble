import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../UtiltyComponents/Loading";
import { thunkGetAllLists } from "../../../store/list";
import ListDisplay from "../../ListComponents/ListDisplay";
import "./BrowseLists.css";
import ReactPaginate from 'react-paginate';


function BrowseLists() {
  const lists = useSelector((state) => state.lists.AllLists);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const listsPerPage = 5;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllLists());
  }, [dispatch]);

  useEffect(() => {
    if (lists) {
      const listsArr = Object.values(lists).reverse();
      setTotalPages(Math.ceil(listsArr.length / listsPerPage));
    }
  }, [lists]);

  if (!lists) return <Loading />;
  const listArr = Object.values(lists).reverse();
  const handlePageChange = (selectedPage) => {
    setCurrPage(selectedPage.selected);
  };

  const startIndex = currPage * listsPerPage;
  const endIndex = startIndex + listsPerPage;
  const subset = listArr.slice(startIndex, endIndex);

  return (
    <>
      <div className="list-container">
        <p className="author-name">Showing {startIndex + 1} - {endIndex} of {listArr.length} results</p>
        <h1>Listopia</h1>
        {subset.map((list) => (
          <ListDisplay list={list} key={list.id} />
        ))}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currPage}
        />
      </div>
    </>
  );
}

export default BrowseLists;
