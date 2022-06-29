<!DOCTYPE html>
<html>
<head>
  <title>
    {{ $uscreen }}
    {{ config('app.env', '') }}
    Admin &ndash;
    {{ config('app.release', '') }}
  </title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
  <!-- <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet"> -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.4.55/css/materialdesignicons.min.css" rel="stylesheet">
  <!-- <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet"> -->
  
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
  <div id="app">
    <admin-component :token="{{ $token }}"></admin-component>
  </div>
    
<script src="{{mix('js/app.js')}}" defer></script>
<script src="./js/dayjs.min.js"></script>
</body>
</html>