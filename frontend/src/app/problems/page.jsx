'use client'
import { useRouter } from 'next/navigation'
import problemCategories from '../../data/groups'
import Card from '../../components/Card'

export default function ProblemsPage() {
    const router = useRouter()

    const handleClick = (slug) => {
        router.push(`/problems/${slug}`)
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {problemCategories.map((problem) => (
            <Card key={problem.slug}>
            <div
                className="cursor-pointer"
                onClick={() => handleClick(problem.slug)}
            >
                <img
                src={problem.image}
                alt={problem.title}
                className="w-full h-40 object-cover rounded-t-md"
                />
                <div className="p-4">
                <h2 className="font-semibold text-lg mb-2">{problem.title}</h2>
                <p className="text-sm text-gray-600">{problem.description}</p>
                </div>
            </div>
            </Card>
        ))}
        </div>
    )
}
