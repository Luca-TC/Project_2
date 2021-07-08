module.exports = {
    sessionActive: req => (req.session?.currentUser ? true : false),

    role: (req, ...rolesToCheck) => rolesToCheck.includes(req.session.currentUser?.role),

    randomToken: () => {
        let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let randomToken = ''
        for (let i = 32; i > 0; --i) randomToken += str[Math.floor(Math.random() * str.length)]
        return randomToken
    },

    currentUser: (req) => {
        if (req.session.currentUser) return req.session.currentUser
        // return req.session ? req.session?.currentUser : null
    },


    emails: (type, objectNeeded, accepted) => {
        if (type === 'email') {
            return {
                from: 'My project B&BIDAS',
                to: objectNeeded.username,
                subject: 'Welcome to B&BIDDAS, confirmation link ',
                text: '',
                html: `'<h1> Welcome to B&BIDDAS</h1><br>
                <a href="http://localhost:3000/confirmation/email/${objectNeeded.token_confirmation}">Get confirmed</a>`,
            }
        }
        if (type === 'host' && !accepted) {
            return {
                from: 'Rejected request B&BIDAS',
                to: objectNeeded,
                subject: 'Hi, we are sorry, request rejected, Not trusted info or place not avail',
                text: 'oh yeah',
                html: `SO SORRY Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe fuga perferendis ratione! Cum deserunt labore culpa, ducimus placeat quasi libero quibusdam sed eos quas vero optio voluptas itaque distinctio ullam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nulla, ullam deleniti ut, aliquam reiciendis recusandae ducimus minus placeat molestiae sed deserunt ex sapiente tempore alias nemo. Iusto, doloribus omnis!`,
            }
        }
        if (type === 'host' && accepted) {
            return {
                from: 'Accepted request ! from B&BIDAS',
                to: objectNeeded.username,
                subject: 'Hi, request accepted on your B&BIDAS profile',
                text: 'oh yeah',
                html: `<h1>WE ARE SO HAPPY to have you</h1>Contact us at 512981317 for details, Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe fuga perferendis ratione! Cum deserunt labore culpa, ducimus placeat quasi libero quibusdam sed eos quas vero optio voluptas itaque distinctio ullam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nulla, ullam deleniti ut, aliquam reiciendis recusandae ducimus minus placeat molestiae sed deserunt ex sapiente tempore alias nemo. Iusto, doloribus omnis!`,
            }
        }
        if (type === 'customMessage') {

            let subject = `Place accepted in B&BIDDAS, & you become promoted to host`
            let content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptate nostrum consectetur amet, autem cumque repellat asperiores aperiam aliquid repudiandae ea omnis est quod. Explicabo magnam aliquam maxime fugit ipsam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae a quos fugit vitae repudiandae voluptates reiciendis mollitia aperiam odio consectetur recusandae beatae, quia asperiores eius esse. Hic incidunt minima tempora?`

            if (objectNeeded.subject !== '') subject = objectNeeded.subject
            if (objectNeeded.answer !== '') content = objectNeeded.answer


            console.log(objectNeeded.elm)
            return {
                from: 'My project B&BIDAS',
                to: objectNeeded.elm.host_id.username,
                subject: subject,
                text: content,
                html: content,
            }
        }
    },
}
