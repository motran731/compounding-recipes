"use client";

import { DarkThemeToggle } from "flowbite-react";
import Navbar from "./Navbar";
import { useState } from "react";

interface Ingredient {
  id: number;
  quantity: number;
  unit: string;
  name: string;
}

const testItems = [
  {
    id: 1,
    quantity: 40,
    unit: "ml",
    name: "Viscous Lidocaine 2%",
  },
  { id: 2, quantity: 40, unit: "ml", name: "Maalox" },
  { id: 3, quantity: 40, unit: "ml", name: "Diphenhydramine" },
];

export default function Home() {
  const [items, setItems] = useState([]);

  return (
    <div>
      <Navbar />
      <IngredientList ingredients={items} setItems={setItems} />
    </div>
  );
}

interface IngredientListProps {
  ingredients: Array<Ingredient>;
  setItems: Function;
}

function IngredientList(props: IngredientListProps) {
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");

  function handleAdd(event: any) {
    event.preventDefault();

    const newIngredient = { quantity, unit, name, id: Date.now() };
    console.log(newIngredient);

    // props.setItems((prev: Array<Ingredient>) => {
    //   let x = [
    //     // with a new array
    //     ...prev, // that contains all the old items
    //     newIngredient,
    //   ];

    //   console.log(x);
    // });

    let old = props.ingredients.slice();
    old.push(newIngredient);
    props.setItems(old);

    // setItems((items) => [...items, item]);

    // props.setItems((newIngredient: any) => [...newIngredient]);
  }

  function handleDelete() {
    console.log("iv been deleted");
  }

  return (
    <div className="container max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Title : Magic Mouthwash
      </h1>
      <div className="form">
        <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Ingredients
        </h5>
        <input
          type="text"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
        <span>
          <button
            type="button"
            onClick={handleAdd}
            className="mb-2 me-2 rounded-full border border-gray-200 bg-white p-4 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            {" "}
            ➕ Add
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="me-2rounded-full mb-2 border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            ❌ Delete
          </button>
        </span>
        <div className="list">
          <ul>
            {/* {props.ingredients.map((item: Ingredient) => (
              <li key={item.id}>
                {" "}
                {item.quantity} {item.unit} {item.name} */}

            {props.ingredients.map((item: Ingredient) => (
              <li key={item.id}>
                {" "}
                {item.quantity} {item.unit} {item.name}
              </li>
            ))}
            <li></li>
          </ul>

          <form>
            <div className="mb-6 grid gap-6 md:grid-cols-5">
              <div>
                <label
                  htmlFor="quantity_input"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity_input"
                  value={quantity}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  onChange={(event) => setQuantity(Number(event.target.value))}
                />
              </div>
              <div>
                <label
                  htmlFor="unit_input"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Unit
                </label>
                <input
                  type="text"
                  id="unit_input"
                  value={unit}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  onChange={(event) => setUnit(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="name_input"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Medication Name
                </label>
                <input
                  type="text"
                  id="name_input"
                  value={name}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="mb-2 me-2 rounded-full border border-gray-200 bg-white p-4 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                {" "}
                ➕ Add
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="me-2rounded-full mb-2 border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                ❌ Delete
              </button>
            </div>
          </form>
        </div>
        {/* <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Preparation
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <a
        href="#"
        className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a> */}
      </div>
    </div>
  );
}
