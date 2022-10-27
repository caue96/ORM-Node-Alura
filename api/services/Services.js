const database = require('../models')

class Services {
    constructor(modelName) {
        this.modelName = modelName
    }

    async getAll() {
        return database[this.modelName].findAll()
    }

    async getById(id) {
        return database[this.modelName].findOne({ where: { id: Number(id) } })
    }

    async create(data) {
        return database[this.modelName].create(data)
    }

    async update(id, data, transacao = {}) {
        await database[this.modelName].update(data, { where: { id: id } }, transacao)
    }

    async updates(where, data, transacao = {}) {
        await database[this.modelName].update(data, { where: { ...where } }, transacao)
    }


    async delete(id) {
        return database[this.modelName].destroy({ where: { id: Number(id) } })
    }
}

module.exports = Services