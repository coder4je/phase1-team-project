fetch("https://www.thecolorapi.com/scheme?rgb=rgb(0,71,171)", {
	Method: 'GET',
	headers: {
		'Content-type': 'application/json'
	}
}
)
.then(res => res.json())
.then(data => console.log(data))

