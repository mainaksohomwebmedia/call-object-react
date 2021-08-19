const newRoomEndpoint =
  `${window.location.origin}/api/rooms`;

/**
 * Create a short-lived room for demo purposes.
 *
 * It uses the redirect proxy as specified in netlify.toml`
 * This will work locally if you following the Netlify specific instructions
 * in README.md
 *
 * See https://docs.daily.co/reference#create-room for more information on how
 * to use the Daily REST API to create rooms and what options are available. 
 */
async function createRoom() {

  const fetch = require('node-fetch');

const url = 'https://api.daily.co/v1/rooms';
const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer 7695b1b86071d67c8db02b8613a0fb16de4dfcde699e1d5281a142b74ee6d373'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
  alert(json.id);
  // const exp = Math.round(Date.now() / 1000) + 60 * 30;
  // const options = {
  //   properties: {
  //     exp: exp,
  //   },
  // };
  // let response = await fetch(newRoomEndpoint, {
  //   method: "POST",
  //   body: JSON.stringify(options),
  //   mode: 'cors',
  // }),
  //   room = await response.json();
  //  alert(newRoomEndpoint);
  //    //return room;

  // Comment out the above and uncomment the below, using your own URL
  // return { url: "https://govirtual.daily.co/room1509163982" };
}

export default { createRoom };
