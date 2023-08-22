import { z } from 'zod';

const create = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'RoomNumber is required',
    }),
    floor: z.string({
      required_error: 'Floor is required',
    }),
    buildingId: z.string({
      required_error: 'buildingId is required',
    }),
  }),
});
export const RoomZodSchema = {
  create,
};
