<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Funcionario;

class FuncionarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Funcionario::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Funcionario::create($request->post());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Funcionario  $funcionario
     * @return \Illuminate\Http\Response
     */
    public function show(Funcionario $funcionario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Funcionario  $funcionario
     * @return \Illuminate\Http\Response
     */
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Funcionario  $funcionario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $funcs = Funcionario::find($id);
        $funcs->update($request->all());

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Funcionario  $funcionario
     * @return \Illuminate\Http\Response
     */
    public function Delete(Request $request, $id)
    {
        $funcs = Funcionario::find($id);
        $funcs->delete($request->all());
    }
    public function DeleteAll(Request $request)
    {
        $qtd = 0;
        foreach ($request->all() as $id) {
            $funcs = Funcionario::find($id);
            $funcs->delete();
            $qtd++;
        }
        $success = $qtd > 0 ? true : false;
        return response()->json(['FUNCIONÁRIO(S) EXCLUÍDO COM SUCESSO!' => $success, 'TOTAL EXCLUÍDO(S)' => $qtd], status:200);
    }
}
