<?php

namespace App\Http\Controllers;

use App\Enums\TournamentStatus;
use App\Models\Player;
use App\Models\Registration;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TournamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Tournament/Index', [
            'tournaments' => Tournament::all()->map(function ($tournament) {
                return [
                    'id' => $tournament->id,
                    'name' => $tournament->name,
                    'status' => $tournament->status->value,
                    'color' => $tournament->status->color(),
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Tournament/Create', [
            'players' => Player::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'entries' => 'required|array',
        ]);

        $tournament = Tournament::create([
            'name' => $validated['name'],
            'status' => TournamentStatus::CREATED,
        ]);

        foreach ($validated['entries'] as $key => $value) {
            Registration::create([
                'tournament_id' => $tournament->id,
                'player_id' => $value['id'],
            ]);
        }

        return redirect(route('tournaments.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Tournament $tournament)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tournament $tournament)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tournament $tournament)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tournament $tournament)
    {
        //
    }

}
