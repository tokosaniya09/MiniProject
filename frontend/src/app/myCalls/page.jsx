"use client";

import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Card from '../../components/Card';
import { useRouter } from 'next/navigation'; 

export default function MyCallsPage() {
    const { user } = useContext(UserContext);
    const [userCalls, setUserCalls] = useState([]);
    const [volunteerCalls, setVolunteerCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!user?.id) {
            router.push('/login'); // Redirect to login if no user is found
        }
    }, [user, router]);

    useEffect(() => {
        async function fetchCalls() {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/myCalls?userId=${user?.id}`);
            const data = await res.json();
            if (data.success) {
                setUserCalls(data.userCalls || []);
                setVolunteerCalls(data.volunteerCalls || []);
            }
            setLoading(false);
        }

        if (user?.id) {
            fetchCalls();
        }
    }, [user]);

    function canJoinCall(call) {
        const callTime = new Date(call.time);
        const now = new Date();
        return now >= callTime && now <= new Date(callTime.getTime() + call.duration * 60000);
    }

    function isCallOver(call) {
        const callTime = new Date(call.time);
        return new Date() > new Date(callTime.getTime() + call.duration * 60000);
    }

    async function handleJoinCall(call) {
        let roomUrl = call.roomUrl;
        if (!roomUrl) {
            const res = await fetch('http://localhost:5000/api/createRoom');
            const data = await res.json();
            roomUrl = data.url;
        }
        window.open(roomUrl, '_blank', 'width=800,height=600');
    }

    function renderCallCard(call, otherPerson, roleLabel) {
        return (
            <Card key={call._id} className="p-4 mb-4 cursor-pointer hover:bg-gray-100 flex gap-4 items-center border border-gray-200">
                <img
                    src={otherPerson?.image || '/images/default.jpg'}
                    alt={roleLabel}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div>
                    <p><strong>{roleLabel}:</strong> {otherPerson?.name || 'N/A'}</p>
                    <p><strong>Time:</strong> {new Date(call.time).toLocaleString()}</p>
                    <p><strong>Duration:</strong> {call.duration} mins</p>
                    {isCallOver(call) ? (
                        <span className="text-red-500">Call time over</span>
                    ) : canJoinCall(call) ? (
                        <button onClick={() => handleJoinCall(call)}>Join Call</button>
                    ) : (
                        <span>Call not started</span>
                    )}
                </div>
            </Card>
        );
    }

    return (
        <div className="marginCall px-4">
            <h1 className="text-2xl font-bold mb-6 text-center mb-10">Your Scheduled Calls</h1>
            {loading ? (
                <p className="text-center text-gray-600">Fetching your calls...</p>
            ) : (
                <div className='flex px-20'>
                    <div className="mt-8 pr-10">
                        <h2 className="text-xl font-semibold mb-4">As User</h2>
                        <div className='grid grid-cols-2 gap-4'>
                        {userCalls.length === 0 ? (
                            <p>No calls where you're the user.</p>
                        ) : (
                            userCalls.map(call => {
                                const volunteerInfo = call.volunteerId;
                                return renderCallCard(call, volunteerInfo, "Volunteer");
                            })
                        )}
                        </div>
                    </div>

                    <div className="mt-8 pl-10">
                        <h2 className="text-xl font-semibold mb-4">As Volunteer</h2>
                        <div className='grid grid-cols-2 gap-4'>
                        {volunteerCalls.length === 0 ? (
                            <p>No calls where you're a volunteer.</p>
                        ) : (
                            volunteerCalls.map(call => {
                                const userInfo = call.userId;
                                return renderCallCard(call, userInfo, "User");
                            })
                        )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
