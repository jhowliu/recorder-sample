let recorder;
let mediaStream = null;

// get stream from user's microphone (Web API)
function captureUserMedia(callback) {
    let session = {
        audio: true,
        video: false
    };

    navigator.getUserMedia(session, callback, function(err) {
        alert('Unable access your microphone. Please check log in the console.');
        console.error(error);
    });
}

function startRecording(e) {
    captureUserMedia(function(audioStream) {
        mediaStream = audioStream;
        
        recorder = RecordRTC(audioStream, {
            type: 'audio',
            recorderType: StereoAudioRecorder,
            numberOfAudioChannels: 1
        })

        recorder.startRecording();
    })

};

function stopRecording(e) {
    recorder.stopRecording(postFile);
};

function postFile() {
    let blob = recorder.getBlob();
    let filename = generateRandomString() + '.wav';

    let file = new File([blob], filename, {
        type: 'audio/wav'
    });

    xhr('/upload', file, function(res) {
        console.log(file);
        console.log(res);
    })

    if (mediaStream) mediaStream.stop();
}

// AJAX
function xhr(url, data, callback) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText);
        }
    };

    request.open('POST', url);

    let formData = new FormData();

    formData.append('file', data);
    request.send(formData);
}

function generateRandomString() {
    return (Math.random() * new Date().getTime()).toString(32).replace( /\./g , '');
}

