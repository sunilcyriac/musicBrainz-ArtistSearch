# music-brainz-microservice

MusicBrainz Artist Search App
![Alt text](screenshots/searchScreen.jpg?raw=true "Search Screen-Main Page")
![Alt text](screenshots/searchResults.jpg?raw=true "Search Screen-Results Page")
![Alt text](screenshots/albumDetails.jpg?raw=true "Search Screen-Album Details Page")


Backend code is in server/
Frontend code is in client/

Backend code:
- This is built with Nodejs on express.
- There are 2 apis endpoints which can be used for the following
	1. /search/artist : This can be used for fetching the artist data from the musicbrainz serach/artist api. This will give a collection of artist details (ex: name, country, gender etc). The header param required here is just the name
		Sample call: http://localhost:3001/search/artist?query=miley%20cyrus
		Note: If the searched artist name is only found for one artist then the it will hit another api  ex: https://musicbrainz.org/ws/2/artist/99513c45-6c2d-4a6b-a089-074360591f01?inc=release-groups&fmt=json which will fetch all the releases (albums) of that single artist.
		Both the calls will be handled with only one endpoint.
	2. /search/releasesByArtist : This can be used for fetching the release (album releases) for any artist. The parameter required here is the mbid (which is a musibrainz unique id given to a single artist). This can be used if the frontend app is added with feature if more details on a user need to be shown with their releases.
		Ex: http://localhost:3001/search/releasesByArtist/?query=99513c45-6c2d-4a6b-a089-074360591f01
		
Frontend code:
- This is built with Reactjs with some bootstrap and google material ui components.
- Have kept the front end code simple with just a single page with a search bar where we can enter the name of an artist and it shows the matching artists name as a list below. Its a dynamic search so no need to press enter or click any button.
  Once the name is typed it hits the /search/artist api in the backend and in the frontend it shows only the list of names.
  Then click on any name in the search list it will display a simple album list of the artist in a contentmodal.
  
To get this running now:
1. Clone the project
2. Run ``` npm install
		``` in server/ and client/ directories separately 
3. Then ```npm start``` in server/ and client/ directories separately