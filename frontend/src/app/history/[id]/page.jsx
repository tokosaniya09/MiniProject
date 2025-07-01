"use client";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import ChatBox from '../../../components/ChatBox';
import { useParams } from 'next/navigation';

export default function HistoryPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [contacts, setContacts] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [contactsLoading, setContactsLoading] = useState(true);
    const [personLoading, setPersonLoading] = useState(true);
    
    // Fetch person from URL param
    useEffect(() => {
        async function fetchInitialPerson() {
            if (!id) return;
            setPersonLoading(true);
            const res = await fetch(`http://localhost:5000/api/user/${id}`);
            const data = await res.json();
            if (data.success) setSelectedPerson(data.user);
            setPersonLoading(false);
        }
        fetchInitialPerson();
    }, [id]);

    // Fetch contacts
    useEffect(() => {
        async function fetchContacts() {
            if (!user?.id) return;
            setContactsLoading(true);
            const res = await fetch(`http://localhost:5000/api/myChats?userId=${user.id}`);
            const data = await res.json();
            if (data.success) setContacts(data.contacts);
            setContactsLoading(false);
        }
        fetchContacts();
    }, [user]);

    return (
        <div className="min-h-screen flex pt-20 mt-20">
            {/* Chat History - 30% */}
            <div className="w-[30%] border-r border-gray-300 p-6">
                <h2 className="text-xl font-semibold mb-4">Chat History</h2>
                {contactsLoading ? (
                    <p className="text-gray-500 text-sm">Loading contacts...</p>
                ) : contacts.length === 0 ? (
                    <p className="text-gray-500 text-sm">No chats yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {contacts.map((c) => (
                            <li
                                key={c._id}
                                onClick={() => setSelectedPerson(c)}
                                className="flex items-center gap-3 bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200"
                            >
                                <img
                                    src={c.image || '/images/default.jpg'}
                                    alt={c.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium">{c.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Chat Box - 70% */}
            <div className="w-[70%] p-6 flex items-center justify-center">
                {personLoading ? (
                    <p className="text-gray-500 text-lg">Loading chat...</p>
                ) : selectedPerson ? (
                    <ChatBox person={selectedPerson} onClose={() => setSelectedPerson(null)} />
                ) : (
                    <p className="text-gray-500 text-lg">No person selected to chat.</p>
                )}
            </div>
        </div>
    );
}
