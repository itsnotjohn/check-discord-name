(async () => {
    const token = ''; //ur token account
    const password = ''; //ur discord password
    const length = '3'; //length for characters in ur name

    while (true) {
        const randomUsername = makeId(length);
      
        const response = await fetch('https://discord.com/api/v9/users/@me', {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "username": randomUsername,
                "password": password
            })
        });
      
        console.log(`Username in use: ${randomUsername}`);

        const resp = await response.json();
        if (resp.captcha_key) 
            return console.log(`\nAvaliable name: ${randomUsername}`);

        await new Promise((res) => setTimeout(res, 3500));
    }

    //https://stackoverflow.com/a/1349426
    function makeId(length) {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
})();
