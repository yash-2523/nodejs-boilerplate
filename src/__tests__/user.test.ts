import { connect, clearDatabase, closeDatabase } from "./db";
import { app } from "../app";
import { agent } from "supertest";

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

const request = agent(app);

describe("User registration / login", () => {
	let token = "";

	test("register new user", async () => {
		const res = await request.post("/api/user/register").send({
			firstName: "John",
			lastName: "Doe",
			email: "test@test.com",
			countryCode: 91,
			number: 1234567890,
			password: "12345678",
			isAdmin: true,
		});
		expect(res.status).toBe(200);
		expect(res.body.success).toBe(true);
		expect(res.body.message).toBe("Account has beed created successfully");
	});

	test("authenticated route blocking", async () => {
		const res = await request.get("/api/user");
		expect(res.status).toBe(401);
		expect(res.body.success).toBe(false);
		expect(res.body.message).toBe("Request is not authenticated");
	});

	test("login as new created user", async () => {
		const res = await request.post("/api/user/login").send({
			email: "test@test.com",
			password: "12345678",
		});
		expect(res.status).toBe(200);
		expect(res.body.success).toBe(true);
		expect(res.body.message).toBe("Login successful");
		token = res.body.token;
	});

	test("authenticated route accessing", async () => {
		const res = await request.get("/api/user").set("Authorization", `${token}`);
		expect(res.status).toBe(200);
		expect(res.body.success).toBe(true);
		expect(res.body.data.length).toBe(1);
	});
});
