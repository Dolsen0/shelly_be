import fetch from "node-fetch";

try{
    await fetch('http://192.168.33.1/rpc/Shelly.GetStatus');
} catch (error) {
    console.log(error);
}
