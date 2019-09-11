import * as AWS from "aws-sdk";
import { APIGatewayEvent } from 'aws-lambda';
const DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

const tableName = process.env.TABLE ? process.env.TABLE : "";

export const ondisconnect = (event: APIGatewayEvent, _: any, callback: any) => {
  const deleteParams = {
    TableName: tableName,
    Key: {
      id: { S: event.requestContext.connectionId }
    }
  };

  DDB.deleteItem(deleteParams, err =>  {
    callback(null, {
      statusCode: err ? 500 : 200,
      body: err ? "Failed to connect: " + JSON.stringify(err) : "Connected."
    });
  });
}

