<div class="timeline">

<!-- 1. STATIC LABEL: a single date, no link, no hover -->
  <div class="timeline__item">
    <span class="timeline__node" style="--y: 1000"></span>
    <span class="timeline__label">
      <span class="timeline__date">01.01.1000 AAV</span>
      <span class="timeline__name">EVENT NAME</span>
    </span>
  </div>
  
  <!-- 1. STATIC LABEL: a single date, no link, no hover -->
  <div class="timeline__item">
    <span class="timeline__node"></span>
    <span class="timeline__label">
      <span class="timeline__date">01.01.100 AV</span>
      <span class="timeline__name">EVENT NAME</span>
    </span>
  </div>

  <!-- 2. FILM CELL: a single date, linked, with an image -->
  <a class="timeline__item timeline__item--film" style="--y: 10" href="/timeline/event-name">
    <span class="timeline__node"></span>
    <span class="timeline__film">
      <span class="timeline__perf"></span>
      <span class="timeline__frame" style="background-image:url('/assets/placeholder.gif');"></span>
      <span class="timeline__caption">
        <span class="timeline__date">01.01.110 AV</span>
        <span class="timeline__name">EVENT NAME</span>
      </span>
      <span class="timeline__perf"></span>
    </span>
  </a>

  <!-- 3. STATIC LABEL WITH A DURATION: starts 5 months after the previous entry, lasts 2 years -->
  <div class="timeline__item timeline__item--span" style="--m: 5; --dy: 2">
    <span class="timeline__bar"></span>
    <span class="timeline__node"></span>
    <span class="timeline__node timeline__node--end"></span>
    <span class="timeline__label">
      <span class="timeline__date">01.06.110 AV</span>
      <span class="timeline__date">→ 01.06.112 AV</span>
      <span class="timeline__name">EVENT NAME</span>
    </span>
  </div>

  <!-- 4. FILM CELL WITH A DURATION: starts 1 year after the previous one ENDED, lasts 6 months -->
  <a class="timeline__item timeline__item--film timeline__item--span" style="--y: 1; --dm: 6" href="/timeline/event-name">
    <span class="timeline__bar"></span>
    <span class="timeline__node"></span>
    <span class="timeline__node timeline__node--end"></span>
    <span class="timeline__film">
      <span class="timeline__perf"></span>
      <span class="timeline__frame" style="background-image:url('/assets/placeholder.gif');"></span>
      <span class="timeline__caption">
        <span class="timeline__date">01.06.113 AV</span>
        <span class="timeline__date">→ 01.12.113 AV</span>
        <span class="timeline__name">EVENT NAME</span>
      </span>
      <span class="timeline__perf"></span>
    </span>
  </a>

</div>