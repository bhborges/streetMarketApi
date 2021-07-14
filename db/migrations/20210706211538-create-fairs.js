'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fairs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      long: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.STRING,
      },
      setcens: {
        type: Sequelize.STRING,
      },
      areap: {
        type: Sequelize.STRING,
      },
      coddist: {
        type: Sequelize.STRING,
      },
      distrito: {
        type: Sequelize.STRING,
      },
      codsubpref: {
        type: Sequelize.STRING,
      },
      subprefe: {
        type: Sequelize.STRING,
      },
      regiao5: {
        type: Sequelize.STRING,
      },
      regiao8: {
        type: Sequelize.STRING,
      },
      nomeFeira: {
        field: 'nome_feira',
        type: Sequelize.STRING,
      },
      registro: {
        type: Sequelize.STRING,
      },
      logradouro: {
        type: Sequelize.STRING,
      },
      numero: {
        type: Sequelize.STRING,
      },
      bairro: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('fairs');
  },
};
