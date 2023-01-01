import qs from "qs";

export function generateGetAllQuestionsQuery(quizId, pageNumber) {
  return qs.stringify(
    {
      filters: {
        quiz: {
          id: {
            $eq: quizId,
          },
        },
      },
      sort: ["id"],
      populate: {
        answers: true,
        quiz: {
          populate: {
            translate_to: true,
          },
        },
      },
      pagination: {
        page: pageNumber,
        pageSize: 1,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
}

export function generateGetAllQuizzesQuery(title, pageNumber) {
  return qs.stringify(
    {
      filters: {
        title: {
          $containsi: title,
        },
      },
      sort: ["id"],
      populate: {
        answers: true,
        quiz: {
          populate: {
            translate_to: true,
          },
        },
      },
      pagination: {
        page: pageNumber,
        pageSize: 7,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
}
