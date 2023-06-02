import { useState, useEffect } from "react";


export default function App() {
  const [state, setState] = useState();

  const array = [
    {
      "id":"6479c19af6453ff0d0e7519b",
      "title":"Hello world!",
      "description":"Hello world from data base",
      "date":"02.06.23"
    },
    {
      "id":"6479c1c3f6453ff0d0e7519d",
      "title":"Hello world again!",
      "description":"Just for company",
      "date":"02.06.23"
    },
    {
      "id":"6479c1e0f6453ff0d0e7519f",
      "title":"Hello world again!",
      "description":"Because i like it",
      "date":"02.06.23"
    },
    {
      "id":"6479c241f6453ff0d0e751a3",
      "title":"Hello crunch AI!",
      "description":"Job done",
      "date":"02.06.23"
    }]

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "http://localhost:4000/messages/", {method: "GET", mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
        }
        )
      ).text();
        console.log(data)
      setState(data);

    };

    dataFetch();

    
  }, []);
  
  return (
    <ul>
      <li>{state}</li>
          {/* {state?.map((item) => (
            <p key={item.id}>
              {item.title}
            </p>
          ))} */}
    </ul>
  );
}

