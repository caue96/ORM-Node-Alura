const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.Matriculas = new Services('Matriculas')
    }

    async pegaRegistrosAtivos(where = {}) {
        return database[this.modelName].findAll({ where: { ...where } })
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.modelName].scope('todos').findAll({ where: { ...where } })
    }

    async cancelaPessoaEMatriculas(estudanteId) {
        return database.sequelize.transaction(async transacao => {
            await super.update({ ativo: false }, estudanteId, { transaction: transacao })
            await this.Matriculas.updates({ status: 'cancelado' }, {estudante_id: estudanteId}, { transaction: transacao})
        })
    }
}

module.exports = PessoasServices