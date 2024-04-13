import bootstrap from "bootstrap";
import "./styles/styles.scss";
import videojs from "video.js";
import "./medias/tram.mp4";

videojs(document.querySelector("#tramVideo"), {
  controls: true,
}).ready(function () {
  let vPlayer = this;
  vPlayer.src(tram);
});
