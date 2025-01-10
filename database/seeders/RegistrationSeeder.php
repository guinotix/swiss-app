<?php

namespace Database\Seeders;

use App\Models\Registration;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i < 9; $i++) {
            Registration::create([
                'tournament_id' => 1,
                'player_id' => $i,
            ]);
        }

        for ($j = 1; $j < 8; $j++) {
            Registration::create([
                'tournament_id' => 2,
                'player_id' => $j,
            ]);
        }
    }
}
