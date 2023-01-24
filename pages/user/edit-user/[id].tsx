import { useRouter } from "next/dist/client/router";
import React from "react";
import RegisterOrEditUser from "../../../modules/RegisterOrEditUser";

const EditUser = () => {

  const router = useRouter();
  const id = router.query.id as string;
  return (
    <RegisterOrEditUser edit={true} id={id} />
  )
}
export default EditUser;