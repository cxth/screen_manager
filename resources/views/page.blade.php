<!DOCTYPE html>
<html lang="en">
<head>
    <style>
      .responsive-iframe {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
      }
      ::-webkit-scrollbar              { display: none; }
      ::-webkit-scrollbar-button       { display: none; }
      ::-webkit-scrollbar-track        { display: none; }
      ::-webkit-scrollbar-track-piece  { display: none; }
      ::-webkit-scrollbar-thumb        { display: none; }
      ::-webkit-scrollbar-corner       { display: none; }
      ::-webkit-resizer                { display: none; }
      @-moz-document url-prefix() { /* Disable scrollbar Firefox */
        html{
          scrollbar-width: none;
        }
      }
      body {
        margin: 0; /* remove default margin */
        scrollbar-width: none; /* Also needed to disable scrollbar Firefox */
        -ms-overflow-style: none;  /* Disable scrollbar IE 10+ */
        overflow-y: scroll;
      }
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        {{ $user }}
        {{ config('app.env', '') }}
        Screen &ndash;
        {{ config('app.release', '') }}
    </title>
</head>
<body>
<div id="app" style="background:#000">
    <frame-component></frame-component>
</div>
<script src="{{ mix('js/app.js') }}" defer></script>
<script>
  setInterval(function() {
    window.location.reload();
  }, 360000); // 120000 2 minutes
</script>
</body>
</html>