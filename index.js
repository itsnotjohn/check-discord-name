(async () => {
    const token = ''; //ur token account
    const password = ''; //ur discord password
    const length = '3'; //desired number of name characters

    const sleep = (time) => new Promise((res) => setTimeout(res, time));
    
    while (true) {
        const id = makeId(length);
        const response = await fetch('https://discord.com/api/v9/users/@me', {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "username": id,
                "password": password
            })
        });

        const resp = await response.json();
        if (resp.captcha_key)
            return console.log(`\nNome disponível: ${id}`);

        const error = resp?.errors?.username?._errors[0].code;
        console.log(`${error}: ${id}`);

        await sleep(3500);
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
