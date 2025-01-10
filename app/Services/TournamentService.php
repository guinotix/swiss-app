<?php

namespace App\Services;

use Exception;

class TournamentService
{
    public static function calculateRounds(int $entries): int
    {
        if ($entries < 4) throw new Exception('A tournament requires at least 4 players.');

        return (int) ceil(log($entries, 2));
    }

}
