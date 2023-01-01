import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUI, updateUIState } from "../../../redux/slices/uiSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pagination({ pagination }) {
  const dispatch = useDispatch();
  const [pages, setPages] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const { myQuizzesSearch, myQuizzesCurrentPage } = useSelector(selectUI);

  useEffect(() => {
    if (!pagination) {
      return;
    }

    const pageArray = Array.from({ length: pagination?.pageCount }, (v, i) => {
      const pageId = i + 1;
      return {
        id: pageId,
        current: pageId === myQuizzesCurrentPage ? true : false,
      };
    });
    setIsLastPage(myQuizzesCurrentPage === pagination?.pageCount);
    setIsFirstPage(myQuizzesCurrentPage === 1);
    return setPages(pageArray);
  }, [pagination]);

  const onClickPage = (selectedPage) => {
    dispatch(updateUIState({ myQuizzesCurrentPage: selectedPage.id }));
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 my-4 sm:px-0 ">
      <div className="-mt-px flex w-0 flex-1">
        <a
          onClick={() => {
            !isFirstPage &&
              dispatch(
                updateUIState({
                  myQuizzesCurrentPage: myQuizzesCurrentPage - 1,
                })
              );
          }}
          href="components/dashboard#"
          className={classNames(
            isFirstPage
              ? "text-gray-200"
              : "text-gray-500 hover:border-gray-300 hover:text-gray-700",
            "inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium  "
          )}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 " aria-hidden="true" />
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pagination?.pageCount < 7 &&
          pages?.map((page) => {
            return (
              <div
                onClick={() => onClickPage(page)}
                key={page.id}
                className={classNames(
                  page.current
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
                // className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                {page.id}
              </div>
            );
          })}
        {pages.length > 0 && pagination?.pageCount >= 7 && (
          <>
            <div
              onClick={() => onClickPage(pages[0])}
              key={pages[0].id}
              className={classNames(
                pages[0].current
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              )}
              // className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {pages[0].id}
            </div>
            <div
              onClick={() => onClickPage(pages[1])}
              key={pages[1].id}
              className={classNames(
                pages[1].current
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              )}
              // className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {pages[1].id}
            </div>
            <div
              onClick={() => onClickPage(pages[2])}
              key={pages[2].id}
              className={classNames(
                pages[2].current
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              )}
              // className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {pages[2].id}
            </div>

            <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
              ...
            </span>
            <div
              onClick={() => onClickPage(pages[pages?.length - 3])}
              key={pages[pages?.length - 3].id}
              className={classNames(
                pages[pages?.length - 3].current
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              )}
              // className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {pages[pages?.length - 3].id}
            </div>
            <div
              onClick={() => onClickPage(pages[pages?.length - 2])}
              key={pages[pages?.length - 2].id}
              className={classNames(
                pages[pages?.length - 2].current
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              )}
              // className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {pages[pages?.length - 2].id}
            </div>
            <div
              onClick={() => onClickPage(pages[pages?.length - 1])}
              key={pages[pages?.length - 1].id}
              className={classNames(
                pages[pages?.length - 1].current
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              )}
              // className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {pages[pages?.length - 1].id}
            </div>
          </>
        )}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <a
          onClick={() => {
            !isLastPage &&
              dispatch(
                updateUIState({
                  myQuizzesCurrentPage: myQuizzesCurrentPage + 1,
                })
              );
          }}
          href="components/dashboard#"
          className={classNames(
            isLastPage
              ? "text-gray-200"
              : "text-gray-500 hover:border-gray-300 hover:text-gray-700",
            "inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium  "
          )}
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 " aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
