import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamoClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.queryStringParameters;

  console.log(user_id);
  if (!user_id)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "user_id is required" }),
    };

  const todos = await document
    .query({
      TableName: "todo",
      KeyConditionExpression: "user_id = :id",
      ExpressionAttributeValues: {
        ":id": user_id,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(todos),
  };
};
