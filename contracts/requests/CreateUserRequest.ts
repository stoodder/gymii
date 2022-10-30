export default interface CreateUserRequest {
	email: string;
	username: string;
	name: string;
	password: string;
	retypePassword?: string;
}
