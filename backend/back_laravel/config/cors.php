<?php

return [

    /*
        O Cors - Cross-Origin Resource Sharing (Compartilhamento de recursos com origens diferentes)
        é um mecanismo que usa cabeçalhos adicionais HTTP para informar a um navegador
        que permita que seja executado em uma origem (domínio) com permissão para
        acessar recursos selecionados de um servidor em uma origem.
        Segue abaixo os paths liberados da aplicação
    */

    'paths' => ['api/*', 'register', 'login', 'logout', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
