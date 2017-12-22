const express = require('express');
const router = express.Router();
const CONSTANTS = require('../constants');

router.get('/revivebot', function (req, res, next) {

    console.log('req.user.username', req.user.username);

    /*    let bot = res.locals.bot;

        bot.on('ready', () => {
            res.render('dashboard', {message: 'Bot successfully restarted!'});
        });

        bot.login(CONSTANTS.BOT.TOKEN);
        res.render('dashboard', {message: 'Bot successfully restarted!'});*/

});

router.get('/sendmessage', function (req, res, next) {
    let bot = res.locals.bot;
    let channels = res.locals.guild.channels.array().filter(x => x.type === 'text');
    let users = res.locals.guild.members.array();

    res.render('sendmessage', {
        channels,
        users
    });
});

router.post('/sendmessage', async (req, res, next) => {
    let bot = res.locals.bot;
    let user = req.user;

    user = await bot.guilds.get(CONSTANTS.GUILD_ID).fetchMember(req.user.id);

    if (user.roles.has(CONSTANTS.ROLES.STAFF)) {
        let _msg = await bot.guilds.get(CONSTANTS.GUILD_ID).channels.get(req.body.channel).send(req.body.message);
        req.session[ 'message' ] = {
            text: 'Message sent',
            type: 'positive'
        };
    } else {
        req.session[ 'message' ] = {
            text: 'You don\'t have sufficient role to execute this command',
            type: 'negative'
        };
    }

    res.redirect('/dashboard');
});

module.exports = router;
