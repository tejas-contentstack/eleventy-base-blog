import handler from "../index.js";
export default function launchFunction(req: any, res: any) {
	console.log("hi");
	const event: any = {
		queryStringParameters: req.query,
		body: req.body,
	};
	console.log("--------------------");
	console.log(event);
	console.log("calling handler");
	res.send("Hello");
}
