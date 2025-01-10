<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pairing extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'tournament_id',
        'round_id',
        'player1_id',
        'player2_id',
        'winner_id',
        'is_a_tie',
        'notes',
    ];

    public function round(): BelongsTo
    {
        return $this->belongsTo(Round::class);
    }

    public function player1(): BelongsTo
    {
        return $this->belongsTo(Registration::class, 'player1_id');
    }

    public function player2(): BelongsTo
    {
        return $this->belongsTo(Registration::class, 'player2_id');
    }

    public function winner(): BelongsTo
    {
        return $this->belongsTo(Registration::class, 'winner_id');
    }

}
