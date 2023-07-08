import { useSelector } from "react-redux/";
import SpotForm from "../SpotForm";

const CreateSpot = () => {

  const user = useSelector((state) =>
    state.session.user ? state.session.user : null
  );

  if (user) {
    return (
      <SpotForm
        formType="Create Spot"
      />
    )
  } else {
    return <h1>You need to be logged in to do that.</h1>
  }
};

export default CreateSpot;
