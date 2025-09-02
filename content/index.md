---
title:
---
==================================================================================================

: : ACHERON DATABASE INTERFACE : :<br>
: : VERSION 4.8.1-BETA : :

==================================================================================================


► initialising system... : : OK<br>
► mounting volumes... : : OK<br>
► loading users... : : GUEST


► login --status<br>
user auth: FAILED<br>
retry login? [<a href="/index/" onclick="playFailSound()">y</a>/n]

 ► whoami<br>
terminal-bWloYS5y/guest

► ping --art<br>
request 1: timed out<br>
request 2: timed out<br>
request 3: timed out

► ls /<br>
├── /[[otherwhere]]/ : : OTHERWHERE research<br>
├── /[[here]]/ : : HERE research<br>
├── /[[species]]/ : : Xenobiological database<br>
├── /[[locations]]/ : : Notable locations<br>
├── /[[materials]]/ : : Notable resources<br>
├── /[[pathogens]]/ : : Biohazard database<br>
├── /[[languages]]/ : : Linguistic database<br>
├── /[[absolutes]]/ : : Notable discovered objects<br>
├── /[[factions]]/ : : Notable groups<br>
└── [[audioplayer|audioplayer.exe]]

► <span style="
  animation: blink 1s steps(2, start) infinite;
  -webkit-animation: blink 1s steps(2, start) infinite;
">
_
</span>

<style>
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
@-webkit-keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>


<script>
  function playFailSound() {
    const audio = new Audio('/assets/fail.mp3');
    audio.play();
  }
</script>
