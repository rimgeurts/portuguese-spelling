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
      populate: {
        answers: true,
        quiz: true,
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