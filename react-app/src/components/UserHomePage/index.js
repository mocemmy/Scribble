import { useHistory } from "react-router-dom";

function UserHomePage() {
    const history = useHistory();

    const handleCreateNewBook = () => {
        history.push('/app/create-book')
    }

  return (
    <>
        <button onClick={handleCreateNewBook}>Create New Book</button>
      <h1>User Home</h1>
    </>
  );
}

export default UserHomePage;
