"use client";

import Navbar from "./Navbar";
import { useState } from "react";
import Select from "react-select";

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

interface Label {
  id: number;
  label: string;
}

interface LabelListProp {
  labels: Array<Label>;
  setLabels: Function;
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

// const labels = [
//   {
//     id: 0,
//     label: "Select Labels",
//   },
//   {
//     id: 1,
//     label: "Do not chew or crush",
//   },
//   {
//     id: 2,
//     label: "Swallow whole",
//   },
//   {
//     id: 3,
//     label: "Take with food",
//   },
//   {
//     id: 4,
//     label: "For rectal use only",
//   },
//   {
//     id: 5,
//     label: "Shake well before use",
//   },
//   {
//     id: 6,
//     label: "For external use only",
//   },
//   {
//     id: 7,
//     label: "May cause drowsiness",
//   },
//   {
//     id: 8,
//     label: "Protect from sunlight",
//   },
//   {
//     id: 9,
//     label: "Take on an empty stomach",
//   },
//   {
//     id: 10,
//     label: "Keep refrigerated",
//   },
//   {
//     id: 11,
//     label: "For the eye only",
//   },
//   {
//     id: 12,
//     label: "For the ear only",
//   },
//   { id: 13, label: "May cause urine discoloration" },
// ];

const options = [
  {
    value: "do not chew or crush",
    label: "Do not chew or crush",
  },
  {
    value: "swallow whole",
    label: "Swallow whole",
  },
  {
    value: "take with food",
    label: "Take with food",
  },
  {
    value: "for rectal use only",
    label: "For rectal use only",
  },
  {
    value: "shake well before use",
    label: "Shake well before use",
  },
  {
    value: "for external use only",
    label: "For external use only",
  },
  {
    value: "may cause drowsiness",
    label: "May cause drowsiness",
  },
  {
    value: "protect from sunlight",
    label: "Protect from sunlight",
  },
  {
    value: "take on an empty stomach",
    label: "Take on an empty stomach",
  },
  {
    value: "keep refrigerated",
    label: "Keep refrigerated",
  },
  {
    value: "for the eye only",
    label: "For the eye only",
  },
  {
    value: "fr the ear only",
    label: "For the ear only",
  },
  {
    value: "may cause urine discoloration",
    label: "May cause urine discoloration",
  },
];
const labels = [
  "Select Label",
  "Do not chew or crush",
  "Swallow whole",
  "Take with food",
  "For rectal use only",
  "Shake well before use",
  "For external use only",
  "May cause drowsiness",
  "Protect from sunlight",
  "Take on an empty stomach",
  "Keep refrigerated",
  "For the eye only",
  "For the ear only",
  "May cause urine discoloration",
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
  const [selectedOptions, setSelectedOptions] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<Array<string>>([]);

  // const newLabel = { id: Date.now(), selectedOptions };
  // console.log(newLabel);

  // function handleDeleteStep(stepId: number) {
  //   props.setPreparations(props.preparations.filter((s) => s.id !== stepId));
  // }

  function handleDeleteLabel(value: string) {
    setSelectedLabels(selectedLabels.filter((l) => l !== value));
  }
  // <button
  //               type="button"
  //               onClick={() => {
  //                 handleDeleteStep(index);
  //               }}
  //               className="me-2rounded-full m-1 border border-gray-200 bg-white px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
  //             >
  //               ❌
  //             </button>
  return (
    <div className="flex flex-col gap-4">
      <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        🏷️ Auxiliary Labels
      </h5>
      <div>
        {selectedLabels.map((l) => {
          return (
            <div>
              {l}
              <button
                type="button"
                onClick={() => {
                  handleDeleteLabel(l);
                }}
                className="me-2rounded-full m-1 border border-gray-200 bg-white px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                ❌
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 py-6">
        <select
          value={selectedOptions}
          onChange={(e) => {
            if (selectedLabels.includes(e.target.value)) {
              return;
            }
            setSelectedLabels([...selectedLabels, e.target.value]);
          }}
        >
          {labels.map((label, index) => (
            <option key={index} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Storage() {
  const [selectedStorage, setSelectedStorage] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        🏠 Storage Conditions
      </h5>

      <div className="flex items-center gap-2 py-6">
        <select
          value={selectedStorage}
          onChange={(e) => setSelectedStorage(e.target.value)}
        >
          <option selected> Select Storage Condition</option>
          <option> Refrigeration </option>
          <option> Room Temperature </option>
          <option> Other</option>
        </select>

        <div> You selected: {selectedStorage}</div>
      </div>
    </div>
  );
}

function Expiration() {
  return (
    <div>
      <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {" "}
        ⌛️ Expiration Date
      </h5>
      <label> ⌛️ Expiration Date </label>
    </div>
  );
}

function SpecialNote() {
  return (
    <div>
      <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        📝 Special Notes
      </h5>
      <label> </label>
      <input type="text" />
    </div>
  );
}
