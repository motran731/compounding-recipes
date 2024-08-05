"use client";

import Navbar from "./Navbar";
import { useState } from "react";
import { Dropdown } from "flowbite-react";

interface Ingredient {
  id: number;
  quantity: number;
  unit: string;
  name: string;
}

interface Step {
  id: number;
  step: string;
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
  const [title, setTitle] = useState("");
  const [preparations, setPreparations] = useState([]);

  return (
    <div>
      <Navbar />
      <div className="container max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <Title title={title} setTitle={setTitle} />
        <IngredientList ingredients={items} setItems={setItems} />
        <PreparationSteps
          preparations={preparations}
          setPreparations={setPreparations}
        />
        <AuxiliaryLabels />
        <Storage />
        <Expiration />
        <SpecialNote />
      </div>
    </div>
  );
}

interface Titleprops {
  title: string;
  setTitle: Function;
}
function Title(props: Titleprops) {
  const [editMode, setEditMode] = useState(true);

  function onSave() {
    if (!props.title) return;
    setEditMode(false);
  }

  function onEdit() {
    setEditMode(true);
  }

  return (
    <div className="title flex flex-row gap-2">
      {!editMode && (
        <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.title}
        </h1>
      )}
      {editMode && (
        <input
          type="text"
          id="title_input"
          placeholder="Add compound name"
          value={props.title}
          onChange={(event) => props.setTitle(event.target.value)}
        />
      )}
      {editMode && (
        <button
          type="button"
          onClick={onSave}
          className="mb-2 me-2 rounded-full border border-gray-200 bg-white p-4 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          ✅ Save
        </button>
      )}

      {!editMode && (
        <button
          type="button"
          onClick={onEdit}
          className="mb-2 me-2 rounded-full border border-gray-200 bg-white p-4 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          ✏️ Edit
        </button>
      )}
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

    // midori wins!!
    props.setItems([...props.ingredients, newIngredient]);

    //resets to starting input
    setQuantity(0);
    setUnit("");
    setName("");
  }

  function handleDelete(itemId: number) {
    console.log("iv been deleted", itemId);
    // Find the matching ingredient and remove from state
    // setArtists(
    //   artists.filter(a => a.id !== artist.id)
    // );
    props.setItems(props.ingredients.filter((i) => i.id !== itemId));
  }

  return (
    <div className="form">
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Ingredients
      </h5>

      <div className="list">
        <div className="flex flex-col gap-2">
          {props.ingredients.map((item: Ingredient) => (
            <div key={item.id} className="flex flex-row items-center gap-2">
              {" "}
              {item.quantity} {item.unit} {item.name}
              <button
                type="button"
                onClick={() => {
                  handleDelete(item.id);
                }}
                className="me-2rounded-full m-1 border border-gray-200 bg-white px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                ❌
              </button>
            </div>
          ))}
        </div>

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
          </div>
        </form>
      </div>
    </div>
  );
}

interface PreparationListProps {
  preparations: Array<Step>;
  setPreparations: Function;
}
function PreparationSteps(props: PreparationListProps) {
  const [editSteps, setEditSteps] = useState(true);
  const [step, setStep] = useState("");

  function handleAddStep(event: any) {
    event.preventDefault();

    if (!step) return;

    const newStep = { id: Date.now(), step };
    console.log(newStep);

    props.setPreparations([...props.preparations, newStep]);

    setStep("");
  }

  function handleDeleteStep(stepId: number) {
    props.setPreparations(props.preparations.filter((s) => s.id !== stepId));
  }

  // function onSaveSteps() {
  //   if (!props.preparations) return;

  //   setEditSteps(false);
  // }

  function onEditSteps(stepId: number) {
    setEditSteps(true);
  }

  return (
    <div className="form ">
      <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Preparation
      </h5>

      <div className="step-list ">
        <div className="flex flex-col gap-2">
          {props.preparations.map((step: Step, index: number) => (
            <div key={step.id} className="flex flex-row items-center gap-2 ">
              <div className="h-15 w-13  rounded-full bg-purple-700">
                <h3>{index + 1}</h3>
              </div>

              {step.step}

              <button
                type="button"
                onClick={() => {
                  onEditSteps(step.id);
                }}
                className="me-2rounded-full m-1 border border-gray-200 bg-white px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                ✏️ Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  handleDeleteStep(step.id);
                }}
                className="me-2rounded-full m-1 border border-gray-200 bg-white px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>

      <form>
        <div className="mb-6 flex gap-6 md:grid-rows-1">
          <div>
            <input
              type="text"
              id="step_input"
              placeholder="Write steps out"
              value={step}
              onChange={(event) => setStep(event.target.value)}
            />

            <button
              type="button"
              onClick={handleAddStep}
              className="mb-2 me-2 rounded-full border border-gray-200 bg-white p-4 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              ➕ Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function AuxiliaryLabels() {
  return (
    <div>
      <label>🏷️ Auxiliary Labels </label>
      {/* <input type="text" /> */}
      <select>
        <option> Refridgerate </option>
        <option>Shake well </option>
      </select>
      <button
        id="dropdownBgHoverButton"
        data-dropdown-toggle="dropdownBgHover"
        className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Dropdown checkbox{" "}
        <svg
          className="ms-3 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownBgHover"
        className="z-10 hidden w-48 rounded-lg bg-white shadow dark:bg-gray-700"
      >
        <ul
          className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownBgHoverButton"
        >
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-4"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
              />
              <label
                htmlFor="checkbox-item-4"
                className="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default checkbox
              </label>
            </div>
          </li>

          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                checked
                id="checkbox-item-5"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
              />
              <label
                htmlFor="checkbox-item-5"
                className="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Checked state
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-6"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
              />
              <label
                htmlFor="checkbox-item-6"
                className="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default checkbox
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Storage() {
  return (
    <div>
      <label> </label>
      {/* <Dropdown.Item onClick={() => alert('Settings!')}>Settings</Dropdown.Item> */}
      <Dropdown label="🏠 Storage Conditions">
        <Dropdown.Item> Refridgeration</Dropdown.Item>

        <Dropdown.Item> Room Temperature</Dropdown.Item>
        <Dropdown.Item> Other </Dropdown.Item>
      </Dropdown>
    </div>
  );
}

function Expiration() {
  return (
    <div>
      <label> ⌛️ Expiration Date </label>
    </div>
  );
}

function SpecialNote() {
  return (
    <div>
      <label> 📝 Special Notes</label>
      <input type="text" />
    </div>
  );
}
