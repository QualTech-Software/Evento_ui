import React, { useState } from "react";
import "../Components/Account/Create.css";
import { useNavigate } from "react-router-dom";
import LeftContainer from "../modules/common/LeftContainer";
import RightContainer from "../modules/login/pages/RightContainer";
import { MainCont } from "../modules/create/components/atoms";
import axios from "axios";

const Create = () => (
  <MainCont className="qt-create qt-account-main-container">
    <LeftContainer />
    <RightContainer />
  </MainCont>
);
export default Create;
