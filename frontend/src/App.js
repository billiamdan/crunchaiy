import { useState, useEffect } from "react";


export default function App() {
  const [state, setState] = useState([]);


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
      ).json();
        console.log(data)

      setState(data)
    };

    dataFetch();

    
  }, []);
  
  return (
    <ul>
          {state.map((item) => (
            <li>
              <p key={item.id}>
                {item.title}
              </p>
              <p key={item.id}>
                {item.description}
              </p>
            </li>
          ))}
    </ul>
  );
}
