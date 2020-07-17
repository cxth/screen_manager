<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        .container {
            position: relative;
            overflow: hidden;
            width: 100%;
            padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
        }

        /* Then style the iframe to fit in the container div with full height and width */
        .responsive-iframe {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
        }
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        {{ config('app.env', '') }}
        Screen &ndash;
        {{ config('app.release', '') }}
    </title>
</head>
<body>
<div id="app">
    <frame-component></frame-component>
</div>
<script src="{{ mix('js/app.js') }}" defer></script>
</body>
</html>