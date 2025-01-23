<?php

namespace App\Http\Controllers;

use App\Enums\TournamentStatus;
use App\Models\Player;
use App\Models\Registration;
use App\Models\Round;
use App\Models\Tournament;
use App\Services\TournamentService;
use Exception;
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
        $rounds = TournamentService::calculateRounds($tournament->registrations()->count());
        $pairingsByRound = TournamentService::getPairingsByRound($tournament);

        return Inertia::render('Tournament/Show', [
            'tournament' => $tournament,
            'playersRegistered' => $tournament->players,
            'rounds' => $rounds,
            'pairingsByRound' => $pairingsByRound,
            'color' => $tournament->status->color(),
        ]);
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

    public function startTournament(Request $request, Tournament $tournament)
    {
        try {
            $rounds = TournamentService::calculateRounds($tournament->registrations()->count());
        } catch (Exception $e) {
            return back()->withErrors($e->getMessage());
        }

        TournamentService::createTournamentRounds($tournament, $rounds);

        TournamentService::generateRoundPairings($tournament);

        $tournament->increment('current_round', 1);
        $tournament->update(['status' => TournamentStatus::ONGOING]);

        return redirect(route('tournaments.show', $tournament));
    }

    public function advanceRound(Request $request, Tournament $tournament)
    {
        $lastRound = Round::where('tournament_id', $tournament->id)
                        ->orderBy('number', 'desc')
                        ->first()->number;

        if ($tournament->current_round == $lastRound) {
            $tournament->update(['status' => TournamentStatus::FINISHED]);
            return redirect(route('tournaments.show', $tournament));
        }

        TournamentService::generateRoundPairings($tournament);
        $tournament->increment('current_round', 1);

        return redirect(route('tournaments.show', $tournament));
    }
}
