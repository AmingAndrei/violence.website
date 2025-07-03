---
title:
---
= ACHERON DATABASE INTERFACE // V4.8.1 =

---

[ SYSTEM BOOT COMPLETE ]

» USER AUTH :: [ FAILED ] -- GUEST ACCESS GRANTED [ <a href="/login_fail/" onclick="playFailSound()">LOGIN FAILED. TRY AGAIN?</a> ]

» STATUS :: STABLE  |  CONNECTION :: ENCRYPTED

---

» AVAILABLE DIRECTORIES:

├── /[[blackspace]]/ : : BLACKSPACE research

├── /[[realspace]]/ : : REALSPACE research

├── /[[species]]/ : : Xenobiological database

├── /[[locations]]/ : : Notable locations

├── /[[materials]]/ : : Notable resources

├── /[[pathogens]]/ : : Biohazard database

├── /[[metaphoricals]]/ : : Metaphysical phenomena

├── /[[languages]]/ : : Linguistic database

├── /[[constructs]]/ : : Notable items

└── /[[factions]]/ : : Orgs and factions

<script>
  function playFailSound() {
    const audio = new Audio('/assets/fail.mp3');
    audio.play();
  }
</script>