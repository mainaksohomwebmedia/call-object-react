import React, { useEffect, useMemo, useRef } from 'react';
import './Tile.css';

function getTrackUnavailableMessage(kind, trackState) {
    if (!trackState) return;
    switch (trackState.state) {
        case 'blocked':
            if (trackState.blocked.byPermissions) {
                return `${kind} permission denied`;
            } else if (trackState.blocked.byDeviceMissing) {
                return `${kind} device missing`;
            }
            return `${kind} blocked`;
        case 'off':
            if (trackState.off.byUser) {
                return `${kind} muted`;
            } else if (trackState.off.byBandwidth) {
                return `${kind} muted to save bandwidth`;
            }
            return `${kind} off`;
        case 'sendable':
            return `${kind} not subscribed`;
        case 'loading':
            return `${kind} loading...`;
        case 'interrupted':
            return `${kind} interrupted`;
        case 'playable':
            return null;
    }
}

/**
 * Props
 * - videoTrackState: DailyTrackState?
 * - audioTrackState: DailyTrackState?
 * - isLocalPerson: boolean
 * - isLarge: boolean
 * - disableCornerMessage: boolean
 * - onClick: Function
 */
export default function Tile(props) {
    const videoEl = useRef(null);
    const audioEl = useRef(null);

    const videoTrack = useMemo(() => {
        return props.videoTrackState && props.videoTrackState.state === 'playable' ?
            props.videoTrackState.track :
            null;
    }, [props.videoTrackState]);

    const audioTrack = useMemo(() => {
        return props.audioTrackState && props.audioTrackState.state === 'playable' ?
            props.audioTrackState.track :
            null;
    }, [props.audioTrackState]);

    const videoUnavailableMessage = useMemo(() => {
        return getTrackUnavailableMessage('video', props.videoTrackState);
    }, [props.videoTrackState]);

    const audioUnavailableMessage = useMemo(() => {
        return getTrackUnavailableMessage('audio', props.audioTrackState);
    }, [props.audioTrackState]);

    /**
     * When video track changes, update video srcObject
     */
    useEffect(() => {
        videoEl.current &&
            (videoEl.current.srcObject = new MediaStream([videoTrack]));
    }, [videoTrack]);

    /**
     * When audio track changes, update audio srcObject
     */
    useEffect(() => {
        audioEl.current &&
            (audioEl.current.srcObject = new MediaStream([audioTrack]));
    }, [audioTrack]);

    function getVideoComponent() {
        return videoTrack && < video autoPlay muted playsInline ref = { videoEl }
        />;
    }

    function getAudioComponent() {
        return (!props.isLocalPerson &&
            audioTrack && < audio autoPlay playsInline ref = { audioEl }
            />
        );
    }

    function getOverlayComponent() {
        // Show overlay when video is unavailable. Audio may be unavailable too.
        return (
            videoUnavailableMessage && ( <
                p className = "overlay" > { videoUnavailableMessage } {
                    audioUnavailableMessage && ( <
                        >
                        <
                        br / > { audioUnavailableMessage } <
                        />
                    )
                } <
                /p>
            )
        );
    }

    function getCornerMessageComponent() {
        // Show corner message when only audio is unavailable.
        return (!props.disableCornerMessage &&
            audioUnavailableMessage &&
            !videoUnavailableMessage && ( <
                p className = "corner" > { audioUnavailableMessage } < /p>
            )
        );
    }

    function getClassNames() {
        let classNames = 'tile';
        classNames += props.isLarge ? ' large' : ' small';
       // classNames += ' large';
        props.isLocalPerson && (classNames += ' local');
        classNames += ' ' + props.dataid;

        return classNames;
    }

    function getDataId() {
        //return props.dataid;

    }

    function sendUserData(dataid) {
        let url_string = window.location.href; //window.location.href
        let url = new URL(url_string);
        let c = url.searchParams.get("roomUrl");
        console.log("roomUrl: " + c);
        if(c!=""){
            let roomid = c.replace("https://govirtual.daily.co/", "");

            console.log("roomid: " + roomid);
            let sendurl = 'https://demo.bigwavedevelopment.com/goVirtual/roomInfoJson/ajax_request.php?userid=' + dataid + '&roomid=' + roomid;
            console.log(sendurl);
            fetch(sendurl)
                .then(results => results.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        items: json
                    })
                });
        }
    }
    function getJsonStyle(dataid) {
        let url_string = window.location.href; //window.location.href
        let url = new URL(url_string);
        let c = url.searchParams.get("roomUrl");
        console.log("roomUrl: " + c);
        if(c!=""){
            let roomid = c.replace("https://govirtual.daily.co/", "");

            console.log("roomid: " + roomid);
            let geturl = 'https://demo.bigwavedevelopment.com/goVirtual/roomInfoJson/get_room.php?userid=' + dataid + '&roomid=' + roomid;
            console.log(geturl);
            let datah = fetch(geturl)
            .then(res => res.json())
            .then(out =>{
                console.log('Checkout this JSON! ', out)
                //</p>console.log( out.room_id);
                document.getElementById('tile_'+dataid).style.top=out.top
                document.getElementById('tile_'+dataid).style.left=out.left
            });
            
            //console.log(datah.room_id);
        }
    }

    return ( <
        div className = { getClassNames() }
        onClick = { props.onClick }
        id = { 'tile_'+props.dataid } style={getJsonStyle(props.dataid)}>
        <
        div className = "background" / > { getDataId() } { getOverlayComponent() } { getVideoComponent() } { getAudioComponent() } { getCornerMessageComponent() } { sendUserData(props.dataid) } <
        /div>
    );
}