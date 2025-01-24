import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function StandingsTable({ auth, tournament, standings, currentRound }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {`Tournament: ${tournament.name} - Standings Round ${currentRound}`}
                </h2>
            }
        >
            <Head title={`${tournament.name} - Standings Round ${currentRound}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-200 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-slate-700">
                                    <thead className="text-xs uppercase text-black">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2">Rank</th>
                                            <th className="px-3 py-2">Name</th>
                                            <th className="px-3 py-2">Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { standings.map(entry => (
                                            <tr key={entry.player}>
                                                <td className="px-3 py-2">{entry.rank}</td>
                                                <td className="px-3 py-2">{entry.player}</td>
                                                <td className="px-3 py-2">{entry.points}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
