import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from "react";

export default function Home() {
  interface Item {
    id: number;
    content: string;
  }
  const [sourceItems, setSourceItems] = useState<Item[]>([
    { id: 1, content: "Item 1" },
    { id: 2, content: "Item 2" },
    { id: 3, content: "Item 3" },
  ]);
  const [destinationItems, setDestinationItems] = useState<Item[]>([
    { id: 4, content: "Destination Item 1" },
    { id: 5, content: "Destination Item 2" },
  ]);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.currentTarget.dataset.id;
    if (!id) {
      return;
    }
    const items = [...sourceItems, ...destinationItems];
    const item = items.find((i) => i.id === parseInt(id));
    if (!item) {
      return;
    }
    event.dataTransfer.setData("text/plain", JSON.stringify(item));
    event.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove("dragging");
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.currentTarget.dataset.id;
    if (!id) {
      return;
    }
    const item = JSON.parse(event.dataTransfer.getData("text/plain")) as Item;
    const destination = destinationItems.find((i) => i.id === parseInt(id));
    if (destination) {
      return;
    }
    setDestinationItems([...destinationItems, item]);
    setSourceItems(sourceItems.filter((i) => i.id !== item.id));
  };
  
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    debugger;
    const id = event.currentTarget.dataset.id;
    if (!id) {
      return;
    }
    const destination = destinationItems.find((i) => i.id === parseInt(id));
    if (destination) {
      event.currentTarget.classList.add("invalid-drop-target");
    } else {
      event.currentTarget.classList.add("valid-drop-target");
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove("valid-drop-target", "invalid-drop-target");
  };
  return (
    <div className="App">
      <div className="source">
        {sourceItems.map((item) => (
          <div
            key={item.id}
            className="item"
            data-id={item.id}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            {item.content}
          </div>
        ))}
      </div>
      <div className="destination" onDragOver={handleDragOver} onDrop={handleDrop}>
        {destinationItems.map((item) => (
          <div key={item.id} className="item">
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
