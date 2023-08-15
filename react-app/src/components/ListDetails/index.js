import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { useEffect } from "react";
import { thunkGetListDetails } from "../../store/list";

function ListDetails() {
    const {listId} = useParams();
    const list = useSelector(state => state.lists.SingleList)
    const dispatch = useDispatch();


    useEffect(() => {
        if(listId) dispatch(thunkGetListDetails(listId))
    }, [listId, dispatch])

    if(!list) return <Loading />


    return (
        <>
            <h1>{list.list_name}</h1>
        </>
    )
}

export default ListDetails;