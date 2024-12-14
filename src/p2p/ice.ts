let iceServers: any[];
let formattedIceArray: any[];
const fetchIceServers = async () => {
    const response = await fetch('https://global.xirsys.net/_turn/word-game', {
        method: 'PUT',
        headers: {
            Authorization: 'Basic ' + btoa('jtrimm007:d39ed6e2-560a-11ef-9b6d-0242ac150003'), // Replace with your credentials
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()

    if (data.v) {
        iceServers = data.v.iceServers
        return data.v.iceServers
    } else {
        console.error('Failed to get ICE servers from Xirsys')
        return []
    }
}

const formatIceArray = () => {
    formattedIceArray = [
        {
            urls: iceServers[0].urls || iceServers[0].url
        },
        {
            urls: iceServers[3].urls || iceServers[3].url,
            credential: iceServers[3].credential,
            username: iceServers[3].username
        },
        {
            urls: iceServers[4].urls || iceServers[4].url,
            credential: iceServers[4].credential,
            username: iceServers[4].username
        }
    ]
    return formattedIceArray;
}

export default async () => {
    await fetchIceServers()
    formatIceArray()

    return {
        formattedIceArray
    }
}