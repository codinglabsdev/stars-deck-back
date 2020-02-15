"use strict";
const User = use("App/Models/User");

class SessionController {
  async store({ request, response, auth }) {
    const { username, password } = request.all();

    const data = await auth.withRefreshToken().attempt(username, password);
    const user = await User.findByOrFail("username", username);

    const userJSON = user.toJSON();
    const { token } = data;

    return response.json({
      token,
      username: userJSON.username
    });
  }
}

module.exports = SessionController;
