import {exec} from 'child_process'

function connectToSSID (SSID) {
    try {
        exec(`networksetup -setairportnetwork en0 ${SSID}`,(err, stdout, stderr) => {
            if(err){
                console.error('Could not connect to device',SSID)
                 console.log(err)
            }
        })
        console.log(`Connected to ${SSID}`)
        return 0       
    } catch (error) {
        console.log('Error Creating File',error)
        return -1
    }   
}


connectToSSID(`ShellyPlugUS-083AF201BDB8`)


// ➜  smallProjects networksetup -setairportnetwork en0 ShellyPlugUS-083AF201BDB8 
