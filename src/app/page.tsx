"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { InputCard, OutputCard } from "../components/report/ReportComponent";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface ReportItem {
  id: string;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [reportItems, setReportItems] = useState<ReportItem[]>([
    { id: 'header', title: "Header", description: "Generate the header section of the report with client information." },
    { id: 'articulation', title: "Articulation", description: "Assess and report on the client's articulation skills." },
    { id: 'language', title: "Language", description: "Evaluate and document the client's language abilities." },
    { id: 'fluency', title: "Fluency", description: "Analyze and report on the client's speech fluency." },
  ]);

  const [outputs, setOutputs] = useState<{ [key: string]: any }>({});

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(reportItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setReportItems(items);
  };

  const handleSubmit = async (id: string, input: string) => {
    try {
      const existingData = outputs[id] || {};
      const mergedInput = { ...existingData, new_information: input };
      const inputToSend = typeof mergedInput === 'object' ? JSON.stringify(mergedInput) : mergedInput;
  
      console.log('Sending data:', { input: inputToSend, section: id });

      const response = await fetch('/api/ai/process/structured-output', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: inputToSend,
          section: id 
        }), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to fetch');
      }
     
      const data = await response.json();
      console.log('Received data:', data);
     
      setOutputs(prev => ({ ...prev, [id]: data }));
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="report-cards">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full max-w-7xl"
            >
              {reportItems.map((item, index) => (
                <div key={item.id} className="flex gap-4 mb-4">
                  <Draggable draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-1/2"
                      >
                        <InputCard
                          title={item.title}
                          description={item.description}
                          onSubmit={(input: string) => handleSubmit(item.id, input)}
                          existingData={outputs[item.id]}  // Pass existing data to InputCard
                        />
                      </div>
                    )}
                  </Draggable>
                  <div className="w-1/2">
                    <OutputCard
                      title={item.title}
                      description={item.description}
                      output={outputs[item.id]}
                      existingData={outputs[item.id]}  // Pass existing data to OutputCard
                    />
                  </div>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-12">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
};

export default Home;