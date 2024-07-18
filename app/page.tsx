import { DarkThemeToggle } from "flowbite-react";
import Navbar from "./Navbar";
import { useState } from "react";

const initialItems = [
  {
    id: 1,
    quanity: 40,
    unit: "ml",
    name: "Viscous Lidocaine 2%",
    added: false,
  },
  { id: 2, quanity: 40, unit: "ml", name: "Maalox", added: false },
  { id: 3, quanity: 40, unit: "ml", name: "Diphenhydramine", added: false },
];

export default function Home() {
  // const [items, setItems] = useState([initialItems]);
  return (
    <div>
      <Navbar />
      <Ingredients items={initialItems} />
      {/* <main className="dark:bg-gray-00 flex min-h-screen items-center justify-center gap-2">
        <h1 className="text-2xl dark:text-white">Compounding Recipes</h1>
        <DarkThemeToggle />
      </main> */}
    </div>
  );
}

function Ingredients({ items }) {
  return (
    <div className="container max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Title : Magic Mouthwash
      </h1>
      <div className="list">
        <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Ingredients
        </h5>
        <input type="text" />
        <button
          type="button"
          className="mb-2 me-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          {" "}
          ➕ Add
        </button>
        <button
          type="button"
          className="mb-2 me-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          ❌ Delete
        </button>
        <ul>
          {items.map((item) => (
            <li>
              {" "}
              {item.quanity} {item.unit} {item.name}
            </li>
          ))}
        </ul>

        <p></p>
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a> */}
    </div>
  );
}
