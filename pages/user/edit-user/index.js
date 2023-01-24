import { Router, useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import RegisterOrEditUser from "../../../modules/RegisterOrEditUser";
import { getCurrentUser } from "../../../redux-modules/User/userSlices";

const EditUser = () => {
  const currentUser = useSelector(getCurrentUser);
  console.log('currentUser :>> ', currentUser);
  const router = useRouter();
  // if (!currentUser?._id) {
  //   router.push('/');
  // }
  if (currentUser?._id) {
    return (
      <RegisterOrEditUser edit={true} id={currentUser._id} />
    )
  } else {
    return router.push('/');
  }

}
export default EditUser;