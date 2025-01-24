import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function TournamentRounds({ rounds, pairingsByRound, tournament }) {

    const [activeTab, setActiveTab] = useState(tournament.current_round);

    const selectedPairings = pairingsByRound.find((r) => r.round_id == activeTab)?.pairings || [];

    const hasFinishedMatches = selectedPairings.some(
        pairing => !((pairing.winner_id == null && pairing.is_a_tie)
                || (pairing.winner_id != null && !pairing.is_a_tie))
    );

    const advanceRound = () => {
        if (hasFinishedMatches) {
            alert('There are some matches on going');
            return;
        }
        router.post(route("tournaments.advanceRound", tournament));
    }

    const p1wins = (pairing) => {
        router.put(route("pairings.update", pairing), { matchResult: "P1" });
    }

    const p2wins = (pairing) => {
        router.put(route("pairings.update", pairing), { matchResult: "P2" });
    }

    const p1p2tie = (pairing) => {
        router.put(route("pairings.update", pairing), { matchResult: "TIE" });
    }

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-slate-200 overflow-hidden shadow-sm sm:rounded-lg p-6 text-slate-700 mb-4">
                <div className="flex border-b border-gray-300">
                    { Array.from({ length: rounds }, (_, i) => i + 1).map((round, index) => (
                        <button key={index}
                            onClick={() => setActiveTab(round)}
                            className={`px-4 py-2 text-sm font-medium ${activeTab == round ? "text-blue-500 border-b-2 border-blue-800" : "text-gray-500 hover:text-blue-400"}`}>
                                R{round}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-50 rounded shadow p-4">
                    <h2 className="text-lg font-bold mb-4">
                        {`Round ${activeTab}`}
                    </h2>
                    <table className="table-auto w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Table #</th>
                                <th className="px-4 py-2 text-left">Player 1</th>
                                <th className="px-4 py-2 text-left">Player 2</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { selectedPairings.length > 0 ? (
                                selectedPairings.map((pairing, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 text-left">{index + 1}</td>
                                        <td className="px-4 py-2 text-left">{pairing.player1_fullname}</td>
                                        <td className="px-4 py-2 text-left">{pairing.player2_fullname}</td>
                                        <td className="px-4 py-2 text-center">
                                            { pairing.player2_id == null ?
                                                <span>{pairing.player1_fullname} wins!</span>
                                            : (pairing.is_a_tie ?
                                                <span>Match is a tie!</span>
                                            : (pairing.winner_id != null ?
                                                <span>{pairing.winner_id == pairing.player1_id ? pairing.player1_fullname : pairing.player2_fullname} wins!</span>
                                            :
                                                <div className="flex justify-center gap-x-2">
                                                    <button onClick={e => p1wins(pairing)}
                                                        className="bg-blue-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-blue-600">
                                                        P1 WINS
                                                    </button>
                                                    <button onClick={e => p2wins(pairing)}
                                                        className="bg-blue-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-blue-600">
                                                        P2 WINS
                                                    </button>
                                                    <button onClick={e => p1p2tie(pairing)}
                                                        className="bg-orange-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-orange-600">
                                                        TIE
                                                    </button>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center">
                                        No pairings available yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                { tournament.status != "finished" && activeTab == tournament.current_round 
                    && !hasFinishedMatches ?
                        <div className="flex justify-center mt-4">
                            <button onClick={advanceRound}
                                className="bg-blue-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-blue-600">
                                ADVANCE ROUND
                            </button>
                        </div>
                    : <div></div>
                }

            </div>
        </div>
    )
}
