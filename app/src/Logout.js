import React from "react";
import { useHistory } from "react-router-dom";

const Logout = async () => {
  const history = useHistory()

  return (
    history.push("/")
  )
}

export default Logout;