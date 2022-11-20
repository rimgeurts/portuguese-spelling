import React, { useState } from "react";
import qs from "qs";
import SpellingTest from "../../components/viewer/SpellingTest";
import {
  useGetQuizByIdQuery,
  useGetAllQuestionsForQuizQuery,
} from "../../redux/apis/strapi";
import { useRouter } from "next/router";
import {generateGetAllQuestionsQuery} from "../../components/util/generateGetAllQuestionsQuery";

function Quiz() {

  return (
    <>

      <SpellingTest  />
    </>
  );
}

export default Quiz;
