import constants from './constants';

export const genericError = (err, message, args, from, Pattern, result) => {
  const text = `Uncaught error!

\`${err.message}\`

Content of the message:
\`${message.content}\`
`;

  if (process.env.NODE_ENV === 'production') {
    return message.guild.channels.cache.get(constants.CHANNELS.EVENTS).send(text);
  }
};