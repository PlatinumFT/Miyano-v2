module.exports = client => {
    console.log(`${client.user.username} has started`);
    require('../util/commandsLoader.js')(client);    
}