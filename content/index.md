---
title:
---
==================================================================================================

: : ACHERON DATABASE INTERFACE : :<br>
: : VERSION 4.8.1-BETA : :

==================================================================================================


[ SYSTEM BOOT COMPLETE ]<br>
[ SECURE CONNECTION ESTABLISHED ]<br>
[ ACCES LEVEL: GUEST]

► login --status<br>
USER AUTH: FAILED<br>
RETRY LOGIN? [<a href="/index/" onclick="playFailSound()">y</a>/n]

<script>
(function() {
  // Reference: 10 Mar 2006, 16:30 UTC (which is 18:30 GMT+2)
  const startUTC = Date.UTC(2006, 2, 10, 16, 30); // months are 0-based
  const nowUTC = Date.now(); // current time in ms since epoch (UTC)

  const diffMs = nowUTC - startUTC;
  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  document.write(`► uptime : : ${days}d ${hours}h ${minutes}m`);
})();
</script>

► ls / <br>
AVAILABLE DIRECTORIES:<br>
├── /[[blackspace]]/ : : BLACKSPACE research<br>
├── /[[realspace]]/ : : REALSPACE research<br>
├── /[[species]]/ : : Xenobiological database<br>
├── /[[locations]]/ : : Notable locations<br>
├── /[[materials]]/ : : Notable resources<br>
├── /[[pathogens]]/ : : Biohazard database<br>
├── /[[metaphoricals]]/ : : Metaphysical phenomena<br>
├── /[[languages]]/ : : Linguistic database<br>
├── /[[constructs]]/ : : Notable objects<br>
├── /[[factions]]/ : : Orgs and factions<br>
└── [[audioplayer|audioplayer.exe]]

<script>
  function playFailSound() {
    const audio = new Audio('/assets/fail.mp3');
    audio.play();
  }
</script>
