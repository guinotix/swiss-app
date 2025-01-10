<?php

namespace App\Models;

use App\Enums\TournamentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Tournament extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'status',
    ];

    protected $casts = [
        'status' => TournamentStatus::class,
    ];

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    public function rounds(): HasMany
    {
        return $this->hasMany(Round::class);
    }

    public function players(): HasManyThrough
    {
        return $this->hasManyThrough(Player::class, Registration::class, 'tournament_id', 'id', 'id', 'player_id');
    }

}
