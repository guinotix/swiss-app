<?php

namespace App\Enums;

enum TournamentStatus: string
{
    case CREATED = 'created';
    case ONGOING = 'on-going';
    case FINISHED = 'finished';

    public function color(): string
    {
        return match ($this) {
            self::CREATED => 'bg-blue-500',
            self::ONGOING => 'bg-emerald-500',
            self::FINISHED => 'bg-gray-500',
        };
    }

    public function label(): string
    {
        return match ($this) {
            self::CREATED => 'Created',
            self::ONGOING => 'On-Going',
            self::FINISHED => 'Finished',
        };
    }
}
