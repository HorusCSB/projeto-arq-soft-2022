<?php

require_once __DIR__ . '/vendor/autoload.php';
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

$log = new Logger('composer');
$log->pushHandler(new StreamHandler('teste.log', Logger::WARNING));

// add records to the log
// $log->warning('Isso é um log.');

use \App\Controller\Pages\Auth;

echo Auth::authenticate();