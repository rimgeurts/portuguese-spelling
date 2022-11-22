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
                translate_to: true
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
