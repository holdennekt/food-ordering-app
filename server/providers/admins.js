const { Admin } = require("../models/db");

class AdminsProvider {
  async getOneByName(name) {
    return Admin.findOne({ where: { name } });
  }

  async getOneById(id) {
    return Admin.findByPk(id);
  }

  async create(name, password) {
    return Admin.create({ name, password });
  }
}

module.exports = { adminsProvider: new AdminsProvider() };
