import "./css/bootstrap.min.css"
import "./js/bootstrap.bundle.min"

const fetchData = async (query) => {
    const url = "https://steam2.p.rapidapi.com/search/" + query + "/page/1";
    const options = {
    method: 'GET',
    headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
    'x-rapidapi-host': 'steam2.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if(result.length == 0){
            document.querySelector(".dynamic_data").innerHTML=``
            document.querySelector(".dynamic_data").innerHTML=`<div class="p-2">
				<div class="alert alert-warning m-auto" role="alert">
					No results found with this name...
				</div>
			</div>`
        }
        else{
            handleData(result);
        }
        } catch (error) {
            console.error(error);
        }
    };
    // Call the fetchData function to see the results in the console
function handleData(json){
    console.log(json)
    document.querySelector(".dynamic_data").innerHTML=``
    json.forEach(user => {
        document.querySelector(".dynamic_data").innerHTML+=`
        <div class="col">
            <article class="card">
                <img src="${user.imgUrl}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${user.title}</h5>
                    <p class="card-text">
                    ${user.reviewSummary}
                    </p>
                    <a href="${user.url}" target="_blank" class="btn btn-primary">
						View on Steam
						<img src="/steam.svg" alt="steam icon" />	
					</a>
                </div>
            </article>
        </
`
    });
}
    // Add event listener to the button
document.getElementById('searchButton').addEventListener('click', () => {
    // we get the input value and pass it in the param
    document.querySelector(".dynamic_data").innerHTML= '<div class="d-flex justify-content-center m-5"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>'
    const query = document.getElementById('searchInput').value;
    fetchData(query)

    });

