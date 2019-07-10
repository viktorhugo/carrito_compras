import app from './app.js';

async function main(){
    await app.listen(process.env.PORT || 9000)
    console.log(`App listening on port ${process.env.PORT} 9000!`)
}

main()