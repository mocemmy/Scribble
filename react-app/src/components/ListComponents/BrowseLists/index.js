import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../UtiltyComponents/Loading";
import { thunkGetAllLists } from "../../../store/list";
import ListDisplay from "../../ListComponents/ListDisplay";
import './BrowseLists.css'

function BrowseLists() {
    const lists = useSelector(state => state.lists.AllLists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllLists())
    }, [dispatch])

    if(!lists) return <Loading />
    const listArr = Object.values(lists)

    return (
        <div className="list-container">
            <h1>Listopia</h1>
            {listArr.map(list => (
                <ListDisplay list={list} key={list.id} />
            ))}
        </div>
    )
}

export default BrowseLists;