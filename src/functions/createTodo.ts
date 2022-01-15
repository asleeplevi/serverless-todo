import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidV4 } from "uuid";
import { document } from "../utils/dynamoClient";

interface RequestProps {
  user_id: string;
  title: string;
  deadline: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id, title, deadline } = JSON.parse(event.body) as RequestProps;

  await document
    .put({
      TableName: "todo",
      Item: {
        id: uuidV4(),
        user_id,
        title,
        done: false,
        deadline: new Date(deadline),
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "To-do created with success!",
    }),
  };
};
