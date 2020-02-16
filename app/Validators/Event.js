"use strict";

const Antl = use("Antl");

class Event {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      // validation rules
      type: "in:pr,dojo,participation,presentation|required",
      date: `required|date|before:${new Date()}`,
      title: "required|string",
      location: "required|string",
      description: "string",
      url: "url"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Event;
