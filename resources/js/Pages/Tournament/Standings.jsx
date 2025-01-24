import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Standings({ auth, tournament, standings }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {`Tournament: ${tournament.name} - Standings`}
                </h2>
            }
        >
            <Head title={`${tournament.name} - Standings`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-200 overflow-hidden shadow-sm sm:rounded-lg">
                        <ul className="p-6">
                        { standings.map((standing, index) => (
                            <li key={standing.id} className="hover:underline">
                                <Link href={route('tournaments.showStanding', [tournament.id, standing.id])}>
                                    Standings Round {index + 1}
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
