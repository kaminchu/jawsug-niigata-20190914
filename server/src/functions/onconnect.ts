import * as AWS from "aws-sdk";
import { APIGatewayEvent } from 'aws-lambda';
const DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

const tableName = process.env.TABLE ? process.env.TABLE : "";

export const onconnect = (event: APIGatewayEvent, _: any, callback: any) => {
  const putParams = {
    TableName: tableName,
    Item: {
      id: { S: event.requestContext.connectionId }
    }
  };

  DDB.putItem(putParams, (err) => {
    callback(null, {
      statusCode: err ? 500 : 200,
      body: err ? "Failed to connect: " + JSON.stringify(err) : "Connected."
    });
  });
}
