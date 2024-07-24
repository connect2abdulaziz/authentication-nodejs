'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'post',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comment');
  }
};