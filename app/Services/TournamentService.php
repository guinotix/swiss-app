<?php

namespace App\Services;

use App\Models\Pairing;
use App\Models\Registration;
use App\Models\Round;
use App\Models\Tournament;
use Exception;

class TournamentService
{
    public static function calculateRounds(int $entries): int
    {
        if ($entries < 4) throw new Exception('A tournament requires at least 4 players.');

        return (int) ceil(log($entries, 2));
    }

    public static function createTournamentRounds(Tournament $tournament, int $rounds): void
    {
        for ($i = 1; $i <= $rounds; $i++) {
            Round::create([
                'tournament_id' => $tournament->id,
                'number' => $i,
            ]);
        }
    }

    public static function generateRoundPairings(Tournament $tournament)
    {
        $nextRound = Round::where('tournament_id', $tournament->id)
                        ->where('number', '=', $tournament->current_round + 1)
                        ->first()->id;

        // Monrad system
        $regs = ($tournament->current_round == 0)
            ? $tournament->registrations->pluck('player_id')->toArray()
            : $tournament->registrations->sortByDesc('points')->pluck('player_id')->toArray();
        $pairs = [];
        while (count($regs) >= 2) {
            $player1 = array_shift($regs);
            $player2 = array_shift($regs);
            $pairs[] = [$player1, $player2];
        }
        if (count($regs) == 1) {
            $pairs[] = [array_shift($regs), null];
        }
        foreach ($pairs as $pair) {
            Pairing::create([
                'tournament_id' => $tournament->id,
                'round_id' => $nextRound,
                'player1_id' => $pair[0],
                'player2_id' => $pair[1],
            ]);
        }

        $pairingWithBye = Pairing::where('tournament_id', $tournament->id)
                            ->where('round_id', $nextRound)
                            ->orderBy('id', 'desc')
                            ->first();

        if ($pairingWithBye->player2_id == null) {
            $pairingWithBye->winner_id = $pairingWithBye->player1_id;
            $pairingWithBye->save();

            $reg = Registration::where('tournament_id', $tournament->id)
                    ->where('player_id', $pairingWithBye->player1_id)
                    ->get()
                    ->first();
            $reg->increment('points', 3);
        }
    }

    public static function getPairingsByRound(Tournament $tournament): array
    {
        $array = $tournament->rounds->map(function ($round) {
            $pairings = $round->pairings->map(function ($pairing) {
                $base = $pairing->toArray();
                if ($pairing->player2) {
                    return array_merge($base, [
                        'player1_fullname' => $pairing->player1->player->name . ' ' . $pairing->player1->player->surname,
                        'player2_fullname' => $pairing->player2->player->name . ' ' . $pairing->player2->player->surname,
                    ]);
                }
                return array_merge($base, [
                    'player1_fullname' => $pairing->player1->player->name . ' ' . $pairing->player1->player->surname,
                    'player2_fullname' => 'BYE',
                ]);
            })->toArray();
            return [
                'round_id' => $round->number,
                'pairings' => $pairings,
            ];
        })->toArray();

        return $array;
    }

}
