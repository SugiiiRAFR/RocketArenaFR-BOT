// Déclarations
const { Client, Collection, Discord, MessageEmbed } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const fs = require("fs");

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Collection();


//
// Chargements de toutes les commandes sur les fichiers séparés dans le dossier "commands"

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // ne prend que les fichier finissant par .js

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log(`Commande chargée:  ${command.name}`);
}
//
// Quand le bot se lance

client.on('ready', () => {
  client.user.setActivity('cache-cache avec Plink');
  console.log(`Connecté entant que ${client.user.tag}!`);
  return avatar = client.user.displayAvatarURL();
});
//
// Reaction Add (pour le message des rôles)

client.on('messageReactionAdd', async (messageReaction, user) => {
  if (user.tag === "Rocket Arena France#3916") return;
  console.log("Reaction ajoutée dans le channel Roles: " + messageReaction.message.channel.name);
  msgReactSend = messageReaction.emoji.name; // .name  .id ?
  msgRoleRev = 'REV';
  msgRoleMystine = 'MYSTINE';
  msgRolePlink = 'PLINK';
  msgRoleKayi = 'KAYI';
  msgRoleBoo = 'BOONE';
  msgRoleIz = 'IZELL';
  msgRoleAmpho = 'AMPHORA';
  msgRoleBlast = 'BLASTBEARD';
  msgRoleJayto = 'JAYTO';
  msgRoleTopN = 'TOPNOTCH';
// PROBLEME DU CACHE, le bot ne prenait pas en compte les msg antierieurs à son reboot
  if (messageReaction.partial) {
    await messageReaction.fetch();
    return;
  }
//
  const member = await messageReaction.message.guild.members.fetch(user.id);  
  //pour pouvoir utiliser "member.roles.add(" et pas "messageReaction.message.guild.members.user.id.roles.add" ou un truc du style
  if (messageReaction.message.channel.name === '📘rôles') { 
    if (msgReactSend === msgRoleRev) {
      member.roles.add('725707707121926205'); 
      console.log("Rev reaction");
    } else if (msgReactSend === msgRoleMystine) {
      member.roles.add('725707649122828349');
    } else if (msgReactSend === msgRolePlink) {
      member.roles.add('725707674028867674'); 
    } else if (msgReactSend === msgRoleKayi) {
      member.roles.add('725707617678262342');
    } else if (msgReactSend === msgRoleBoo) {
      member.roles.add('725707456973635605');
    } else if (msgReactSend === msgRoleIz) {
      member.roles.add('725707545964183552');
    } else if (msgReactSend === msgRoleAmpho) {
      member.roles.add('725707277092388885');
    } else if (msgReactSend === msgRoleBlast) {
      member.roles.add('725707422022238238');
    } else if (msgReactSend === msgRoleJayto) {
      member.roles.add('725707583230443562');
    } else if (msgReactSend === msgRoleTopN) {
      member.roles.add('725707724569968692');
    } else if (msgReactSend === "🍹") {
      if (member.roles.cache.has("725706829677592688")) {
        member.roles.add('725706937542508544');
        member.roles.remove('725706829677592688');
      } else {
        member.roles.add('725706937542508544');
      }
    }
    else if (msgReactSend === "🏆") {
      if (member.roles.cache.has("725706937542508544")) {
        member.roles.add('725706829677592688');
        member.roles.remove('725706937542508544');
      }
      else {
        member.roles.add('725706829677592688');
      }
    }
    else {
      console.log("none reaction");
    }
  } else {
    console.log("Oupsi " + messageReaction.message.channel.id);
  }
})
// Reaction Remove (pour le message des rôles)
client.on('messageReactionRemove', async (messageReaction, user, message, channel) => {
  msgReactSend = messageReaction.emoji.name; // .name  .id ?
  msgRoleRev = 'REV';
  msgRoleMystine = 'MYSTINE';
  msgRolePlink = 'PLINK';
  msgRoleKayi = 'KAYI';
  msgRoleBoo = 'BOONE';
  msgRoleIz = 'IZELL';
  msgRoleAmpho = 'AMPHORA';
  msgRoleBlast = 'BLASTBEARD';
  msgRoleJayto = 'JAYTO';
  msgRoleTopN = 'TOPNOTCH';
  const member = await messageReaction.message.guild.members.fetch(user.id);
  if (user.tag === "Rocket Arena France#3916") return;
  if (messageReaction.message.channel.name === '📘rôles') {
    if (msgReactSend === msgRoleRev) {
      member.roles.remove('725707707121926205') // user.client.guildMemberAdd.roles.remove('697773381759664128')
    } else if (msgReactSend === msgRoleMystine) {
      member.roles.remove('725707649122828349')
    } else if (msgReactSend === msgRolePlink) {
      member.roles.remove('725707674028867674') // FAIT
    } else if (msgReactSend === msgRoleKayi) {
      member.roles.remove('725707617678262342')
    } else if (msgReactSend === msgRoleBoo) {
      member.roles.remove('725707456973635605')
    } else if (msgReactSend === msgRoleIz) {
      member.roles.remove('725707545964183552')
    } else if (msgReactSend === msgRoleAmpho) {
      member.roles.remove('725707277092388885')
    } else if (msgReactSend === msgRoleBlast) {
      member.roles.remove('725707422022238238')
    } else if (msgReactSend === msgRoleJayto) {
      member.roles.remove('725707583230443562')
    } else if (msgReactSend === msgRoleTopN) {
      member.roles.remove('725707724569968692') // // Détente / Tryhard
    } else if (msgReactSend === "🍹") {
      member.roles.remove('725706937542508544')
    } else if (msgReactSend === "🏆") {
      member.roles.remove('725706829677592688')
    } else {
      console.log("none reaction")
    }
  }
})
//
// Détecter l'event message envoyé

client.on('message', message => {
  //Sécurité pour empêcher l'auto-spam du bot (qu'il se compte pas)
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  // Détecter les commandes !<commande> et séparer chaque argument
  const args = message.content.slice(PREFIX.length).split(" ");      
  console.log(args);
  // En gros ca fait que le PREFIX est coupé (slice) de la commande "?report Tom" -> "report Tom"
  // Et le split va séparer chaque arg "?report Tom cheat" -> [report, Tom, cheat], ca en fait un "Array"
  const command = args.shift().toLowerCase();
  // shift permet d'isoler, "?RePoRt Tom cheat" -> "?report"
  console.log(command);

  if (!client.commands.has(command)) return; //Si le client n'as pas cette (command) dans sa collection
  client.commands.get(command).execute(client, message, args, avatar); //(toutes les propriétés dont on aura besoin)
});
//
// Détecter les messages envoyés dans le channel avec l'id <72547...> et y ajouter les réactions

client.on('message', message => {
  if (message.channel.id === "725474869600321589") {
    NvlleSuggestion = message.content
    console.log ('OK, idée: ' + NvlleSuggestion)
    message.react("👍")
    message.react("👎")
  }
});
//
// Ajouter le rôle automatique à chaque nouveau joueur

client.on("guildMemberAdd" ,(member) => {
  member.roles.add('725502528074022922');
  console.log("Le rôle Membre a été ajouté à " + member.guild.tag + " qui vient de nous rejoindre");
  const EmbedWelcome = new MessageEmbed()
    .setColor("#a88932")
    .setTitle("Bievenue sur Rocket Arena France !")
    .setDescription(`Merci de nous avoir rejoint, 
    pour s'assurer de tous passer un bon moment n'oublie pas de lire le **#🚨reglement** et d'aller choisir tes rôles dans le salon **#📘rôles**`)
    .setImage('https://i.imgur.com/zkv4lcB.png')
    .setFooter(`L'équie Rocket Arena France`, `https://i.imgur.com/GAzQEwY.png`)
    .setThumbnail('https://i.imgur.com/7UoKb2c.png')
  member.send(EmbedWelcome)
});
//
// Fin du code
client.login(TOKEN)