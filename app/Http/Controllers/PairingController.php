<?php

namespace App\Http\Controllers;

use App\Models\Pairing;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PairingController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pairing $pairing)
    {
        $validated = $request->validate([
            'matchResult' => 'required|' . Rule::in(['P1', 'P2', 'TIE']),
        ]);
        if ($validated['matchResult'] == 'P1') {
            $pairing->update([
                'winner_id' => $pairing->player1_id,
            ]);
            $reg = Registration::where('tournament_id', $pairing->tournament_id)
                                ->where('player_id', $pairing->player1_id)
                                ->get()
                                ->first();
            $reg->increment('points', 3);
        }
        
        if ($validated['matchResult'] == 'P2') {
            $pairing->update([
                'winner_id' => $pairing->player2_id,
            ]);
            $reg = Registration::where('tournament_id', $pairing->tournament_id)
                                ->where('player_id', $pairing->player2_id)
                                ->get()
                                ->first();
            $reg->increment('points', 3);
        }
        
        if ($validated['matchResult'] == 'TIE') {
            $pairing->update([
                'is_a_tie' => true,
            ]);
            $reg1 = Registration::where('tournament_id', $pairing->tournament_id)
                                ->where('player_id', $pairing->player1_id)
                                ->get()
                                ->first();
            $reg2 = Registration::where('tournament_id', $pairing->tournament_id)
                                ->where('player_id', $pairing->player2_id)
                                ->get()
                                ->first();
            $reg1->increment('points', 1);
            $reg2->increment('points', 1);
        }
        
        return redirect(route('tournaments.show', $pairing->tournament_id));
    }
}
