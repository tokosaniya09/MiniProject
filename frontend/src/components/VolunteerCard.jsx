import Card from './Card'

export default function VolunteerCard({ volunteer, onSelect }) {
    return (
        <Card onClick={() => onSelect(volunteer)} className="cursor-pointer">
            <div className="p-4 flex flex-col items-center gap-4">
                <img
                    src={volunteer.userId?.image || '/images/default.jpg'}
                    alt={volunteer.userId?.name}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                />
                <div>
                    <h2 className="text-xl font-semibold">{volunteer.userId?.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">{volunteer.description}</p>
                    <p className="text-sm text-gray-500">
                        <strong>Age:</strong> {volunteer.userId?.age} | <strong>Chats:</strong> {volunteer.chatCnt}
                    </p>
                </div>
            </div>
        </Card>
    )
}
