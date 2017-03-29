const DEV = {
              client: 'pg',
              // ElephantSQL Config
              // connection:'postgres://qvddfhyu:zyxUNHQzhz0Vd6J0lM@stampy.db.elephantsql.com:5432/qvddfhyu'
              connection: {
                  user: 'dev',
                  //password: 'letmein',
                  database: 'dev-todo-list'
              },
            };

module.exports = { DEV };