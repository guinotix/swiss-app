<?php

use App\Models\Registration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pairings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id');
            $table->foreignId('round_id');
            $table->foreignIdFor(Registration::class, 'player1_id');
            $table->foreignIdFor(Registration::class, 'player2_id')->nullable();
            $table->foreignIdFor(Registration::class, 'winner_id')->nullable();
            $table->boolean('is_a_tie')->default(false);
            $table->longText('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pairings');
    }
};
