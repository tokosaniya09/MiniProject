'use client'

import { useState, useEffect, useContext } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Card from '../../../components/Card'
import problemCategories from '../../../data/groups'
import { UserContext } from '../../../context/UserContext'

export default function VolunteersPage() {
    const { slug } = useParams()
    const router = useRouter()
    const [volunteers, setVolunteers] = useState([])
    const [volunteersLoading, setVolunteersLoading] = useState(true)
    const { user } = useContext(UserContext)

    const matchedCategory = problemCategories.find(cat => cat.slug === slug)
    const problemTitle = matchedCategory?.title || slug.replace(/-/g, ' ')

    useEffect(() => {
        async function fetchVolunteers() {
            const url = user
                ? `http://localhost:5000/api/volunteer/${slug}?userId=${user?.id}`
                : `http://localhost:5000/api/volunteer/${slug}`;

            setVolunteersLoading(true)
            const res = await fetch(url)
            const data = await res.json()
            if (data.success) setVolunteers(data.volunteers)
            setVolunteersLoading(false)
        }

        fetchVolunteers()
    }, [slug, user])

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 marginCall text-center">
            <h1 className="text-2xl font-bold mb-6 capitalize">
                Volunteers for: {problemTitle}
            </h1>

            {volunteersLoading ? (
                <p>Loading volunteers...</p>
            ) : volunteers.length === 0 ? (
                <p>No volunteers found for this issue.</p>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                    {volunteers.map((v) => (
                        <Card 
                            key={v._id} 
                        >
                            <div className="p-4 flex flex-col items-center gap-4">
                                <img
                                    src={v.userId?.image || '/images/default.jpg'}
                                    alt={v.userId?.name}
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold">{v.userId?.name}</h2>
                                    <p className="text-sm text-gray-600 mb-2">{v.description}</p>
                                    <p className="text-sm text-gray-500">
                                        <strong>Age:</strong> {v.userId?.age} | <strong>Helped:</strong> {v.chatCnt} people
                                    </p>
                                </div>
                                <button 
                                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all duration-300"
                                    onClick={() => {
                                        router.push(`/history/${v.userId?._id}`)
                                    }}
                                >
                                    Chat or Video call
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
