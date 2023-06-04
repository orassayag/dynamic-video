export default function StoryVideo({ videoURL }) {
  const next = document.getElementById('__next');
  next.style.width = '100%';
  next.style.height = '100%';
  next.style.overflow = 'hidden';
  return (
    <iframe
      title="storyBoard"
      width="100%"
      height="100%"
      srcDoc={`<body>
              <script type="text/javascript" src="https://player.idomoo.com/latest/main.js"></script>
              <div id="player"></div>
              <script>
              var player_options = {
              size: "sd",
              src:
              "${videoURL}",
              autoplay: true
              };
              idmPlayerCreate(player_options, "player");
              </script>
              </body>
      `}
    />
  );
}
