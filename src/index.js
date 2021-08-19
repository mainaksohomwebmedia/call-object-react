import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import BrowserUnsupported from './components/BrowserUnsupported/BrowserUnsupported';
import DailyIframe from '@daily-co/daily-js';

ReactDOM.render(
  DailyIframe.supportedBrowser().supported ? <App /> : <BrowserUnsupported />,
  document.getElementById('root')
);

// {
//   "local": {
//       "session_id": "7e8f01f8-4e0b-4314-d561-68171d9190eb",
//       "user_name": "",
//       "user_id": "7e8f01f8-4e0b-4314-d561-68171d9190eb",
//       "joined_at": "2021-08-19T09:36:42.975Z",
//       "local": true,
//       "owner": false,
//       "will_eject_at": "1970-01-01T00:00:00.000Z",
//       "audio": true,
//       "video": true,
//       "screen": false,
//       "tracks": {
//           "audio": {
//               "state": "playable",
//               "track": {
//                   "_managedByDaily": true
//               },
//               "persistentTrack": {
//                   "_managedByDaily": true
//               }
//           },
//           "video": {
//               "state": "playable",
//               "track": {
//                   "_managedByDaily": true
//               },
//               "persistentTrack": {
//                   "_managedByDaily": true
//               }
//           },
//           "screenVideo": {
//               "state": "off",
//               "off": {
//                   "byUser": true
//               },
//               "persistentTrack": null
//           },
//           "screenAudio": {
//               "state": "off",
//               "off": {
//                   "byUser": true
//               },
//               "persistentTrack": null
//           }
//       },
//       "cam_info": {},
//       "screen_info": {},
//       "record": false,
//       "audioTrack": {
//           "_managedByDaily": true
//       },
//       "videoTrack": {
//           "_managedByDaily": true
//       }
//   },
//   "f616daa9-7ab9-45ee-e171-55031e8db0aa": {
//       "session_id": "f616daa9-7ab9-45ee-e171-55031e8db0aa",
//       "user_name": "",
//       "user_id": "f616daa9-7ab9-45ee-e171-55031e8db0aa",
//       "joined_at": "2021-08-19T09:36:36.837Z",
//       "local": false,
//       "owner": false,
//       "will_eject_at": "1970-01-01T00:00:00.000Z",
//       "audio": true,
//       "video": true,
//       "screen": false,
//       "tracks": {
//           "audio": {
//               "subscribed": true,
//               "state": "playable",
//               "track": {},
//               "persistentTrack": {}
//           },
//           "video": {
//               "subscribed": true,
//               "state": "playable",
//               "track": {},
//               "persistentTrack": {}
//           },
//           "screenVideo": {
//               "subscribed": true,
//               "state": "off",
//               "off": {
//                   "byUser": true
//               },
//               "persistentTrack": {}
//           },
//           "screenAudio": {
//               "subscribed": true,
//               "state": "off",
//               "off": {
//                   "byUser": true
//               },
//               "persistentTrack": {}
//           }
//       },
//       "cam_info": {},
//       "screen_info": {},
//       "record": false,
//       "audioTrack": {},
//       "videoTrack": {}
//   }
// }
