const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			plans: [],
			exercises: [],
			client_token: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			addExercises: exercise => {
				setStore({ exercises: [...getStore().exercises, exercise] });
			},
			//getaPlan: () => {
			//	const store = getStore();
			//const token = localStorage.getItem("jwt-token");

			//	fetch(process.env.BACKEND_URL + `/plans/ ${store.plans}`, {
			//		headers: {
			//			"Content-Type": "application/json",
			//			Authorization: "Bearer " + token
			//		}
			//	});

			//	const responseJson = response.json();

			//	return responseJson;
			//},
			setClientToken: token => {
				setStore({ client_token: token });
			}
		}
	};
};

export default getState;
