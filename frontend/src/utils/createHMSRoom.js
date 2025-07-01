export async function createRoom() {
    const res = await fetch('http://localhost:5000/api/createRoom', {
        method: "POST",
    });

    const data = await res.json();

    if (!data || !data.id) return null;

    const roomUrl = `https://brighter-beyond-videoconf-1792.app.100ms.live/meeting/${data.roomCode}`;
    return roomUrl;

    // return "https://brighter-beyond-videoconf-1792.app.100ms.live/meeting/bqn-cnyj-eho";
}
