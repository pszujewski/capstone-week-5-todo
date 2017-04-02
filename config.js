const DEV = {
	client: 'pg',
	// ElephantSQL Config
	connection: process.env.DATABASE_URL 
	//'postgres://<usernamegoeshere>:<passwordgoeshere>@localhost/todo-app'
	// Local postgresql server connection Config
	/*connection: {
		user: 'dev',
		password: 'letmein',
		database: 'dev-todo-list'
	},*/
};

module.exports = { DEV };