<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Classe onde faz toda a lógica de autenticação do cadastro do usuário, login e logout no backend...
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
        ]);

        return response()->json(['message' => 'OLÁ! ' . $user->name . ', USUÁRIO CADASTRADO COM SUCESSO!']);
    }

    // Se no método não requisitar apenas o email e senha válidos retorna no back o erro 401
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'EMAIL OU SENHA INVÁLIDOS!'], 401);
        }

        // Comparando a classe "User" diretamente do Eloquent ORM
        $user = User::where('email', $request->email)->first();

        return response()->json(['message' => 'OLÁ! ' . $user->name . ', LOGIN EFETUADO COM SUCESSO!', 200]);
        return $user->createToken($request->device_name)->plainTextToken; // Retornando o token de auth
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->user()->tokens()->delete();

        return response()->json("SESSÃO ENCERRADA :)", 201);
    }
}
