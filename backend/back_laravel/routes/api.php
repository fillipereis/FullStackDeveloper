<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FuncionarioController; // Importando a controller para ser usado na rota de API
use App\Http\Controllers\LoginController;   // Importando a controller de autenticação para a API

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Definindo todas as rotas padrão do backend da aplicação

Route::get('/users', function () {
    return \App\Models\User::all(); // Rota onde retorna todos os usuários do sanctum
}); //->middleware(middleware: 'auth:sanctum'); // Bloqueio da rota para maior segurança

Route::post('/register', [LoginController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);
Route::get('/funcionarios', [FuncionarioController::class, 'index']);
Route::post('/funcionarios', [FuncionarioController::class, 'store']);
Route::put('/update/{id}', [FuncionarioController::class, 'update']);
Route::delete('/Delete/{id}', [FuncionarioController::class, 'Delete']);
Route::delete('/DeleteAll', [FuncionarioController::class, 'DeleteAll']);
