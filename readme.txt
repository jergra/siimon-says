March 6, 2022

C:\dev\simon-says

Simon Says game

start:
    npm start

deployed:
    https://simon-says-react-app.vercel.app/

update:
    git add .
    git commit -m 'message'
    git push


See:    C:\dev\simon-says-app (by 'techsith' from his YouTube video)
for a much better implementation of the game logic using an object
as the game state. We set elements (e.g. score) within the object ('game') like this:
    
    setGame({...game, score: currentScore})

    techsith's video and github:

    Simon Says Game in React
    https://www.youtube.com/watch?v=EGRAKMNkyFg&t=934s&ab_channel=techsith

    github for techsith's build:
        https://github.com/techsithgit/simon-says

