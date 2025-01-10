
export default function PlayersTable({ players }) {

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-slate-700">
                    <thead className="text-xs uppercase text-black">
                        <tr className="text-nowrap">
                            <th className="px-3 py-2">ID</th>
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2">Surname</th>
                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Date of Birth</th>
                            <th className="px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { players.map(player => (
                            <tr key={player.id}>
                                <th className="px-3 py-2">{player.id}</th>
                                <td className="px-3 py-2">{player.name}</td>
                                <td className="px-3 py-2">{player.surname}</td>
                                <td className="px-3 py-2">{player.email}</td>
                                <td className="px-3 py-2">{player.date_of_birth}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}