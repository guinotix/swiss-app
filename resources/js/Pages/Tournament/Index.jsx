import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import TournamentsTable from './TournamentsTable';

export default function Index({ auth, tournaments }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tournaments
                    </h2>
                    <Link href={route("tournaments.create")} className="bg-emerald-500 px-3 py-1 text-white uppercase rounded shadow transition-all hover:bg-emerald-600">
                        New tournament
                    </Link>
                </div>
            }
        >
            <Head title="Tournaments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-200 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <TournamentsTable tournaments={tournaments} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
