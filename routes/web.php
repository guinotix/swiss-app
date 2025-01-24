<?php

use App\Http\Controllers\PairingController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TournamentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('players', PlayerController::class);
    Route::resource('tournaments', TournamentController::class);
    Route::post('/tournaments/{tournament}/start', [TournamentController::class, 'startTournament'])->name('tournaments.startTournament');
    Route::post('/tournaments/{tournament}/advance', [TournamentController::class, 'advanceRound'])->name('tournaments.advanceRound');
    Route::get('/tournaments/{tournament}/standings', [TournamentController::class, 'standings'])->name('tournaments.standings');
    Route::get('/tournaments/{tournament}/standings/{standing}', [TournamentController::class, 'showStanding'])->name('tournaments.showStanding');
    Route::put('/pairings/{pairing}', [PairingController::class, 'update'])->name('pairings.update');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
