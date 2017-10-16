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
    captureUserMedia(function(stream) {
        mediaStream = stream;
        
        recorder = RecordRTC(mediaStream, {
            type: 'audio',
            recorderType: MediaStreamRecorder
        })

        recorder.startRecording();
    })

};

function stopRecording(e) {
    recorder.stopRecording();
    recorder.save('audio/tmp.wav');
    recorder.reset();
};

function postFile() {
    let blob = recorder.getBlob();
    let filename = generateRandomString() + '.webm';

    let file = new File([blob], filename, {
        type: 'audio/webm'
    });

    xhr2('/upload', file, function(res) {
        console.log(res);
    })

    if (mediaStream) mediaStream.stop();
}

// AJAX
function xhr2(url, data, callback) {
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

