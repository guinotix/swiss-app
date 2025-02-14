import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import PlayersTable from './PlayersTable';

export default function Index({ auth, players }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Players
                    </h2>
                </div>
            }
        >
            <Head title="Players" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-200 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-100">
                            <PlayersTable players={players} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
