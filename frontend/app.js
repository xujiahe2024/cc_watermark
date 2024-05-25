document.getElementById('Uploadform').addEventListener('submit',async function (e) {
    e.preventDefault();

    const Videofile = document.getElementById('Videofile').files[0];
    const Videourl = document.getElementById('Videourl').value;
    const Watermarkimage = document.getElementById('Watermarkimage').files[0];

    if (!Videofile && !Videourl) {
        alert('Please upload a video or url');
        return;
    }

    if(!Watermarkimage) {
        alert('Please upload a watermark image');
        return;
    }

    const Formdata = new Formdata();
    if (Videofile) Formdata.data.append('Videofile', Videofile);
    if (Videourl) Formdata.data.append('Videofile', Videourl);
    Formdata.append('Watermarkimage',  Watermarkimage);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: Formdata
        });

        if (response.ok) {
            const result = await response.json();
            alert('Upload successful! Your job id is:' + result.Jobid);
        } else {
            alert('Upload failed, please try again!')
        }
 
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error happened, please try again!')
    }
});

document.getElementById('Checkstatus').addEventListener('click', async function () {
    const Jobid = document.getElementById('Jobid').value;
    if(!Jobid){
        alert('Please enter a job id');
        return;
    }

    try {
        const response = await fetch('/status?Jobid=${Jobid}');
        if (response.ok) {
            const result = await response.json();
            const progress = result.progress;
            document.getElementById('progress').innerText = 'Progress: ${progress}';
            if (progres === 100) {
                document.getElementById('DownloadLink').href = `/download?Jobid=${Jobid}`;
            } else {
                alert('Your task is still in process!')
            }
        } else {
            alert('Fail to get statuts!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error happened, please try again!');

    }
});