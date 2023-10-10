import { lambdaHandler } from "../index.js";
export default function handler(req, res) {
    console.log("in cloud function handler!!!!!!!!!!!!!!!!!!!");
    console.log("req.query ", req.query);
    console.log("req.body ", req.body);
    var event = {
        queryStringParameters: req.query,
        body: req.body,
    };
    console.log("--------------------");
    console.log(event);
    console.log("*****************lambdaHandler***************");
    console.log(lambdaHandler);
    console.log("calling handler");
    res.send("Hello");
}
