export const fileUpload = async(file) => {
    const CloudUrl = 'https://api.cloudinary.com/v1_1/dk82ead5h/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal-app');
    formData.append('file', file);


    try {
        const resp = await fetch(CloudUrl, {
            method: 'POST',
            body: formData
        });

        if (resp.ok) {

            const CloudResp = await resp.json();
            return CloudResp.secure_url
        } else {

            throw await resp.json();

        }
    } catch (error) {
        console.log(error);

    }



}