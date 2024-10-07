import React, { useEffect, useState } from 'react'
import './meal.css'

// If we don't use the map method, we won't be able to render the mealData array in the UI. 
// The map method is used to iterate over the mealData array and return a new array of JSX elements, which are then rendered in the UI.
// Without the map method, the mealData array would not be iterated over, and the UI would not display the individual meal items.

//1). setArea collect the demand of user, and area is used to change the endpoint of url..
//2). setMealdata collect the output or data from the endpoint and mealData filter the data and show in ui..

const Meal = () => {

  const [mealData, setMealData] = useState([]);   // setMealdata is contain set of object, and mealData is used for map the data,
 // and collect useful data...

  const [area, setArea] = useState('indian');  // by Default...
  
  const [inputData, setInputData] = useState();
  
  useEffect(() => {

    const fetchDataFromApi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);  // for providing area..// value is update by setArea..
      // The useEffect hook is used to fetch data from the API when the component mounts or when the area state variable changes.

      const data = await response.json();      // parse the response data

      console.log(data.meals);   // data.meals beacuse we found data in object..
      
      setMealData(data.meals); // update the state of counter instead of empty array, we fill counter with data.meals.  
    };

    fetchDataFromApi();
  }, [area]);  // because in refresh we can see the indian food...

  const submitHandler = async(e) =>{
    e.preventDefault();

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`);  // for providing area..// value is update by setArea..
      const data = await response.json();
      console.log(data.meals);   // data.meals beacuse we found data in array of objects.
      setMealData(data.meals);   // setMealData is show the data in ui using map, thats why we pass data.meals on it...
      setInputData(" ");
  }

  return (
    <>
      <div className="my-3" style={{
        width: "900px",
        textAlign: "center",
        margin: "auto",
        marginBottom: "2rem"

      }}>
        < div className="mx-auto text-center">   {/* margin - auto */}
          {/* setArea is used to update the value of area, in starting the value of area is indian
              after  that we update the value of area by clicking on button. */}

          {/* for parameter we can use arrow function in onCLick event.. */}
          <button onClick={() => setArea("Indian")} type="button" className="btn btn-outline-secondary mx-3"> Indian </button>
          <button onClick={() => setArea("Canadian")} type="button" className="btn btn-outline-success my-3"> Canadian</button>
          <button onClick={() => setArea("american")} type="button" className="btn btn-outline-primary mx-3"> Chinese </button>
          <button onClick={() => setArea("thai")} type="button" className="btn btn-outline-danger mx-3"> American</button>
          <button onClick={() => setArea("british")} type="button" className="btn btn-outline-warning mx-3"> Italy </button>
          <button onClick={() => setArea("russian")} type="button" className="btn btn-outline-info mx-3"> British </button>

        </div>
      </div>

      <form onSubmit={submitHandler} style={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        marginBottom: "0.5rem"
      }}>
      <input onChange={(e)=>setInputData(e.target.value)} type="text" />  {/* this is neccessary to make inputdata, 
      beacause we not filter the data, we input the data.. */}
      </form> 

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}>

        {mealData.map((data) =>
          <div key={data.idMeal} style={{ textAlign: "center", width: "210px", }}>    {/* id from data in console..*/}
            <div>    {/* image name in object..*/}
              <img src={data.strMealThumb} alt='' style={{
                width: "200px",
                height: "200px",
                borderRadius: "10px",
                border: "2px solid blue"
              }} />

            </div>
            <h3>{data.strMeal}</h3>
          </div>)}
      </div>
    </>
  )
}

export default Meal