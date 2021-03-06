/* eslint-disable */
// @ts-nocheck
const Command = require('../bot/Command');
const CONSTANTS = require('../constants');

module.exports = class crash extends Command {
  constructor(client) {
    super(client, {
      name: 'crash',
      description: 'Simply crash the bot',
      examples: ['crash'],
      permissions: {
        roles: [CONSTANTS.ROLES.STAFF],
        channels: [CONSTANTS.CHANNELS.ANY],
      },
      extraArgs: false,
      deleteCmd: true,
      args: [],
    });
  }

  run(msg, { user }) {
    this.client.disconnect();
  }
};
