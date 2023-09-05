import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [bodyPart, setBodypart] = useState("all");
  const [target, setTarget] = useState("all");
  const [equipment, setEquipment] = useState("all");
  const [search, setSearch] = useState("");

  const listOfbodyparts = [
    "back",
    "cardio",
    "chest",
    "lower arms",
    "lower legs",
    "neck",
    "shoulders",
    "upper arms",
    "upper legs",
    "waist",
  ];
  const listOfTargetMuscles = [
    "abductors",
    "abs",
    "adductors",
    "biceps",
    "calves",
    "cardiovascular system",
    "delts",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "levator scapulae",
    "pectorals",
    "quads",
    "serratus anterior",
    "spine",
    "traps",
    "triceps",
    "upper back",
  ];
  const listOfEquipment = [
    "assisted",
    "band",
    "barbell",
    "body weight",
    "bosu ball",
    "cable",
    "dumbbell",
    "elliptical machine",
    "ez barbell",
    "hammer",
    "kettlebell",
    "leverage machine",
    "medicine ball",
    "olympic barbell",
    "resistance band",
    "roller",
    "rope",
    "skierg machine",
    "sled machine",
    "smith machine",
    "stability ball",
    "stationary bike",
    "stepmill machine",
    "tire",
    "trap bar",
    "upper body ergometer",
    "weighted",
    "wheel roller",
  ];

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };
    await fetch("https://exercisedb.p.rapidapi.com/exercises", options)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex items-end p-3 gap-3 flex-col-reverse md:flex-row-reverse">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full h-11 px-5 outline-none border-0 rounded-lg bg-whit text-neutral-900"
        />
        <div className="flex w-full justify-center flex-row gap-3">
          <div className="text-center">
            <h1 className="p-1 whitespace-nowrap">body part</h1>
            <select
              className="text-neutral-900 outline-none border-0 p-1 rounded-md w-full"
              value={bodyPart}
              onChange={(e) => setBodypart(e.target.value)}
            >
              <option value="all" defaultChecked>
                all
              </option>
              {listOfbodyparts.map((bp, i) => (
                <option value={bp} key={i}>
                  {bp}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center">
            <h1 className="p-1 whitespace-nowrap">target muscle</h1>
            <select
              className="text-neutral-900 outline-none border-0 p-1 rounded-md w-full"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            >
              <option value="all" defaultChecked>
                all
              </option>
              {listOfTargetMuscles.map((bp, i) => (
                <option value={bp} key={i}>
                  {bp}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center">
            <h1 className="p-1 whitespace-nowrap">equipment</h1>
            <select
              className="text-neutral-900 outline-none border-0 p-1 rounded-md w-full"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            >
              <option value="all" defaultChecked>
                all
              </option>
              {listOfEquipment.map((bp, i) => (
                <option value={bp} key={i}>
                  {bp}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="cards">
        {data.length !== 0 ? (
          data.map((d) =>
            (bodyPart === "all" || d.bodyPart === bodyPart) &&
            (target === "all" || d.target === target) &&
            (equipment === "all" || d.equipment === equipment) &&
            (search === "" || d.name.includes(search.toLocaleLowerCase())) ? (
              <div
                key={d.id}
                className="bg-white text-neutral-900 rounded-lg overflow-hidden"
              >
                <h1 className="p-2 font-semibold">
                  <b>Exercise Name: </b>
                  {d.name}
                  <br />
                  <b>Target Muscle: </b>
                  {d.target}
                  <br />
                  <b>Equipment: </b>
                  {d.equipment}
                </h1>
                <img src={d.gifUrl} alt="test" />
              </div>
            ) : undefined
          )
        ) : (
          <h1 className="">No Data</h1>
        )}
      </div>
      <button  
        onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth', // This makes the scroll smooth
        })}
        className="fixed bottom-5 right-5 bg-red-300 text-neutral-900 rounded-full w-10 h-10 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
        >
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </button>
    </div>
  );
}

export default App;
