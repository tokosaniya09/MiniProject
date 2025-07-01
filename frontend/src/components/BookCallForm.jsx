'use client'

import { useState, useContext } from 'react'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { UserContext } from '../context/UserContext'
import PopupModal from '../components/PopupModal'
import SubmitButton from '../components/SubmitButton'

export default function BookCallForm({ selectedVolunteer, setSelectedVolunteer, handleBackToChat }) {
    // console.log("selectedVolunteer in BookCallForm", selectedVolunteer)
    const { user } = useContext(UserContext)
    const [date, setDate] = useState('')
    const [time, setTime] = useState(null)
    const [duration, setDuration] = useState('30')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalSuccess, setModalSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    if (!selectedVolunteer) {
        console.log("❌ No volunteer passed to BookCallForm");
        return null;
    }
    console.log("✅ Volunteer passed to BookCallForm:", selectedVolunteer);

    async function handleBookCall() {
        if (!date || !time) {
            setModalMessage('Please select both date and time.')
            setModalSuccess(false)
            setIsModalOpen(true)
            return
        }

        if (!user) {
            setModalMessage('Please log in to book a call.')
            setModalSuccess(false)
            setIsModalOpen(true)
            return
        }

        setLoading(true)

        const selectedDateTime = new Date(`${date}T${time.format('HH:mm')}`)

        const res = await fetch('http://localhost:5000/api/bookCall', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user?.id,
                volunteerId: selectedVolunteer?._id,
                time: selectedDateTime,
                duration: parseInt(duration),
            }),
        })

        const data = await res.json()
        setLoading(false)

        if (res.ok && data.success) {
            setModalMessage('Booking successful!')
            setModalSuccess(true)
            setIsModalOpen(true)
            setDate('')
            setTime(null)
            setDuration('30')
        } else {
            setModalMessage('Booking failed: ' + data.message)
            setModalSuccess(false)
            setIsModalOpen(true)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 m-10">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Book Call with {selectedVolunteer?.name}
                </h2>

                <div className="mb-4 text-center">
                    <img
                        src={selectedVolunteer?.image || '/images/default.jpg'}
                        alt={selectedVolunteer?.name}
                        className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                </div>

                <label className="block mb-3 text-left">
                    Date:
                    <input
                        type="date"
                        className="block w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>

                <label className="block mb-3 text-left">
                    Time:
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label=""
                            value={time}
                            onChange={(newVal) => setTime(newVal)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    size: 'small',
                                },
                            }}
                        />
                    </LocalizationProvider>
                </label>

                <label className="block mb-4 text-left">
                    Duration (minutes):
                    <select
                        className="block w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    >
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="60">60</option>
                    </select>
                </label>

                <div className="justify-between mt-4">
                    <SubmitButton
                        onClick={handleBookCall}
                        loading={loading}
                    >
                        Confirm Booking
                    </SubmitButton>
                    <button
                        className="text-gray-500 hover:text-black"
                        onClick={handleBackToChat}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <PopupModal
                    message={modalMessage}
                    success={modalSuccess}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}
