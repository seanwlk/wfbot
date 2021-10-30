module.exports.classToEmoji = {
  Rifleman: "<:rifle:531552785615814674>",
  Engineer: "<:engineer:531552621018742805>",
  Medic: "<:medic:531552757438480404>",
  Recon: "<:sniper:531552855568678915>",
  Sniper: "<:sniper:531552855568678915>",
  Heavy: "<:sniper:531552855568678915>",
  SED: "<:sniper:531552855568678915>",
}

module.exports.currencyEmoji = {
  wfd: "<:wd:756805727716114472>",
  k: "<:kr:756805727691079710>",
  crowns: "<:cr:756805727711920180>"
}

module.exports.secToHMS = function secToHMS(seconds) {
  var days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  var hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
module.exports.groupBy = key => array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue, [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }), {}
  );
module.exports.clanRole = function clanRole(role) {
  if (role === "MASTER") return "<:ma:504639597461110785>"
  else if (role === "OFFICER") return "<:of:504639639324196882>"
  else return " - "
}
module.exports.fix = function fix(x) {
  return ((x === undefined) ? 0 : x)
}