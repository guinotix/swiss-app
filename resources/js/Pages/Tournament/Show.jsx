import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

import TournamentRounds from './TournamentRounds';

export default function Show({ auth, tournament, playersRegistered, rounds, pairingsByRound, color }) {

    const startTournament = () => {
        router.post(route("tournaments.startTournament", tournament), { tournament });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {`Tournament: ${tournament.name}`}
                </h2>
            }
        >
            <Head title={tournament.name} />


            <div className="py-12">

                { tournament.status != "created" ? 
                    <TournamentRounds
                        currentRound={1}
                        rounds={rounds}
                        pairingsByRound={pairingsByRound}
                        tournament={tournament}
                    />
                    :
                    <div></div>
                }

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-200 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-slate-700">
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                <div className="flex space-x-1 text-lg">
                                    <label className="font-bold">Tournament ID:</label>
                                    <p>{tournament.id}</p>
                                </div>
                                <div className="flex space-x-1 text-lg">
                                    <label className="font-bold">Status: </label>
                                    <span className={`text-white text-nowrap px-2 w-min rounded capitalize ${color}`}>
                                        {tournament.status}
                                    </span>
                                </div>
                                <div className="flex space-x-1 text-lg">
                                    <label className="font-bold text-lg">Rounds: </label>
                                    <p>{rounds}</p>
                                </div>
                                <div className="flex space-x-1 text-lg">
                                    <label className="font-bold text-lg">Players: </label>
                                    <p>{playersRegistered.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    { tournament.status == "created" ?
                        <div className="flex justify-center mt-4">
                            <button onClick={startTournament}
                                className="bg-emerald-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-emerald-600">
                                Start
                            </button>
                        </div>
                        :
                        <div></div>
                    }

                    <div className="mt-4 bg-slate-200 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-slate-700">
                            <p className="text-2xl font-bold mb-4">Player Entries</p>
                            { playersRegistered.map(player => (
                                <div className="flex" key={player.id}>
                                    <p className="px-3 py-2">{player.id}</p>
                                    <p className="px-3 py-2">{player.name}</p>
                                    <p className="px-3 py-2">{player.surname}</p>
                                    <p className="px-3 py-2">{player.email}</p>
                                    <p className="px-3 py-2">{player.date_of_birth}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}