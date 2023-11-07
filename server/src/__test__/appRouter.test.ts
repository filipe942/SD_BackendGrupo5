import { AppRouter, appRouter } from '../trpc';
import { Events } from '../models/Events'; 
import { ProcedureType, inferProcedureInput } from '@trpc/server';
import { test, expect } from "@jest/globals";
import mongoose from "mongoose";
import * as dotenv from "dotenv";;
dotenv.config();
jest.unmock('mongoose')

beforeEach(async () => {
  try {
    if(process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
},10000);

afterEach(async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log("Error closing MongoDB connection:", error);
  }
},10000);
describe('appRouter', () => {
    
    test('should create an event and then delete it', async () => {
        type Input = inferProcedureInput<AppRouter['CreateEvent']>;
        
        const input:Input  = {
            local: 'Test Location',
            date: new Date(),
            time: '12:00 PM',
            participants: '12',
        };
        
        // You can use Jest's expect() function to make assertions
        const result = await appRouter.CreateEvent({
          ctx: {}, // Provide the context if needed
          rawInput: input, // Provide the raw input for the procedure
          path: 'CreateEvent', // The path of the procedure
          type: "mutation" as ProcedureType, // The type of the procedure (query or mutation)
      });

        // Make assertions based on the expected behavior
        expect(result).toEqual({ message: 'success' });

        // You can also query the database to check if the event was saved
        const event = await Events.findOne({ local: input.local });
        expect(event).not.toBeNull();
        let eventId;
        if (event) {
        expect(event.local).toBe(input.local);
        expect(event.date).toEqual(input.date);
        expect(event.time).toBe(input.time);
        expect(event.participants).toBe(input.participants);
        eventId = (event._id);
        }
        

      type deleteInput = inferProcedureInput<typeof appRouter['DeleteEvent']>;

      // Define the delete input
      if(eventId){
      const deleteInput : deleteInput = {
          _id: eventId, // Use the ID of the created event
      };
      const deleteResult = await appRouter.DeleteEvent({
          ctx: {},
          rawInput: deleteInput,
          path: 'DeleteEvent',
          type: "mutation" as ProcedureType,
      });
    
      // Make assertions based on the expected behavior
      expect(deleteResult).toEqual({ message: 'success' });
    
      // Verify that the event was deleted from the database
      const deletedEvent = await Events.findById(eventId);
      expect(deletedEvent).toBeNull(); // The event should not exist in the database
    }

  }, 10000);

test('should get a list of events', async () => {
    const options = {
        ctx: {}, // Provide the context if needed
        rawInput: {}, // Provide the raw input for the procedure
        path: 'GetEventList', // The path of the procedure
        type: "query" as ProcedureType, // The type of the procedure (query or mutation)
    };
    const events = await appRouter.GetEventList(options);

    // Make assertions based on the expected behavior
    expect(Array.isArray(events)).toBe(true);
}, 10000);
test('should update an event', async () => {
    
    type Input = inferProcedureInput<AppRouter['CreateEvent']>;
        
    const input:Input  = {
        local: 'Test Location',
        date: new Date(),
        time: '12:00 PM',
        participants: '12',
    };
    
    // You can use Jest's expect() function to make assertions
    const result = await appRouter.CreateEvent({
      ctx: {}, // Provide the context if needed
      rawInput: input, // Provide the raw input for the procedure
      path: 'CreateEvent', // The path of the procedure
      type: "mutation" as ProcedureType, // The type of the procedure (query or mutation)
  });

    // Make assertions based on the expected behavior
    expect(result).toEqual({ message: 'success' });

    // You can also query the database to check if the event was saved
    const event = await Events.findOne({ local: input.local });
    expect(event).not.toBeNull();
    let eventId;
    if (event) {
    expect(event.local).toBe(input.local);
    expect(event.date).toEqual(input.date);
    expect(event.time).toBe(input.time);
    expect(event.participants).toBe(input.participants);
    eventId = (event._id);
    }
    if(eventId){

      type updateInput = inferProcedureInput<typeof appRouter['UpdateEvent']>;
      
      const updateInput : updateInput = {
        _id: eventId, // Use the ID of the created event
        local: 'Updated Location',
        date: new Date(), // Update date
        time: '1:00 PM', // Update time
        participants: 'Updated Participants',
      };
    
      const updateResult = await appRouter.UpdateEvent({
          ctx: {},
          rawInput: updateInput,
          path: 'UpdateEvent',
          type: "mutation" as ProcedureType,
      });
    
      // Make assertions based on the expected behavior
      expect(updateResult).toEqual({ message: 'success' });
    
      // Verify that the event was updated in the database
      const updatedEvent = await Events.findById(eventId);
      expect(updatedEvent).not.toBeNull();
      if (updatedEvent) {
        expect(updatedEvent.local).toEqual(updateInput.local);
        expect(updatedEvent.date).toEqual(updateInput.date);
        expect(updatedEvent.time).toEqual(updateInput.time);
        expect(updatedEvent.participants).toEqual(updateInput.participants);
      }
    }
  }, 10000);

});

