---
title:
---
==================================================================================================

: : ACHERON DATABASE INTERFACE : :<br>
: : VERSION 4.8.1-BETA : :

==================================================================================================


► initializing system... : : OK<br>
► mounting volumes... : : OK<br>
► loading users... : : GUEST


► login --status<br>
USER AUTH: FAILED<br>
RETRY LOGIN? [<a href="/index/" onclick="playFailSound()">y</a>/n]

 ►whoami<br>
terminal-bWloYS5y/guest

► ls /<br>
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

► _

<script>
  function playFailSound() {
    const audio = new Audio('/assets/fail.mp3');
    audio.play();
  }
</script>
