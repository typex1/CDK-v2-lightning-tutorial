"use strict"
const AWS = require("aws-sdk");
exports.handler = async () => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: "users",
        Key: {
            uid: "12345"
    }
};

try{
        const data = await documentClient.get(params).promise();
        console.log('######### RESULT: ######################')
        console.log(data);
        console.log('########################################')
    }catch(err){
        console.log(err);
    }
};
