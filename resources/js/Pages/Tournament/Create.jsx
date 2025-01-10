import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, players }) {

    const { data, setData, post, errors } = useForm({
        name: "",
        selectedEntry: { context: null },
        entries: [],
    });

    const selectPlayer = (player) => {
        setData("selectedEntry", { ...player, context: "available" });
    }

    const selectEntry = (player) => {
        setData("selectedEntry", { ...player, context: "tournament" });
    }

    const addEntry = (event) => {
        event.preventDefault();
        if (data.selectedEntry.context != null && !data.entries.some(e => e.id === data.selectedEntry.id)) {
            setData({
                ...data,
                entries: [...data.entries, data.selectedEntry],
                selectedEntry: {}
            });
            players.filter(p => p.id !== data.selectedEntry.id);
        }
    }

    const removeEntry = (event) => {
        event.preventDefault();
        setData({
            ...data,
            entries: data.entries.filter(e => e.id !== data.selectedEntry.id),
            selectedEntry: {}
        });
    }

    const submitForm = (event) => {
        event.preventDefault();

        post(route("tournaments.store"), { data });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">New tournament</h2>
            }
        >
            <Head title="New tournament" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-200 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submitForm} className="p-4 sm:p-8">
                            
                            {/* Name */}
                            <div className="mt-4 mb-6">
                                <InputLabel htmlFor="tournament_name" value="Tournament Name" />
                                <TextInput id="tournament_name" type="text" name="name" value={data.name} className="mt-1 block w-full" isFocused={true} onChange={(event) => setData("name", event.target.value)} />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            
                            {/* PlayersTable */}
                            <div className="overflow-auto">
                                <p>My Players</p>
                                <table className="w-full text-sm text-left rtl:text-right text-slate-700">
                                    <thead className="text-xs uppercase text-black">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2">ID</th>
                                            <th className="px-3 py-2">Name</th>
                                            <th className="px-3 py-2">Surname</th>
                                            <th className="px-3 py-2">Email</th>
                                            <th className="px-3 py-2">Date of Birth</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { players.map(player => (
                                            <tr key={player.id} className={data.selectedEntry.id == player.id && data.selectedEntry.context === "available" ? "bg-blue-300" : ""}>
                                                <td className="px-3 py-2">
                                                    <button type="button"
                                                        onClick={() => selectPlayer(player)}>
                                                            {player.id}
                                                    </button>
                                                </td>
                                                <td className="px-3 py-2">{player.name}</td>
                                                <td className="px-3 py-2">{player.surname}</td>
                                                <td className="px-3 py-2">{player.email}</td>
                                                <td className="px-3 py-2">{player.date_of_birth}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-center space-x-3 my-6">
                                <button className="bg-blue-500 px-3 py-1 text-white uppercase rounded shadow transition-all hover:bg-blue-600"
                                    onClick={addEntry}
                                    >Add to tournament
                                </button>

                                <button className="bg-red-500 px-3 py-1 text-white uppercase rounded shadow transition-all hover:bg-red-600"
                                    onClick={removeEntry}
                                    >Remove from tournament
                                </button>
                            </div>

                            {/* Tournament Entries */}
                            <div className="overflow-auto">
                                <p>Players in this tournament</p>
                                <table className="w-full text-sm text-left rtl:text-right text-slate-700">
                                    <thead className="text-xs uppercase text-black">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2">ID</th>
                                            <th className="px-3 py-2">Name</th>
                                            <th className="px-3 py-2">Surname</th>
                                            <th className="px-3 py-2">Email</th>
                                            <th className="px-3 py-2">Date of Birth</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { data.entries.map(entry => (
                                            <tr key={entry.id} className={data.selectedEntry.id === entry.id && data.selectedEntry.context === "tournament" ? "bg-blue-300" : ""}>
                                                <td className="px-3 py-2">
                                                    <button type="button"
                                                        onClick={() => selectEntry(entry)}>
                                                            {entry.id}
                                                    </button>
                                                </td>
                                                <td className="px-3 py-2">{entry.name}</td>
                                                <td className="px-3 py-2">{entry.surname}</td>
                                                <td className="px-3 py-2">{entry.email}</td>
                                                <td className="px-3 py-2">{entry.date_of_birth}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                            <div className="mt-4 text-right">
                                <Link href={route("tournaments.index")} className="bg-gray-100 px-3 py-1 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
