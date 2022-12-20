import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { generateGetAllQuizzesQuery } from "../../components/util/generateGetAllQuestionsQuery";
import { useGetUserGroupsQuery } from "../../redux/apis/strapi";

function Index(props) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(generateGetAllQuizzesQuery(search));

  const {
    data: groups,
    error,
    isLoading,
  } = useGetUserGroupsQuery(undefined, { skip: !session });

  useEffect(() => {
    setQuery(generateGetAllQuizzesQuery(search));
  }, [search]);

  if (isLoading) {
    return <LoadingSpinner minHeight={"h-[80vh]"} />;
  }

  return <div className={"h-[80vh]"}></div>;
}

export default Index;
