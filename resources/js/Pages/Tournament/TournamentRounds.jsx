import { useState } from 'react';

export default function TournamentRounds({ rounds, currentRound, pairingsByRound }) {

    const [activeTab, setActiveTab] = useState(currentRound);

    const selectedPairings = pairingsByRound.find((r) => r.round_id == activeTab)?.pairings || [];

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-slate-200 overflow-hidden shadow-sm sm:rounded-lg p-6 text-slate-700 mb-4">
                <div className="flex border-b border-gray-300">
                    <button onClick={() => setActiveTab('Standings')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab == 'Standings' ? "text-blue-500 border-b-2 border-blue-800" : "text-gray-500 hover:text-blue-400"}`}>
                                Standings
                    </button>
                    { Array.from({ length: rounds }, (_, i) => i + 1).map((round, index) => (
                        <button key={index}
                            onClick={() => setActiveTab(round)}
                            className={`px-4 py-2 text-sm font-medium ${activeTab == round ? "text-blue-500 border-b-2 border-blue-800" : "text-gray-500 hover:text-blue-400"}`}>
                                R{round}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-50 rounded shadow p-4">
                    { activeTab == "Standings" ?
                        <span>STANDINGS LIST</span>
                        :
                        <div>
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
                                                            P1 WINS - P2 WINS - TIE
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
                    }
                </div>

            </div>
        </div>
    )
}
