
export default function TournamentsTable({ tournaments }) {

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-slate-700">
                    <thead className="text-xs uppercase text-black">
                        <tr className="text-nowrap">
                            <th className="px-3 py-2">ID</th>
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2">Status</th>
                            <th className="px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { tournaments.map(tournament => (
                            <tr key={tournament.id}>
                                <th className="px-3 py-2">{tournament.id}</th>
                                <td className="px-3 py-2 hover:underline">
                                    {tournament.name}
                                </td>
                                <td className="px-3 py-2">
                                    <span className={`mt-1 text-white px-2 py-1 w-min rounded capitalize ${tournament.color}`}>
                                        {tournament.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
