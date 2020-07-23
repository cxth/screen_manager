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
</body>
</html>