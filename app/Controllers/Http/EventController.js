"use strict";

const Event = use("App/Models/Event");
const User = use("App/Models/User");

class EventController {
  async store({ request }) {
    const {
      type,
      date,
      title,
      description,
      location,
      url,
      user: user_id
    } = request.all();

    const event = await Event.create({
      type,
      date,
      title,
      description,
      location,
      url,
      user_id
    });

    const user = await User.query()
      .where("id", user_id)
      .with("events")
      .firstOrFail();

    const userJSON = user.toJSON();
    const points = userJSON.events.reduce(
      (total, { points }) => total + points,
      0
    );

    user.merge({ points });
    await user.save();

    return event;
  }

  async update({ params, request, response }) {}

  /**
   * Delete a event with id.
   * DELETE events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = EventController;
