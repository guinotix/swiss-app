<?php

namespace App\Http\Controllers;

use App\Models\Pairing;
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
            $winner = $pairing->player1_id;
            $pairing->update([
                'winner_id' => $winner,
            ]);
            $pairing->winner->increment('points', 3);
        }
        
        if ($validated['matchResult'] == 'P2') {
            $winner = $pairing->player2_id;
            $pairing->update([
                'winner_id' => $winner,
            ]);
            $pairing->winner->increment('points', 3);
        }
        
        if ($validated['matchResult'] == 'TIE') {
            $pairing->update([
                'is_a_tie' => true,
            ]);
            $pairing->player1->increment('points', 1);
            $pairing->player2->increment('points', 1);
        }
        
        return redirect(route('tournaments.show', $pairing->tournament_id));
    }
}
