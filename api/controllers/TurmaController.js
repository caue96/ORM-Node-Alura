const database = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const Services = require('../services/Services')
const turmaServices = new Services('Turmas')

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
      const{ data_inicial, data_final } = req.query
      const where = {}
      data_inicial || data_final ? where.data_inicio = {} : null
      data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
      data_final ? where.data_inicio[Op.lte] = data_final : null
      try {
        const todasAsTurmas = await turmaServices.getAll({ where })
        return res.status(200).json(todasAsTurmas)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

/*     {
      where: {
        data_inicio: {
          [Op.gte]: data,
          [Op.lte]: data
    } */
}

module.exports = TurmaController